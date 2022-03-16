import { uniquePaths } from './unique-path';

const EXCLUDE_KEYS = [
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
];

export function getPathRecursive(
    node: Record<string, unknown>,
    prefix: string[] = [],
    previous: string[][] = []
): string[][] {
    const result = previous;

    let hasChildPaths = false;

    const keys = Array.from(
        new Set(
            [...Object.getOwnPropertyNames(node)].filter(
                (key) => !EXCLUDE_KEYS.includes(key)
            )
        )
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
