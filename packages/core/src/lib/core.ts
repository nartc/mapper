import { mapMutate, mapReturn } from './mappings/map';
import {
    ERROR_HANDLER,
    MAPPINGS,
    METADATA_MAP,
    NAMING_CONVENTIONS,
    PROFILE_CONFIGURATION_CONTEXT,
    RECURSIVE_COUNT,
    RECURSIVE_DEPTH,
    STRATEGY,
} from './symbols';
import type {
    ArrayKeyedMap,
    ErrorHandler,
    Mapper,
    Mapping,
    MappingConfiguration,
    MappingStrategy,
    MappingStrategyInitializer,
    Metadata,
    MetadataIdentifier,
    NamingConvention,
} from './types';
import { Dictionary, MapOptions, ModelIdentifier } from './types';
import { getMapping } from './utils/get-mapping';

export interface CreateMapperOptions {
    strategyInitializer: MappingStrategyInitializer<MetadataIdentifier>;
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
    let strategy: MappingStrategy<MetadataIdentifier>;

    // this mapper is responsible for all mappings
    let mappings: Map<MetadataIdentifier, Map<MetadataIdentifier, Mapping>>;

    // this mapper is responsible for all metadata
    let metadata: Map<MetadataIdentifier, Array<Metadata>>;

    // this mapper is responsible for recursive depths and counts
    let recursiveDepth: Map<MetadataIdentifier, ArrayKeyedMap>;
    let recursiveCount: Map<MetadataIdentifier, ArrayKeyedMap>;

    // this mapper is tracking some context about the MappingProfile
    let profileConfigurationContext: Set<MappingConfiguration>;

    // return the Proxy
    return new Proxy<Mapper>({} as Mapper, {
        get(target, p: string | symbol, receiver: any): any {
            if (p === STRATEGY) {
                if (!strategy) {
                    strategy = strategyInitializer(receiver);
                }
                return strategy;
            }

            if (p === PROFILE_CONFIGURATION_CONTEXT) {
                if (!profileConfigurationContext) {
                    profileConfigurationContext = new Set();
                }
                return profileConfigurationContext;
            }

            if (p === MAPPINGS) {
                if (!mappings) {
                    mappings = new Map();
                }
                return mappings;
            }

            if (p === METADATA_MAP) {
                if (!metadata) {
                    metadata = new Map();
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
                    recursiveDepth = new Map();
                }
                return recursiveDepth;
            }

            if (p === RECURSIVE_COUNT) {
                if (!recursiveCount) {
                    recursiveCount = new Map();
                }
                return recursiveCount;
            }

            if (p === 'dispose') {
                return () => {
                    mappings?.clear();
                    metadata?.clear();
                    recursiveDepth?.clear();
                    recursiveCount?.clear();
                    profileConfigurationContext?.clear();
                };
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
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceObject: TSource,
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource, TDestination>
                ): Promise<TDestination> => {
                    return Promise.resolve().then(() =>
                        receiver['map'](
                            sourceObject,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        )
                    );
                };
            }

            if (p === 'mapArray') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceArray: TSource[],
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource[], TDestination[]>
                ): TDestination[] => {
                    if (!sourceArray.length) return [];

                    const mapping = getMapping(
                        receiver,
                        sourceIdentifier,
                        destinationIdentifier
                    );

                    const { beforeMap, afterMap, extraArgs } = options || {};

                    if (beforeMap) {
                        beforeMap(sourceArray, []);
                    }

                    const destinationArray: TDestination[] = [];

                    for (
                        let i = 0, length = sourceArray.length;
                        i < length;
                        i++
                    ) {
                        destinationArray.push(
                            mapReturn(
                                mapping,
                                sourceArray[i],
                                {
                                    extraArgs: extraArgs as MapOptions<
                                        TSource,
                                        TDestination
                                    >['extraArgs'],
                                },
                                true
                            )
                        );
                    }

                    if (afterMap) {
                        afterMap(sourceArray, destinationArray);
                    }

                    return destinationArray;
                };
            }

            if (p === 'mapArrayAsync') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceArray: TSource[],
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource[], TDestination[]>
                ) => {
                    return Promise.resolve().then(() => {
                        return receiver['mapArray'](
                            sourceArray,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        );
                    });
                };
            }

            if (p === 'mutate') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceObject: TSource,
                    destinationObject: TDestination,
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource, TDestination>
                ) => {
                    if (sourceObject == null) return;

                    const mapping = getMapping(
                        receiver,
                        sourceIdentifier,
                        destinationIdentifier
                    );

                    mapMutate(
                        mapping,
                        sourceObject,
                        destinationObject,
                        options || {}
                    );
                };
            }
            if (p === 'mutateAsync') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceObject: TSource,
                    destinationObject: TDestination,
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource, TDestination>
                ) => {
                    return Promise.resolve().then(() =>
                        receiver['mutate'](
                            sourceObject,
                            destinationObject,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        )
                    );
                };
            }

            if (p === 'mutateArray') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceArray: TSource[],
                    destinationArray: TDestination[],
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource[], TDestination[]>
                ) => {
                    if (!sourceArray.length) return;

                    const mapping = getMapping(
                        receiver,
                        sourceIdentifier,
                        destinationIdentifier
                    );

                    const { beforeMap, afterMap, extraArgs } = options || {};

                    if (beforeMap) {
                        beforeMap(sourceArray, destinationArray);
                    }

                    for (
                        let i = 0, length = sourceArray.length;
                        i < length;
                        i++
                    ) {
                        mapMutate(
                            mapping,
                            sourceArray[i],
                            destinationArray[i] || {},
                            {
                                extraArgs: extraArgs as MapOptions<
                                    TSource,
                                    TDestination
                                >['extraArgs'],
                            },
                            true
                        );
                    }

                    if (afterMap) {
                        afterMap(sourceArray, destinationArray);
                    }
                };
            }

            if (p === 'mutateArrayAsync') {
                return <
                    TSource extends Dictionary<TSource>,
                    TDestination extends Dictionary<TDestination>
                >(
                    sourceArray: TSource[],
                    destinationArray: TDestination[],
                    sourceIdentifier: ModelIdentifier<TSource>,
                    destinationIdentifier: ModelIdentifier<TDestination>,
                    options?: MapOptions<TSource[], TDestination[]>
                ) => {
                    return Promise.resolve().then(() =>
                        receiver['mutateArray'](
                            sourceArray,
                            destinationArray,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        )
                    );
                };
            }

            return Reflect.get(target, p, receiver);
        },
    });
}
