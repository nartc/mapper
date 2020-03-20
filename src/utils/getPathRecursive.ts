import { getProto } from './getProto';
import { isObjectLike } from './isObjectLike';

export function getPathRecursive(
  node: any,
  prefix: string = '',
  prev?: string[]
) {
  let result: string[] = prev || [];

  if (!isObjectLike(node)) {
    return result;
  }

  for (const key of Object.getOwnPropertyNames(node).filter(
    removeConstructorFromPath
  )) {
    const path = prefix + key;
    if (!result.includes(path)) {
      result.push(path);
    }

    const child = node[key];
    if (isObjectLike(child)) {
      let queue = [child];
      if (Array.isArray(child)) {
        queue = child;
      }

      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path + '.');
        for (const childPath of childPaths) {
          if (result.includes(childPath)) {
            continue;
          }
          result.push(childPath);
        }
      }
    }
  }

  if (!prev) {
    result = getPathRecursive(getProto(node), prefix, result);
  }

  return result;
}

function removeConstructorFromPath(path: string): boolean {
  return path !== 'constructor';
}
