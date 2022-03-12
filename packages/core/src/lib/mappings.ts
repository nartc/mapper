import { getErrorHandler } from './error-handler';
import { MAPPINGS } from './symbols';
import type {
    Mapper,
    Mapping,
    MetadataIdentifier,
    ModelIdentifier,
} from './types';

export function getMappings(mapper: Mapper) {
    return mapper[MAPPINGS];
}

export function getMapping(
    mapper: Mapper,
    source: ModelIdentifier,
    destination: ModelIdentifier
): Mapping {
    // turn string into symbol for identifier
    const sourceIdentifier: MetadataIdentifier =
        typeof source === 'string' ? Symbol.for(source) : source;
    const destinationIdentifier: MetadataIdentifier =
        typeof destination === 'string' ? Symbol.for(destination) : destination;

    const mapping = getMappings(mapper)
        .get(sourceIdentifier)
        ?.get(destinationIdentifier);

    if (mapping == null) {
        const errorHandler = getErrorHandler(mapper);
        const errorMessage = `Mapping is not found for ${String(
            source
        )} and ${String(destination)}`;
        errorHandler.handle(errorMessage);
        throw new Error(errorMessage);
    }

    return mapping;
}
