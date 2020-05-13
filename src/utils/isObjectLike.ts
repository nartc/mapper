export function isObjectLike(obj: any): boolean {
  return (
    Array.isArray(obj) ||
    obj instanceof Date ||
    Object.prototype.toString.call(obj) === '[object Object]'
  );
}
