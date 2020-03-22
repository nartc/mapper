export function get<T>(
  object: T,
  defaultVal: any = null,
  ...paths: string[]
): any {
  function _getInternal(object: T, path: string) {
    const _path = path.split('.').filter(Boolean);
    const _val = _path.reduce((obj: any, key) => obj && obj[key], object);
    return _val === undefined ? defaultVal : _val;
  }

  let val = _getInternal(object, paths[0]);
  for (let i = 1, len = paths.length; i < len; i++) {
    if (val != null && defaultVal == null) {
      break;
    }
    val = _getInternal(object, paths[i]);
  }

  return val;
}
