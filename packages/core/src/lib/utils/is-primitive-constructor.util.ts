/**
 * Check if value is a String/Number/Boolean/Array constructor
 *
 * @param {Function} value
 */
export function isPrimitiveConstructor(value: unknown): boolean {
  return (
    value === String || value === Number || value === Boolean || value === Array
  );
}
