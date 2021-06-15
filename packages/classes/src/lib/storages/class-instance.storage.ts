import type { Constructible } from '../types';

/*
  # Implementation strategy
  Create a tree of `Map`s, such that indexing the tree recursively (with items
  of a key array, sequentially), traverses the tree, so that when the key array
  is exhausted, the tree node we arrive at contains the value for that key
  array under the guaranteed-unique `Symbol` key `dataSymbol`.
*/

type DataMap = Map<symbol, number>;
type PathMap = Map<string, PathMap | DataMap>;
type ArrayKeyedMap = PathMap | DataMap;
const DATA_SYMBOL = Symbol('map-data');

/**
 * Internal ClassInstanceStorage
 *
 * This is to store recursive depth and recursive count of circular deps models
 * Not test due to private
 *
 * @private
 */
export class ClassInstanceStorage {
  private depthStorage = new WeakMap<Constructible, ArrayKeyedMap>();
  private recursiveCountStorage = new WeakMap<Constructible, ArrayKeyedMap>();

  getDepthAndCount(
    parent: Constructible,
    member: string[]
  ): [depth?: number, count?: number] {
    return [this.getDepth(parent, member), this.getCount(parent, member)];
  }

  getDepth(parent: Constructible, member: string[]): number | undefined {
    return ClassInstanceStorage.getInternal(this.depthStorage, parent, member);
  }

  getCount(parent: Constructible, member: string[]): number | undefined {
    return ClassInstanceStorage.getInternal(
      this.recursiveCountStorage,
      parent,
      member
    );
  }

  setDepth(parent: Constructible, member: string[], depth: number): void {
    ClassInstanceStorage.setInternal(this.depthStorage, parent, member, depth);
  }

  setCount(parent: Constructible, member: string[], count: number): void {
    ClassInstanceStorage.setInternal(
      this.recursiveCountStorage,
      parent,
      member,
      count
    );
  }

  resetCount(parent: Constructible, member: string[]): void {
    this.setCount(parent, member, 0);
  }

  resetAllCount(parent: Constructible): void {
    const count = this.recursiveCountStorage.get(parent);
    if (count) {
      count.clear();
    }
  }

  dispose(): void {
    this.recursiveCountStorage = new WeakMap<Constructible, ArrayKeyedMap>();
    this.depthStorage = new WeakMap<Constructible, ArrayKeyedMap>();
  }

  private static getInternal(
    storage: WeakMap<Constructible, ArrayKeyedMap>,
    parent: Constructible,
    member: string[]
  ): number | undefined {
    const parentVal = storage.get(parent);
    return parentVal ? arrayMapGet(parentVal, member) : undefined;
  }

  private static setInternal(
    storage: WeakMap<Constructible, ArrayKeyedMap>,
    parent: Constructible,
    member: string[],
    value: number
  ): void {
    if (!storage.has(parent)) {
      storage.set(parent, arrayMapSet(new Map(), member, value));
      return;
    }

    if (!this.hasInternal(storage, parent, member)) {
      arrayMapSet(storage.get(parent), member, value);
    }
  }

  private static hasInternal(
    storage: WeakMap<Constructible, ArrayKeyedMap>,
    parent: Constructible,
    member: string[]
  ): boolean {
    const parentVal = storage.get(parent);
    return parentVal ? arrayMapHas(parentVal, member) : false;
  }
}

function arrayMapSet(
  root: ArrayKeyedMap,
  path: string[],
  value: number
): ArrayKeyedMap {
  let map = root;
  for (const item of path) {
    let nextMap = (map as PathMap).get(item) as PathMap;
    if (!nextMap) {
      // Create next map if none exists
      nextMap = new Map();
      (map as PathMap).set(item, nextMap);
    }
    map = nextMap;
  }
  // Reached end of path.  Set the data symbol to the given value
  (map as DataMap).set(DATA_SYMBOL, value);
  return root;
}

function arrayMapHas(root: ArrayKeyedMap, path: string[]): boolean {
  let map = root;
  for (const item of path) {
    const nextMap = (map as PathMap).get(item);
    if (nextMap) {
      map = nextMap;
    } else {
      return false;
    }
  }
  return (map as DataMap).has(DATA_SYMBOL);
}

function arrayMapGet(root: ArrayKeyedMap, path: string[]): number | undefined {
  let map = root;
  for (const item of path) {
    map = (map as PathMap).get(item);
    if (!map) return undefined;
  }
  return (map as DataMap).get(DATA_SYMBOL);
}
