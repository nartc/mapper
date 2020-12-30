export function set<T>(
  object: T,
  path: string,
  value: unknown
): (T & { [p: string]: unknown }) | T {
  const decomposedPath = path.split('.');
  const base = decomposedPath[0];

  if (base === undefined) {
    return object;
  }

  // assign an empty object in order to spread object
  if (!object.hasOwnProperty(base)) {
    object[base] = {};
  }

  // Determine if there is still layers to traverse
  value =
    decomposedPath.length <= 1
      ? value
      : set(object[base], decomposedPath.slice(1).join('.'), value);

  return Object.assign(object, { [base]: value });
}
