export function isPrimitiveConstructor(value: unknown): boolean {
  return value === String || value === Number || value === Boolean;
}
