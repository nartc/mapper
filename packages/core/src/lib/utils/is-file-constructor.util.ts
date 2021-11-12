export function isFileConstructor(value: unknown): boolean {
  const constructorName = value['prototype']
    ? value['prototype'].constructor.name
    : value['name'];
  return constructorName === 'File';
}
