export function isFilenameMatched(
  patterns: string[],
  filename: string
): boolean {
  return patterns.some((path) => filename.includes(path));
}
