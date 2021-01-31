export function getPathRecursive(
  node: any,
  prefix = '',
  prev: string[] = []
): string[] | undefined {
  if (node == null) {
    return;
  }

  const result = prev;

  const keys = Object.getOwnPropertyNames(node);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    const path = prefix + key;
    result.push(path);

    const child = node[key];
    if (typeof child === 'object') {
      let queue = [child];
      if (Array.isArray(child)) {
        queue = child;
      }

      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path + '.');
        if (childPaths) {
          for (const childPath of childPaths) {
            if (result.includes(childPath)) continue;
            result.push(childPath);
          }
        }
      }
    }
  }

  return result;
}
