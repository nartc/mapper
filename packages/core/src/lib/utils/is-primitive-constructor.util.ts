/**
 * Check if value is a String/Number/Boolean/Array constructor
 *
 * @param {Function} value
 */
export function isPrimitiveConstructor(value: unknown): boolean {
  const proto = Object.getPrototypeOf(value);
  return (
    proto === String ||
    proto === Number ||
    proto === Boolean ||
    value === String ||
    value === Number ||
    value === Boolean ||
    value === Array
  );
}
