export function set<T>(
  object: T,
  path: string,
  value: unknown
): (T & { [p: string]: unknown }) | T {
  const { decomposedPath, base } = decomposePath(path);

  if (base === undefined) {
    return object;
  }

  // assign an empty object in order to spread object
  assignEmpty(object, base);

  // Determine if there is still layers to traverse
  value =
    decomposedPath.length <= 1
      ? value
      : set(object[base], decomposedPath.slice(1).join('.'), value);

  return Object.assign(object, { [base]: value });
}

export function setMutate<T>(object: T, path: string, value: unknown): void {
  const { decomposedPath, base } = decomposePath(path);

  if (base === undefined) {
    return;
  }

  // assign an empty object in order to spread object
  assignEmpty(object, base);

  // Determine if there is still layers to traverse
  if (decomposedPath.length <= 1) {
    object[base] = value;
  } else {
    setMutate(object[base], decomposedPath.slice(1).join('.'), value);
  }
}

function decomposePath(
  path: string
): { decomposedPath: string[]; base: string } {
  const decomposedPath = path.split('.');
  const base = decomposedPath[0];
  return { base, decomposedPath };
}

function assignEmpty<T>(obj: T, base: string) {
  if (!obj.hasOwnProperty(base)) {
    obj[base] = {};
  }
}
