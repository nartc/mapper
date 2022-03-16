import type {
    ArrayKeyedMap,
    Mapper,
    MetadataIdentifier,
    NamingConvention,
} from './types';

export const STRATEGY = Symbol('__strategy__');
export const MAPPINGS = Symbol('__mappings__');
export const METADATA_MAP = Symbol('__metadata_map__');
export const ERROR_HANDLER = Symbol('__error_handler__');
export const NAMING_CONVENTIONS = Symbol('__naming_conventions__');
export const RECURSIVE_DEPTH = Symbol('__recursive_depth__');
export const RECURSIVE_COUNT = Symbol('__recursive_count__');
export const PROFILE_CONFIGURATION_CONTEXT = Symbol(
    '__profile_configuration_context__'
);

export function getErrorHandler(mapper: Mapper) {
    return mapper[ERROR_HANDLER];
}

export function getMappings(mapper: Mapper) {
    return mapper[MAPPINGS];
}

export function getMetadataMap(mapper: Mapper) {
    return mapper[METADATA_MAP];
}

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

export function getRecursiveDepth(
    mapper: Mapper
): Map<MetadataIdentifier, ArrayKeyedMap> {
    return mapper[RECURSIVE_DEPTH];
}

export function getRecursiveCount(
    mapper: Mapper
): Map<MetadataIdentifier, ArrayKeyedMap> {
    return mapper[RECURSIVE_COUNT];
}

export function getStrategy(mapper: Mapper) {
    return mapper[STRATEGY];
}
