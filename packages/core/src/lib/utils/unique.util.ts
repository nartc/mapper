export function uniquePaths(paths: string[][]): string[][] {
  const result: string[][] = [];
  for (let i = 0; i < paths.length; i++) {
    const value = paths[i];
    if (!result.some((item) => isSamePath(item, value))) {
      result.push(value);
    }
  }
  return result;
}

export function isSamePath(target: string[], value: string[]): boolean {
  if (target.length !== value.length) {
    return false;
  }
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== value[i]) {
      return false;
    }
  }
  return true;
}
