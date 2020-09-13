export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  return !value || !Object.keys(value).length;
}
