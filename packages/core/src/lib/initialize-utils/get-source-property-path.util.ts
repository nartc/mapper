import type { NamingConvention } from '@automapper/types';
import { isDefined } from '../utils';

export function getSourcePropertyPath(
  path: string,
  namingConventions?: Readonly<[NamingConvention, NamingConvention]>
): string {
  if (!isDefined(namingConventions)) {
    return path;
  }

  const [
    sourceNamingConvention,
    destinationNamingConvention,
  ] = namingConventions!;

  const splitPath = path.split('.');
  if (splitPath.length > 1) {
    return splitPath
      .map((key) => getSourcePropertyPath(key, namingConventions))
      .join('.');
  }

  const keyParts = path
    .split(destinationNamingConvention.splittingExpression)
    .filter(Boolean);
  return !keyParts.length
    ? path
    : sourceNamingConvention.transformPropertyName(keyParts);
}
