import type {
    ArrayKeyedMap,
    DataMap,
    MetadataIdentifier,
    PathMap,
} from '../types';

const RECURSIVE_DATA = Symbol('__recursive_data__');

export function getRecursiveValue(
    recursiveMap: Map<MetadataIdentifier, ArrayKeyedMap>,
    parent: MetadataIdentifier,
    member: string[]
): number | undefined {
    const parentValue = recursiveMap.get(parent);
    return parentValue ? arrayMapGet(parentValue, member) : undefined;
}

export function setRecursiveValue(
    recursiveMap: Map<MetadataIdentifier, ArrayKeyedMap>,
    parent: MetadataIdentifier,
    member: string[],
    value: number
) {
    if (!recursiveMap.has(parent)) {
        recursiveMap.set(parent, arrayMapSet(new Map(), member, value));
        return;
    }

    const parentValue = recursiveMap.get(parent);
    if (arrayMapHas(parentValue!, member)) return;
    arrayMapSet(parentValue!, member, value);
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
    (map as DataMap).set(RECURSIVE_DATA, value);
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
    return (map as DataMap).has(RECURSIVE_DATA);
}

function arrayMapGet(root: ArrayKeyedMap, path: string[]): number | undefined {
    let map = root;
    for (const item of path) {
        map = (map as PathMap).get(item)!;
        if (!map) return undefined;
    }
    return (map as DataMap).get(RECURSIVE_DATA);
}
