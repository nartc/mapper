import type { NamingConvention, NamingConventionInput } from '../types';

export function normalizeNamingConventions(
    namingConventions: NamingConventionInput
): [NamingConvention, NamingConvention] {
    if ('source' in namingConventions && 'destination' in namingConventions) {
        return [namingConventions.source, namingConventions.destination];
    }
    return [namingConventions, namingConventions];
}
