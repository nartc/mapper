import type { Constructible } from '../types';

/**
 * Internal ClassInstanceStorage
 *
 * This is to store recursive depth and recursive count of circular deps models
 * Not test due to private
 *
 * @private
 */
export class ClassInstanceStorage {
  private depthStorage = new WeakMap<Constructible, Map<string, number>>();
  private recursiveCountStorage = new WeakMap<
    Constructible,
    Map<string, number>
  >();

  getDepthAndCount(
    parent: Constructible,
    member: string
  ): [depth?: number, count?: number] {
    return [this.getDepth(parent, member), this.getCount(parent, member)];
  }

  getDepth(parent: Constructible, member: string): number | undefined {
    return ClassInstanceStorage.getInternal(this.depthStorage, parent, member);
  }

  getCount(parent: Constructible, member: string): number | undefined {
    return ClassInstanceStorage.getInternal(
      this.recursiveCountStorage,
      parent,
      member
    );
  }

  setDepth(parent: Constructible, member: string, depth: number): void {
    ClassInstanceStorage.setInternal(this.depthStorage, parent, member, depth);
  }

  setCount(parent: Constructible, member: string, count: number): void {
    ClassInstanceStorage.setInternal(
      this.recursiveCountStorage,
      parent,
      member,
      count
    );
  }

  resetCount(parent: Constructible, member: string): void {
    this.setCount(parent, member, 0);
  }

  resetAllCount(parent: Constructible): void {
    const count = this.recursiveCountStorage.get(parent);
    if (count) {
      count.clear();
    }
  }

  dispose(): void {
    this.recursiveCountStorage = new WeakMap<
      Constructible,
      Map<string, number>
    >();
    this.depthStorage = new WeakMap<Constructible, Map<string, number>>();
  }

  private static getInternal(
    storage: WeakMap<Constructible, Map<string, number>>,
    parent: Constructible,
    member: string
  ): number | undefined {
    const parentVal = storage.get(parent);
    return parentVal ? parentVal.get(member) : undefined;
  }

  private static setInternal(
    storage: WeakMap<Constructible, Map<string, number>>,
    parent: Constructible,
    member: string,
    value: number
  ): void {
    if (!storage.has(parent)) {
      storage.set(parent, new Map<string, number>().set(member, value));
      return;
    }

    if (!this.hasInternal(storage, parent, member)) {
      storage.get(parent)!.set(member, value);
    }
  }

  private static hasInternal(
    storage: WeakMap<Constructible, Map<string, number>>,
    parent: Constructible,
    member: string
  ): boolean {
    const parentVal = storage.get(parent);
    return parentVal ? parentVal.has(member) : false;
  }
}
