import { mapReturn } from './map';
import { getMapping } from './mappings';
import { getStrategy } from './strategy';
import {
    ERROR_HANDLER,
    MAPPINGS,
    METADATA_MAP,
    NAMING_CONVENTIONS,
    RECURSIVE_COUNT,
    RECURSIVE_DEPTH,
    STRATEGY,
    TYPE_CONVERTERS,
} from './symbols';
import type {
    ArrayKeyedMap,
    ErrorHandler,
    Mapper,
    Mapping,
    Metadata,
    MetadataIdentifier,
    NamingConvention,
    PrimitiveConstructor,
    Selector,
} from './types';
import { Dictionary, MapOptions, ModelIdentifier } from './types';

export interface CreateMapperOptions {
    strategyInitializer: any;
    errorHandler?: ErrorHandler;
    namingConventions?:
        | NamingConvention
        | {
              source: NamingConvention;
              destination: NamingConvention;
          };
}

export function createMapper({
    strategyInitializer,
    errorHandler,
    namingConventions,
}: CreateMapperOptions): Mapper {
    let strategy: any;

    // type converters
    let typeConverters: Map<
        MetadataIdentifier | PrimitiveConstructor | DateConstructor,
        Map<
            MetadataIdentifier | PrimitiveConstructor | DateConstructor,
            Selector
        >
    >;

    // this mapper is responsible for all mappings
    let mappings: Map<MetadataIdentifier, Map<MetadataIdentifier, Mapping>>;

    // this mapper is responsible for all metadata
    let metadata: Map<MetadataIdentifier, Array<Metadata>>;

    // this mapper is responsible for recursive depths and counts
    let recursiveDepth: Map<MetadataIdentifier, ArrayKeyedMap>;
    let recursiveCount: Map<MetadataIdentifier, ArrayKeyedMap>;

    // initialize the mapper

    // return the Proxy
    return new Proxy<Mapper>({} as Mapper, {
        get(target, p: string | symbol, receiver: any): any {
            if (p === STRATEGY) {
                if (!strategy) {
                    strategy = strategyInitializer(receiver);
                }
                return strategy;
            }

            if (p === TYPE_CONVERTERS) {
                // initialize as soon as there's someone asking for it
                if (!typeConverters) {
                    typeConverters = new Map<
                        | MetadataIdentifier
                        | PrimitiveConstructor
                        | DateConstructor,
                        Map<
                            | MetadataIdentifier
                            | PrimitiveConstructor
                            | DateConstructor,
                            Selector
                        >
                    >();
                }
                return typeConverters;
            }

            if (p === MAPPINGS) {
                if (!mappings) {
                    mappings = new Map<
                        MetadataIdentifier,
                        Map<MetadataIdentifier, Mapping>
                    >();
                }
                return mappings;
            }

            if (p === METADATA_MAP) {
                if (!metadata) {
                    metadata = new Map<MetadataIdentifier, Array<Metadata>>();
                }
                return metadata;
            }

            if (p === ERROR_HANDLER) {
                if (!errorHandler) {
                    errorHandler = {
                        handle: console.error.bind(console, '[AutoMapper]'),
                    };
                }
                return errorHandler;
            }

            if (p === NAMING_CONVENTIONS) {
                return namingConventions;
            }

            if (p === RECURSIVE_DEPTH) {
                if (!recursiveDepth) {
                    recursiveDepth = new Map<
                        MetadataIdentifier,
                        ArrayKeyedMap
                    >();
                }
                return recursiveDepth;
            }

            if (p === RECURSIVE_COUNT) {
                if (!recursiveCount) {
                    recursiveCount = new Map<
                        MetadataIdentifier,
                        ArrayKeyedMap
                    >();
                }
                return recursiveCount;
            }

            if (p === 'dispose') {
                return getStrategy(receiver).dispose.bind(
                    getStrategy(receiver)
                );
            }

            if (p === 'map') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceObject: TSource,
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource, TDestination>
                ): TDestination => {
                    if (sourceObject == null)
                        return sourceObject as TDestination;

                    const mapping = getMapping(
                        receiver,
                        sourceIdentifier,
                        destinationIdentifier
                    );

                    return mapReturn(mapping, sourceObject, options || {});
                };
            }

            if (p === 'mapAsync') {
                return () => {};
            }

            if (p === 'mapArray') {
                return () => {};
            }

            if (p === 'mapArrayAsync') {
                return () => {};
            }

            if (p === 'mutate') {
                return () => {};
            }
            if (p === 'mutateAsync') {
                return () => {};
            }

            if (p === 'mutateArray') {
                return () => {};
            }

            if (p === 'mutateArrayAsync') {
                return () => {};
            }

            return Reflect.get(target, p, receiver);
        },
    });
}
