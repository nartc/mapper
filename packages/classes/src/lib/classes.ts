import type {
    ApplyMetadataFn,
    Constructor,
    Mapper,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { defaultApplyMetadata } from '@automapper/core';
import 'reflect-metadata';
import { getStandaloneConstructors } from './decorators';
import { getMetadataList } from './get-metadata-list';

export function classes({
    destinationConstructor = (_, destinationIdentifier) =>
        new (destinationIdentifier as Constructor)(),
    applyMetadata = defaultApplyMetadata,
    postMap,
    preMap,
}: MappingStrategyInitializerOptions = {}): MappingStrategyInitializer<Constructor> {
    return (mapper: Mapper) => ({
        destinationConstructor,
        mapper,
        get applyMetadata(): ApplyMetadataFn {
            return applyMetadata(this);
        },
        retrieveMetadata(...identifiers) {
            const metadataMap = new Map();
            for (let i = 0, length = identifiers.length; i < length; i++) {
                const identifier = identifiers[i];
                metadataMap.set(identifier, getMetadataList(identifier));

                const standaloneConstructors =
                    getStandaloneConstructors(identifier);
                for (
                    let j = 0,
                        standaloneConstructorsLength =
                            standaloneConstructors.length;
                    j < standaloneConstructorsLength;
                    j++
                ) {
                    const standaloneIdentifier = standaloneConstructors[j];
                    metadataMap.set(
                        standaloneIdentifier,
                        getMetadataList(standaloneIdentifier)
                    );
                }
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
