export function isNestedPath(path: string): boolean {
  return path.split('.').length > 1;
}
