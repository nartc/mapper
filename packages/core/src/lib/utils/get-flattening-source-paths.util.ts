import type { NamingConvention } from '@automapper/types';

export function getFlatteningSourcePaths(
  src: unknown,
  srcPath: string,
  namingConventions: [NamingConvention, NamingConvention]
) {
  const [sourceNamingConvention] = namingConventions;
  const [first, ...paths] = srcPath
    .split(sourceNamingConvention.splittingExpression)
    .filter(Boolean)
    .filter((p) => p !== '.');

  if (!paths.length || !src.hasOwnProperty(first)) {
    return;
  }

  const sourcePaths = [
    [first]
      .concat(
        paths.map((p) => sourceNamingConvention.transformPropertyName([p]))
      )
      .join('.'),
  ];

  if (paths.length > 1) {
    sourcePaths.push(
      [first]
        .concat(sourceNamingConvention.transformPropertyName(paths))
        .join('.')
    );
  }

  return sourcePaths;
}
