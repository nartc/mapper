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

  const destNamingConvention = new destinationNamingConvention();
  const srcNamingConvention = new sourceNamingConvention();
  const keyParts = path
    .split(destNamingConvention.splittingExpression)
    .filter(Boolean);
  return !keyParts.length
    ? path
    : srcNamingConvention.transformPropertyName(keyParts);
}
