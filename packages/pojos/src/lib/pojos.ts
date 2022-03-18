import type {
    ApplyMetadata,
    ApplyMetadataFn,
    DestinationConstructor,
    MappingStrategyInitializer,
    MetadataList,
} from '@automapper/core';
import { defaultApplyMetadata } from '@automapper/core';
import { PojosMetadataMap } from './metadata-map';

export function pojos(
    destinationConstructor: DestinationConstructor = () => ({}),
    applyMetadata: ApplyMetadata = defaultApplyMetadata
): MappingStrategyInitializer<symbol> {
    return (mapper) => ({
        destinationConstructor,
        mapper,
        get applyMetadata(): ApplyMetadataFn {
            return applyMetadata(this);
        },
        retrieveMetadata(...identifiers): Map<symbol, MetadataList> {
            const metadataMap = new Map();

            for (let i = 0, length = identifiers.length; i < length; i++) {
                const identifier = identifiers[i];
                metadataMap.set(
                    identifier,
                    PojosMetadataMap.retrieve(identifier)
                );
            }

            return metadataMap;
        },
    });
}
