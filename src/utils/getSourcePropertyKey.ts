import { Constructible, NamingConvention } from '../types';
import { isNestedPath } from './isNestedPath';

export function getSourcePropertyKey(
  [sourceNamingConvention, destinationNamingConvention]: [
    Constructible<NamingConvention>,
    Constructible<NamingConvention>
  ],
  path: string
): string {
  if (isNestedPath(path)) {
    return path
      .split('.')
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
