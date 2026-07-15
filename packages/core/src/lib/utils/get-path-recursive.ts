import { uniquePaths } from './unique-path';

const EXCLUDE_KEYS = new Set([
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    '__proto__',
    'toLocaleString',
]);

export function getPathRecursive(
    node: Record<string, unknown>,
    prefix: string[] = [],
    previous: string[][] = []
): string[][] {
    const result = previous;

    let hasChildPaths = false;

    // Object.getOwnPropertyNames already returns unique keys, so the previous
    // Array.from(new Set(...)) dedup removed nothing. Cross-node dedup (the only
    // place a path can repeat) is still done by uniquePaths(result) below.
    const keys = Object.getOwnPropertyNames(node).filter(
        (key) => !EXCLUDE_KEYS.has(key)
    );

    for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        const path: string[] = [...prefix, key];
        const child = node[key];

        if (typeof child === 'function') {
            continue;
        }
        result.push(path);

        if (typeof child === 'object') {
            const queue = Array.isArray(child) ? child : [child];

            for (const childNode of queue) {
                const childPaths = getPathRecursive(childNode, path);
                if (childPaths) {
                    hasChildPaths = true;
                    result.push(...childPaths);
                }
            }
        }
    }

    if (hasChildPaths) {
        return uniquePaths(result);
    }
    return result;
}
