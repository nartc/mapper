export function isObjectLike(obj: unknown): boolean {
  return (
    Array.isArray(obj) ||
    obj instanceof Date ||
    Object.prototype.toString.call(obj) === '[object Object]'
  );
}
