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
    NamingConventionInput,
} from './types';
import { Dictionary, MapOptions, ModelIdentifier } from './types';
import { getMapping } from './utils/get-mapping';

export interface CreateMapperOptions {
    strategyInitializer: MappingStrategyInitializer<MetadataIdentifier>;
    errorHandler?: ErrorHandler;
    namingConventions?: NamingConventionInput;
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

                    sourceObject = strategy.preMap(
                        Object.freeze(sourceObject),
                        mapping
                    );

                    const destination = mapReturn(
                        mapping,
                        sourceObject,
                        options || {}
                    );

                    return strategy.postMap(
                        Object.freeze(sourceObject),
                        // seal destination so that consumers cannot add properties to it
                        // or change the property descriptors. but they can still modify it
                        // the ideal behavior is seal but the consumers might need to add/modify the object after map finishes
                        destination,
                        mapping
                    );
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
                    const result = receiver['map'](
                        sourceObject,
                        sourceIdentifier,
                        destinationIdentifier,
                        options
                    );
                    return new Promise((res) => {
                        setTimeout(res, 0, result);
                    });
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
                        let sourceObject = sourceArray[i];
                        sourceObject = strategy.preMap(
                            Object.freeze(sourceObject),
                            mapping
                        );

                        const destination = mapReturn(
                            mapping,
                            sourceObject,
                            {
                                extraArgs: extraArgs as MapOptions<
                                    TSource,
                                    TDestination
                                >['extraArgs'],
                            },
                            true
                        );

                        destinationArray.push(
                            strategy.postMap(
                                Object.freeze(sourceObject),
                                // seal destination so that consumers cannot add properties to it
                                // or change the property descriptors. but they can still modify it
                                // the ideal behavior is seal but the consumers might need to add/modify the object after map finishes
                                destination,
                                mapping
                            ) as TDestination
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
                    const result = receiver['mapArray'](
                        sourceArray,
                        sourceIdentifier,
                        destinationIdentifier,
                        options
                    );
                    return new Promise((res) => {
                        setTimeout(res, 0, result);
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

                    sourceObject = strategy.preMap(
                        Object.freeze(sourceObject),
                        mapping
                    );

                    mapMutate(
                        mapping,
                        sourceObject,
                        destinationObject,
                        options || {}
                    );

                    strategy.postMap(
                        Object.freeze(sourceObject),
                        destinationObject,
                        mapping
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
                    return new Promise((res) => {
                        receiver['mutate'](
                            sourceObject,
                            destinationObject,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        );

                        setTimeout(res);
                    });
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
                        let sourceObject = sourceArray[i];

                        sourceObject = strategy.preMap(
                            Object.freeze(sourceObject),
                            mapping
                        );

                        mapMutate(
                            mapping,
                            sourceObject,
                            destinationArray[i] || {},
                            {
                                extraArgs: extraArgs as MapOptions<
                                    TSource,
                                    TDestination
                                >['extraArgs'],
                            },
                            true
                        );

                        strategy.postMap(
                            Object.freeze(sourceObject),
                            destinationArray[i],
                            mapping
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
                    return new Promise((res) => {
                        receiver['mutateArray'](
                            sourceArray,
                            destinationArray,
                            sourceIdentifier,
                            destinationIdentifier,
                            options
                        );

                        setTimeout(res);
                    });
                };
            }

            return Reflect.get(target, p, receiver);
        },
    });
}
