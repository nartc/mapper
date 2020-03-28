export function getPathFromSelector(fnParts: string[]): string {
  const [, ...parts] = fnParts
    .join('')
    .split(new RegExp(`${fnParts[0]}\\.{1}`, 'g'))
    .filter(Boolean);

  if (parts.length === 1) {
    return parts.pop() as string;
  }

  return '';
}
