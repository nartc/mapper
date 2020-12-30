import type { NamingConvention } from '@automapper/types';

export function getNamingConventionsFromOptions(namingConventions?: {
  source: NamingConvention;
  destination: NamingConvention;
}): [NamingConvention, NamingConvention] | undefined {
  if (namingConventions == null) return undefined;
  return [namingConventions.source, namingConventions.destination];
}
