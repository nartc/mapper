import type { NamingConvention } from '@automapper/types';

export function getFlatteningSourcePaths(
  src: unknown,
  srcPath: string,
  namingConventions: [NamingConvention, NamingConvention]
) {
  const [sourceNamingConvention] = namingConventions;
  const splitSourcePaths = srcPath
    .split(sourceNamingConvention.splittingExpression)
    .filter(Boolean)
    .filter((p) => p !== '.');

  const lengthWithoutFirstPart = splitSourcePaths.length - 1;

  if (!lengthWithoutFirstPart) {
    return;
  }

  const [first, ...paths] = splitSourcePaths.slice(0, lengthWithoutFirstPart);
  let trueFirstPartOfSource = first;
  let stopIndex = 0;
  let found = false;

  if (src.hasOwnProperty(trueFirstPartOfSource)) {
    found = true;
  } else {
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
