import {
    getErrorHandler,
    getMappings,
    getMetadataMap,
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
import { getProfileConfigurationContext } from './add-profile';
import { createInitialMapping } from './create-initial-mapping';

export function createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: ModelIdentifier<TSource>,
    destination: ModelIdentifier<TDestination>,
    ...mappingConfigFns: MappingConfiguration<TSource, TDestination>[]
): Mapping<TSource, TDestination> {
    // turn string into symbol for identifier
    const sourceIdentifier: MetadataIdentifier<TSource> =
        typeof source === 'string' ? Symbol.for(source) : source;
    const destinationIdentifier: MetadataIdentifier<TDestination> =
        typeof destination === 'string' ? Symbol.for(destination) : destination;

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

    // get the metadata map on the mapper
    const metadataMap = getMetadataMap(mapper);

    // get the strategy from Mapper to retrieve the metadata
    const strategy = getStrategy(mapper);

    const strategyMetadataMap = strategy.retrieveMetadata(
        sourceIdentifier,
        destinationIdentifier
    );

    strategyMetadataMap.forEach((metadataList, identifier) => {
        if (!metadataMap.has(identifier)) {
            storeMetadata(mapper, identifier, metadataList);
        }
    });

    // after all the mapping configurations are consolidated,
    // initialize the mapping
    mapping = createInitialMapping(
        mapper,
        sourceIdentifier,
        destinationIdentifier,
        (mappingConfigFns || []).concat(
            ...getProfileConfigurationContext(mapper).values()
        )
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
