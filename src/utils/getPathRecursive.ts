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

  const keys = Object.getOwnPropertyNames(node).filter(removeFromPath);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
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

function removeFromPath(path: string): boolean {
  return (
    path !== 'constructor' &&
    path !== '__defineGetter__' &&
    path !== '__defineSetter__' &&
    path !== 'hasOwnProperty' &&
    path !== '__lookupGetter__' &&
    path !== '__lookupSetter__' &&
    path !== 'isPrototypeOf' &&
    path !== 'propertyIsEnumerable' &&
    path !== 'toString' &&
    path !== 'valueOf' &&
    path !== '__proto__' &&
    path !== 'toLocaleString'
  );
}
