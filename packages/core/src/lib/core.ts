import {
    deferAsyncAfterMapAfterPending,
    getAsyncMapContext,
    isAsyncMapActive,
    isThenable,
    mapMutate,
    mapReturn,
    pushAsyncPending,
    runInAsyncMapContext,
    runAsyncMap,
    settleAsyncMap,
} from './mappings/map';
import {
    CUSTOM_NODE_INSPECT,
    ERROR_HANDLER,
    MAPPINGS,
    METADATA_MAP,
    METADATA_OBJECT_MAP,
    NAMING_CONVENTIONS,
    PROFILE_CONFIGURATION_CONTEXT,
    RECURSIVE_COUNT,
    RECURSIVE_DEPTH,
    STRATEGY,
} from './symbols';
import type {
    ArrayKeyedMap,
    Dictionary,
    ErrorHandler,
    MapOptions,
    Mapper,
    Mapping,
    MappingConfiguration,
    MappingStrategy,
    MappingStrategyInitializer,
    Metadata,
    MetadataIdentifier,
    ModelIdentifier,
    NamingConventionInput,
} from './types';
import { MappingCallbacksClassId, MappingClassId } from './types';
import { getMapping } from './utils/get-mapping';
import { AutoMapperLogger } from './utils/logger';

export interface CreateMapperOptions {
    strategyInitializer: MappingStrategyInitializer<MetadataIdentifier>;
    errorHandler?: ErrorHandler;
    namingConventions?: NamingConventionInput;
}

/**
 * Creates and returns a Mapper {}. The following methods are available to use with a Mapper:
 *  ```
 *  - Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
 *  - createMap()
 *  - addProfile()
 *  - getMapping()
 *  - getMappings()
 *  ```
 * @param {CreateMapperOptions} options
 */
