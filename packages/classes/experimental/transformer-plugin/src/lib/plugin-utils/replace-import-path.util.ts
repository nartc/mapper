import { dirname, posix } from 'path';

export function replaceImportPath(
  typeReference: string,
  fileName: string
): string | undefined {
  let importPath = /\("([^)]).+(")/.exec(typeReference)?.[0];
  if (!importPath) {
    return undefined;
  }
  importPath = importPath.slice(2, importPath.length - 1);

  let relativePath = posix.relative(dirname(fileName), importPath);
  relativePath = relativePath[0] !== '.' ? './' + relativePath : relativePath;
  typeReference = typeReference.replace(importPath, relativePath);

  return typeReference.replace('import', 'require');
}
