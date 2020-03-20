export function getPathFromSelector(fnParts: string[]): string {
  return fnParts
    .join('')
    .split(new RegExp(`${fnParts[0]}\\.{1}`, 'g'))
    .filter(Boolean)
    .pop() as string;
}