export function createMapper({
    strategyInitializer,
    errorHandler,
    namingConventions,
}: CreateMapperOptions): Mapper {
    let strategy: MappingStrategy<MetadataIdentifier>;

    // all mapper state, created eagerly (cheap, always needed) so the mapper can
    // be a plain object with direct property access instead of a Proxy get-trap.
    const mappings: Map<
        MetadataIdentifier,
        Map<MetadataIdentifier, Mapping>
    > = new Map();
    const metadataMap: Map<MetadataIdentifier, Array<Metadata>> = new Map();
    const metadataObjectMap: Map<
        MetadataIdentifier,
        [
            asSource?: Record<string, unknown>,
            asDestination?: Record<string, unknown>
        ]
    > = new Map();
    const recursiveDepth: Map<MetadataIdentifier, ArrayKeyedMap> = new Map();
    const recursiveCount: Map<MetadataIdentifier, ArrayKeyedMap> = new Map();
    const profileConfigurationContext: Set<MappingConfiguration> = new Set();

    const resolvedErrorHandler: ErrorHandler = errorHandler ?? {
        handle: AutoMapperLogger.error
            ? AutoMapperLogger.error.bind(AutoMapperLogger)
            : // eslint-disable-next-line @typescript-eslint/no-empty-function
              () => {},
    };

    function getOptions<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifierOrOptions?:
            | ModelIdentifier<TDestination>
            | MapOptions<TSource, TDestination>
            | MapOptions<TSource[], TDestination[]>,
        options?:
            | MapOptions<TSource, TDestination>
            | MapOptions<TSource[], TDestination[]>
    ): {
        destinationIdentifier: ModelIdentifier<TDestination>;
        mapOptions?:
            | MapOptions<TSource, TDestination>
            | MapOptions<TSource[], TDestination[]>;
    } {
        if (destinationIdentifierOrOptions && options) {
            return {
                destinationIdentifier:
                    destinationIdentifierOrOptions as ModelIdentifier<TDestination>,
                mapOptions: options,
            };
        }

        let destinationIdentifier: ModelIdentifier<TDestination> =
            sourceIdentifier as ModelIdentifier<TDestination>;

        if (destinationIdentifierOrOptions && !options) {
            const typeofDestinationOrOptions =
                typeof destinationIdentifierOrOptions;
            if (
                typeofDestinationOrOptions === 'string' ||
                typeofDestinationOrOptions === 'function'
            ) {
                destinationIdentifier =
                    destinationIdentifierOrOptions as ModelIdentifier<TDestination>;
            } else {
                options = destinationIdentifierOrOptions as MapOptions<
                    TSource,
                    TDestination
                >;
            }
        }
        return { destinationIdentifier, mapOptions: options };
    }

    // A plain object (not a Proxy): direct, monomorphic property access at every
    // call site, real stack traces, and `mapper.map === mapper.map`.
    const mapper = {
        map<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceObject: TSource,
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource, TDestination>,
            options?: MapOptions<TSource, TDestination>
        ): TDestination {
            if (sourceObject == null) return sourceObject as TDestination;

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            sourceObject = strategy.preMap(sourceObject, mapping);

            const destination = mapReturn(
                mapping,
                sourceObject,
                mapOptions || {}
            );

            return strategy.postMap(
                sourceObject,
                // returned as-is: intentionally NOT sealed, so consumers can
                // add/modify the result after mapping
                destination,
                mapping
            );
        },

        mapAsync<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceObject: TSource,
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource, TDestination>,
            options?: MapOptions<TSource, TDestination>
        ): Promise<TDestination> {
            if (sourceObject == null) {
                return Promise.resolve(sourceObject as TDestination);
            }

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            sourceObject = strategy.preMap(sourceObject, mapping);

            // Run the synchronous engine inside an async context, then await any
            // async member resolvers / before-map, and finally the deferred
            // after-maps — so the resolved Promise carries a fully-mapped result.
            const [destination, asyncContext] = runAsyncMap(() =>
                mapReturn(mapping, sourceObject, mapOptions || {})
            );
            return settleAsyncMap(asyncContext).then(
                () =>
                    strategy.postMap(
                        sourceObject,
                        destination,
                        mapping
                    ) as TDestination
            );
        },

        mapArray<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceArray: TSource[],
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource[], TDestination[]>,
            options?: MapOptions<TSource[], TDestination[]>
        ): TDestination[] {
            if (!sourceArray.length) return [];

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            const { beforeMap, afterMap, extraArgs } = (mapOptions ||
                {}) as MapOptions<TSource[], TDestination[]>;

            const destinationArray: TDestination[] = [];
            const mappingCallbacks = mapping[MappingClassId.callbacks];
            const beforeMapArray =
                beforeMap ??
                mappingCallbacks?.[MappingCallbacksClassId.beforeMapArray];
            const afterMapArray =
                afterMap ??
                mappingCallbacks?.[MappingCallbacksClassId.afterMapArray];

            const runArrayMapping = () => {
                // options is read-only in map()/mapReturn — share one object for
                // every element instead of allocating `{ extraArgs }` per element.
                const elementOptions = {
                    extraArgs: extraArgs as MapOptions<
                        TSource,
                        TDestination
                    >['extraArgs'],
                };
                for (let i = 0, length = sourceArray.length; i < length; i++) {
                    let sourceObject = sourceArray[i];
                    sourceObject = strategy.preMap(sourceObject, mapping);

                    const destination = mapReturn(
                        mapping,
                        sourceObject,
                        elementOptions,
                        true
                    );

                    destinationArray.push(
                        strategy.postMap(
                            sourceObject,
                            // returned as-is: intentionally NOT sealed, so
                            // consumers can add/modify after mapping
                            destination,
                            mapping
                        ) as TDestination
                    );
                }
            };

            let arrayMappingDeferredUntilBeforeMap = false;
            const queueAfterMapArray = () => {
                if (afterMapArray) {
                    deferAsyncAfterMapAfterPending(() =>
                        afterMapArray(sourceArray, destinationArray)
                    );
                }
            };

            if (beforeMapArray) {
                const beforeMapResult = beforeMapArray(
                    sourceArray,
                    destinationArray
                );
                if (isAsyncMapActive() && isThenable(beforeMapResult)) {
                    const asyncMapContext = getAsyncMapContext();
                    arrayMappingDeferredUntilBeforeMap = true;
                    pushAsyncPending(
                        Promise.resolve(beforeMapResult).then(() =>
                            runInAsyncMapContext(asyncMapContext!, () => {
                                runArrayMapping();
                                queueAfterMapArray();
                            })
                        )
                    );
                } else {
                    pushAsyncPending(beforeMapResult);
                }
            }

            if (!arrayMappingDeferredUntilBeforeMap) {
                runArrayMapping();
                queueAfterMapArray();
            }

            return destinationArray;
        },

        mapArrayAsync<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceArray: TSource[],
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource[], TDestination[]>,
            options?: MapOptions<TSource[], TDestination[]>
        ): Promise<TDestination[]> {
            const [result, asyncContext] = runAsyncMap(() =>
                mapper.mapArray(
                    sourceArray,
                    sourceIdentifier,
                    destinationIdentifierOrOptions as ModelIdentifier<TDestination>,
                    options
                )
            );
            return settleAsyncMap(asyncContext).then(() => result);
        },

        mutate<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceObject: TSource,
            destinationObject: TDestination,
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource, TDestination>,
            options?: MapOptions<TSource, TDestination>
        ): void {
            if (sourceObject == null) return;

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            sourceObject = strategy.preMap(sourceObject, mapping);

            mapMutate(
                mapping,
                sourceObject,
                destinationObject,
                mapOptions || {}
            );

            strategy.postMap(sourceObject, destinationObject, mapping);
        },

        mutateAsync<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceObject: TSource,
            destinationObject: TDestination,
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource, TDestination>,
            options?: MapOptions<TSource, TDestination>
        ): Promise<void> {
            if (sourceObject == null) return Promise.resolve();

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            sourceObject = strategy.preMap(sourceObject, mapping);

            const [, asyncContext] = runAsyncMap(() =>
                mapMutate(
                    mapping,
                    sourceObject,
                    destinationObject,
                    mapOptions || {}
                )
            );
            return settleAsyncMap(asyncContext).then(() => {
                strategy.postMap(sourceObject, destinationObject, mapping);
            });
        },

        mutateArray<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceArray: TSource[],
            destinationArray: TDestination[],
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource[], TDestination[]>,
            options?: MapOptions<TSource[], TDestination[]>
        ): void {
            if (!sourceArray.length) return;

            const { destinationIdentifier, mapOptions } = getOptions(
                sourceIdentifier,
                destinationIdentifierOrOptions,
                options
            );

            const mapping = getMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );

            const { beforeMap, afterMap, extraArgs } = (mapOptions ||
                {}) as MapOptions<TSource[], TDestination[]>;
            const mappingCallbacks = mapping[MappingClassId.callbacks];
            const beforeMapArray =
                beforeMap ??
                mappingCallbacks?.[MappingCallbacksClassId.beforeMapArray];
            const afterMapArray =
                afterMap ??
                mappingCallbacks?.[MappingCallbacksClassId.afterMapArray];

            const runArrayMapping = () => {
                // options is read-only in map()/mapMutate — share one object for
                // every element instead of allocating `{ extraArgs }` per element.
                const elementOptions = {
                    extraArgs: extraArgs as MapOptions<
                        TSource,
                        TDestination
                    >['extraArgs'],
                };
                for (let i = 0, length = sourceArray.length; i < length; i++) {
                    let sourceObject = sourceArray[i];

                    sourceObject = strategy.preMap(sourceObject, mapping);

                    const destination =
                        destinationArray[i] ??
                        (destinationArray[i] = {} as TDestination);

                    mapMutate(
                        mapping,
                        sourceObject,
                        destination,
                        elementOptions,
                        true
                    );

                    strategy.postMap(sourceObject, destination, mapping);
                }
            };

            let arrayMappingDeferredUntilBeforeMap = false;
            const queueAfterMapArray = () => {
                if (afterMapArray) {
                    deferAsyncAfterMapAfterPending(() =>
                        afterMapArray(sourceArray, destinationArray)
                    );
                }
            };

            if (beforeMapArray) {
                const beforeMapResult = beforeMapArray(
                    sourceArray,
                    destinationArray
                );
                if (isAsyncMapActive() && isThenable(beforeMapResult)) {
                    const asyncMapContext = getAsyncMapContext();
                    arrayMappingDeferredUntilBeforeMap = true;
                    pushAsyncPending(
                        Promise.resolve(beforeMapResult).then(() =>
                            runInAsyncMapContext(asyncMapContext!, () => {
                                runArrayMapping();
                                queueAfterMapArray();
                            })
                        )
                    );
                } else {
                    pushAsyncPending(beforeMapResult);
                }
            }

            if (!arrayMappingDeferredUntilBeforeMap) {
                runArrayMapping();
                queueAfterMapArray();
            }
        },

        mutateArrayAsync<
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            sourceArray: TSource[],
            destinationArray: TDestination[],
            sourceIdentifier: ModelIdentifier<TSource>,
            destinationIdentifierOrOptions?:
                | ModelIdentifier<TDestination>
                | MapOptions<TSource[], TDestination[]>,
            options?: MapOptions<TSource[], TDestination[]>
        ): Promise<void> {
            const [, asyncContext] = runAsyncMap(() =>
                mapper.mutateArray(
                    sourceArray,
                    destinationArray,
                    sourceIdentifier,
                    destinationIdentifierOrOptions as ModelIdentifier<TDestination>,
                    options
                )
            );
            return settleAsyncMap(asyncContext);
        },

        dispose(): void {
            mappings.clear();
            // metadataMap is intentionally left intact: strategies cache which
            // identifiers they've retrieved metadata for (e.g. classes'
            // metadataTracker), so clearing it here without resetting that cache
            // would leave re-created mappings with no metadata.
            metadataObjectMap.clear();
            recursiveDepth.clear();
            recursiveCount.clear();
            profileConfigurationContext.clear();
        },
    } as unknown as Mapper;

    // internal state, exposed as (non-enumerable) symbol-keyed properties read
    // by the get*/symbols helpers. STRATEGY is lazy because the initializer
    // needs the fully-constructed mapper.
    Object.defineProperties(mapper, {
        [STRATEGY]: {
            get() {
                if (!strategy) {
                    strategy = strategyInitializer(mapper);
                }
                return strategy;
            },
        },
        [PROFILE_CONFIGURATION_CONTEXT]: { value: profileConfigurationContext },
        [MAPPINGS]: { value: mappings },
        [METADATA_MAP]: { value: metadataMap },
        [METADATA_OBJECT_MAP]: { value: metadataObjectMap },
        [ERROR_HANDLER]: { value: resolvedErrorHandler },
        [NAMING_CONVENTIONS]: { value: namingConventions },
        [RECURSIVE_DEPTH]: { value: recursiveDepth },
        [RECURSIVE_COUNT]: { value: recursiveCount },
        [CUSTOM_NODE_INSPECT]: {
            value: () => `
Mapper {} The following methods are available to use with a Mapper:
- Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
- createMap()
- addProfile()
- getMapping()
- getMappings()
        `,
        },
    });

    return mapper;
}
