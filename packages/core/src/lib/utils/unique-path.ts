import { isSamePath } from './is-same-path';

export function uniquePaths(paths: string[][]): string[][] {
    const result: string[][] = [];
    for (let i = 0, pathsLen = paths.length; i < pathsLen; i++) {
        const value = paths[i];
        if (!result.some((item) => isSamePath(item, value))) {
            result.push(value);
        }
    }
    return result;
}
