import type { NamingConvention } from '@automapper/types';

export function getFlatteningSourcePaths(
  src: Record<string, unknown>,
  srcPath: string,
  namingConventions: [NamingConvention, NamingConvention]
) {
  const [sourceNamingConvention] = namingConventions;
  const splitSourcePaths = srcPath
    .split(sourceNamingConvention.splittingExpression)
    .filter(Boolean)
    .filter((p) => p !== '.');

  const [first, ...paths] = splitSourcePaths.slice(
    0,
    splitSourcePaths.length - 1
  );
  let trueFirstPartOfSource = first;
  let stopIndex = 0;
  let found = src.hasOwnProperty(trueFirstPartOfSource);

  if (!found) {
    for (let i = 0, len = paths.length; i < len; i++) {
      trueFirstPartOfSource = sourceNamingConvention.transformPropertyName([
        trueFirstPartOfSource,
        paths[i],
      ]);
      if (src.hasOwnProperty(trueFirstPartOfSource)) {
        stopIndex = i + 1;
        found = true;
        break;
      }
    }
  }

  if (!found) {
    return;
  }

  return [
    [trueFirstPartOfSource]
      .concat(
        sourceNamingConvention.transformPropertyName(
          splitSourcePaths.slice(stopIndex + 1, splitSourcePaths.length + 1)
        )
      )
      .join('.'),
  ];
}
