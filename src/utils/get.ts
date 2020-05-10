export function get<T>(object: T, defaultVal: any, ...paths: string[]): any {
  function _getInternal(object: T, path: string) {
    const _path = path.split('.').filter(Boolean);
    const _val = _path.reduce((obj: any, key) => obj && obj[key], object);
    return _val != null ? _val : defaultVal;
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
