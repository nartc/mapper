import type {
    ApplyMetadataFn,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataList,
} from '@automapper/core';
import { defaultApplyMetadata } from '@automapper/core';
import { PojosMetadataMap } from './metadata-map';

export function pojos({
    destinationConstructor = () => ({}),
    applyMetadata = defaultApplyMetadata,
    postMap,
    preMap,
}: MappingStrategyInitializerOptions = {}): MappingStrategyInitializer<symbol> {
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
        preMap: (...args) => {
            if (preMap) {
                return preMap(...args);
            }
            return;
        },
        postMap: (...args) => {
            if (postMap) {
                return postMap(...args);
            }
            return;
        },
    });
}
