import type { NamingConvention } from '@automapper/types';
import { isDefined } from '../utils';

export function getSourcePropertyPath(
  path: string[],
  namingConventions?: Readonly<[NamingConvention, NamingConvention]>
): string[] {
  if (!isDefined(namingConventions)) {
    return path;
  }

  const [
    sourceNamingConvention,
    destinationNamingConvention,
  ] = namingConventions!;

  const keyParts = path.map(s => s.split(destinationNamingConvention.splittingExpression)
    .filter(Boolean)).filter(p => p.length > 0);
  return !keyParts.length
    ? path
    : keyParts.map(p => sourceNamingConvention.transformPropertyName(p));
}
