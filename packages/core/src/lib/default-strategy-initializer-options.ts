import { defaultApplyMetadata } from './mappings/apply-metadata';
import type { MappingStrategyInitializerOptions } from './types';

export const defaultStrategyInitializerOptions = {
    applyMetadata: defaultApplyMetadata,
    preMap(source) {
        return source;
    },
    postMap(_, destination) {
        return destination;
    },
} as Required<
    Omit<MappingStrategyInitializerOptions, 'destinationConstructor'>
>;
