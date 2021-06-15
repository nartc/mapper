import { uniquePaths } from '../utils';

/**
 * Loop through an object and recursively get paths of each property
 *
 * @param node
 * @param prefix
 * @param prev
 */
export function getPathRecursive(
  node: Record<string, unknown>,
  prefix: string[] = [],
  prev: string[][] = []
): string[][] | undefined {
  if (node == null) {
    return;
  }

  const result = prev;
  let hadChildPaths = false;

  const keys = Object.getOwnPropertyNames(node);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    const path: string[] = [].concat(...prefix, key);
    result.push(path);

    const child = node[key];
    if (typeof child === 'object') {
      const queue = Array.isArray(child) ? child : [child];

      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path);
        if (childPaths) {
          hadChildPaths = true;
          result.push(...childPaths);
        }
      }
    }
  }

  if (hadChildPaths) {
    return uniquePaths(result);
  }
  return result;
}
