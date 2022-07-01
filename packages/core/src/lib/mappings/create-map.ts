import {
    getErrorHandler,
    getMappings,
    getProfileConfigurationContext,
    getStrategy,
} from '../symbols';
import type {
    Dictionary,
    Mapper,
    Mapping,
    MappingConfiguration,
    MetadataIdentifier,
    ModelIdentifier,
} from '../types';
import { storeMetadata } from '../utils/store-metadata';
import { createInitialMapping } from './create-initial-mapping';

export function createMap<TSource extends Dictionary<TSource>>(
    mapper: Mapper,
    source: ModelIdentifier<TSource>,
    ...mappingConfigFns: (MappingConfiguration<TSource, TSource> | undefined)[]
): Mapping<TSource, TSource>;
export function createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: ModelIdentifier<TSource>,
    destination: ModelIdentifier<TDestination>,
    ...mappingConfigFns: (
        | MappingConfiguration<TSource, TDestination>
        | undefined
    )[]
): Mapping<TSource, TDestination>;
export function createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: ModelIdentifier<TSource>,
    ...mappingConfigFnsOrIdentifier: (
        | ModelIdentifier<TDestination>
        | MappingConfiguration<TSource, TDestination>
        | undefined
    )[]
): Mapping<TSource, TDestination> {
    // turn string into symbol for identifier
    const sourceIdentifier: MetadataIdentifier<TSource> =
        typeof source === 'string' ? Symbol.for(source) : source;

    let destinationIdentifier: MetadataIdentifier<TDestination> =
        sourceIdentifier as MetadataIdentifier<TDestination>;

    const [destination, ...mappingConfigFns] =
        mappingConfigFnsOrIdentifier || [];

    if (destination) {
        if (typeof destination === 'string') {
            destinationIdentifier = Symbol.for(destination);
        } else if (
            typeof destination === 'function' &&
            destination.prototype !== undefined
        ) {
            destinationIdentifier =
                destination as unknown as MetadataIdentifier<TDestination>;
        } else {
            (mappingConfigFns || []).push(destination);
        }
    }

    const mappings = getMappings(mapper);
    let mapping = mappings.get(sourceIdentifier)?.get(destinationIdentifier);

    if (mapping) {
        getErrorHandler(mapper).handle(
            `Mapping for source ${String(source)} and destination ${String(
                destination
            )} already exists`
        );

        return mapping as Mapping<TSource, TDestination>;
    }

    // get the strategy from Mapper to retrieve the metadata
    const strategy = getStrategy(mapper);

    const strategyMetadataMap = strategy.retrieveMetadata(
        sourceIdentifier,
        destinationIdentifier
    );

    strategyMetadataMap.forEach((metadataList, identifier) => {
        storeMetadata(mapper, identifier, metadataList);
    });

    // after all the mapping configurations are consolidated,
    // initialize the mapping
    mapping = createInitialMapping(
        mapper,
        sourceIdentifier,
        destinationIdentifier,
        (mappingConfigFns || [])
            .concat(...getProfileConfigurationContext(mapper).values())
            .filter(
                (configFn) => configFn != undefined
            ) as MappingConfiguration[]
    );

    // store the mapping
    if (!mappings.has(sourceIdentifier)) {
        mappings.set(
            sourceIdentifier,
            new Map([[destinationIdentifier, mapping]])
        );
    } else {
        mappings.get(sourceIdentifier)!.set(destinationIdentifier, mapping);
    }

    // return the mapping
    return mapping;
}
