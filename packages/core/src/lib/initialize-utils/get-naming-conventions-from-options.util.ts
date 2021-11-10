import type { NamingConvention } from '../types';

/**
 * Convert namingConventions params to [convention, convention] format
 *
 * @param namingConventions
 */
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
