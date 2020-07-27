import { Constructible, NamingConvention } from '../types';

export function getSourcePropertyKey(
  [sourceNamingConvention, destinationNamingConvention]: [
    Constructible<NamingConvention>,
    Constructible<NamingConvention>
  ],
  path: string
): string {
  const splitPath = path.split('.');
  if (splitPath.length > 1) {
    return splitPath
      .map(key =>
        getSourcePropertyKey(
          [sourceNamingConvention, destinationNamingConvention],
          key
        )
      )
      .join('.');
  }

  const keyParts = path
    .split(new destinationNamingConvention().splittingExpression)
    .filter(Boolean);
  return !keyParts.length
    ? path
    : new sourceNamingConvention().transformPropertyName(keyParts);
}
