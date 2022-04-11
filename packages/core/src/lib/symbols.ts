import type {
    ArrayKeyedMap,
    Mapper,
    MetadataIdentifier,
    NamingConvention,
} from './types';
import { normalizeNamingConventions } from './utils/normalize-naming-conventions';

export const STRATEGY = Symbol.for('__strategy__');
export const MAPPINGS = Symbol.for('__mappings__');
export const METADATA_MAP = Symbol.for('__metadata_map__');
export const METADATA_OBJECT_MAP = Symbol.for('__metadata_object_map__');
export const ERROR_HANDLER = Symbol.for('__error_handler__');
export const NAMING_CONVENTIONS = Symbol.for('__naming_conventions__');
export const RECURSIVE_DEPTH = Symbol.for('__recursive_depth__');
export const RECURSIVE_COUNT = Symbol.for('__recursive_count__');
export const PROFILE_CONFIGURATION_CONTEXT = Symbol.for(
    '__profile_configuration_context__'
);
export const CUSTOM_NODE_INSPECT = Symbol.for('nodejs.util.inspect.custom');

export function getErrorHandler(mapper: Mapper) {
    return mapper[ERROR_HANDLER];
}

export function getMappings(mapper: Mapper) {
    return mapper[MAPPINGS];
}

export function getMetadataMap(mapper: Mapper) {
    return mapper[METADATA_MAP];
}

export function getMetadataObjectMap(mapper: Mapper) {
    return mapper[METADATA_OBJECT_MAP];
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
    return normalizeNamingConventions(namingConventions);
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

export function getProfileConfigurationContext(mapper: Mapper) {
    return mapper[PROFILE_CONFIGURATION_CONTEXT];
}
