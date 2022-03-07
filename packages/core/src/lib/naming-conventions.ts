import { NAMING_CONVENTIONS } from './symbols';
import type { Mapper, NamingConvention } from './types';

export function getNamingConventions(
    mapper: Mapper
):
    | [
          sourceNamingConvention: NamingConvention,
          destinationNamingConvention: NamingConvention
      ]
    | undefined {
    const namingConventions = mapper[NAMING_CONVENTIONS];
    if (!namingConventions) return undefined;
    if ('source' in namingConventions && 'destination' in namingConventions) {
        return [namingConventions.source, namingConventions.destination];
    }
    return [namingConventions, namingConventions];
}
