import { defaultApplyMetadata } from './mappings/apply-metadata';
import type { Dictionary, MappingStrategyInitializerOptions } from './types';

export const defaultSerializerOptions = {
    applyMetadata: defaultApplyMetadata,
    preMap<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(source: TSource): TSource {
        return source;
    },
    postMap<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(_: TSource, destination: TDestination): TDestination {
        return destination;
    },
} as Required<
    Omit<MappingStrategyInitializerOptions, 'destinationConstructor'>
>;
