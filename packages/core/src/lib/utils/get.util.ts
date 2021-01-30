export function get<T>(object: T, ...paths: string[]): unknown {
  if (!paths?.length) {
    return;
  }

  function _getInternal(innerObject: T, path: string) {
    const _path = path.split('.').filter(Boolean);
    return _path.reduce((obj: unknown, key) => obj && obj[key], innerObject);
  }

  let val = _getInternal(object, paths[0]);
  for (let i = 1, len = paths.length; i < len; i++) {
    if (val != null) {
      val = _getInternal(val, paths[i]);
      continue;
    }
    val = _getInternal(object, paths[i]);
  }

  return val;
}
