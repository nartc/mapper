export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  if (value instanceof Map) {
    return !value.size;
  }

  return !value || !Object.keys(value).length;
}
