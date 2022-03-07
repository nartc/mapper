import { getErrorHandler } from './error-handler';
import { getMappings } from './mappings';
import { getStrategy } from './strategy';
import type {
    Dictionary,
    Mapper,
    Mapping,
    MappingConfiguration,
    MappingConfigurationFn,
    MetadataIdentifier,
    ModelIdentifier,
} from './types';

export function createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: ModelIdentifier<TSource>,
    destination: ModelIdentifier<TDestination>,
    ...mappingConfigFns: MappingConfigurationFn<TSource, TDestination>[]
) {
    // turn string into symbol for identifier
    const sourceIdentifier: MetadataIdentifier<TSource> =
        typeof source === 'string' ? Symbol.for(source) : source;
    const destinationIdentifier: MetadataIdentifier<TDestination> =
        typeof destination === 'string' ? Symbol.for(destination) : destination;

    const mappings = getMappings(mapper);

    if (mappings.get(sourceIdentifier)?.get(destinationIdentifier)) {
        getErrorHandler(mapper).handle(
            `Mapping for source ${String(source)} and destination ${String(
                destination
            )} already exists`
        );
        return;
    }

    // get the strategy from Mapper
    const strategy = getStrategy(mapper);
    const mappingConfigs: MappingConfiguration<TSource, TDestination>[] = [];

    for (const mappingConfigFn of mappingConfigFns) {
        mappingConfigs.push(mappingConfigFn(mapper));
    }

    // after all the mapping configurations are consolidated,
    // initialize the mapping
    const mapping = strategy.createMapping(
        sourceIdentifier,
        destinationIdentifier,
        mappingConfigs
    );
    // store the mapping
    if (!mappings.has(sourceIdentifier)) {
        mappings.set(
            sourceIdentifier,
            new Map<MetadataIdentifier, Mapping<TSource, TDestination>>().set(
                destinationIdentifier,
                mapping
            )
        );
    } else {
        mappings.get(sourceIdentifier)!.set(destinationIdentifier, mapping);
    }

    // return the mapping
    return mapping;
}
