import type { NamingConvention } from '@automapper/types';

export function getNamingConventionsFromOptions(
  namingConventions?:
    | NamingConvention
    | {
        source: NamingConvention;
        destination: NamingConvention;
      }
): [NamingConvention, NamingConvention] | undefined {
  if (namingConventions == null) return undefined;

  if ('source' in namingConventions && 'destination' in namingConventions) {
    return [namingConventions.source, namingConventions.destination];
  }

  return [namingConventions, namingConventions];
}
