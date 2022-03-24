import type {
    ApplyMetadataFn,
    Constructor,
    Mapper,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { defaultSerializerOptions } from '@automapper/core';
import 'reflect-metadata';
import { getMetadataList } from './get-metadata-list';

export function classes({
    destinationConstructor = (_, destinationIdentifier) =>
        new (destinationIdentifier as Constructor)(),
    applyMetadata,
    postMap,
    preMap,
}: MappingStrategyInitializerOptions = defaultSerializerOptions): MappingStrategyInitializer<Constructor> {
    return (mapper: Mapper) => ({
        destinationConstructor,
        mapper,
        get applyMetadata(): ApplyMetadataFn {
            return applyMetadata!(this);
        },
        retrieveMetadata(...identifiers) {
            const metadataMap = new Map();
            for (let i = 0, length = identifiers.length; i < length; i++) {
                const identifier = identifiers[i];
                const [metadataList, nestedConstructors] =
                    getMetadataList(identifier);
                metadataMap.set(identifier, metadataList);

                if (nestedConstructors.length) {
                    const nestedConstructorsMetadataMap = this.retrieveMetadata(
                        ...nestedConstructors
                    );
                    nestedConstructorsMetadataMap.forEach(
                        (nestedConstructorMetadataList, nestedConstructor) => {
                            metadataMap.set(
                                nestedConstructor,
                                nestedConstructorMetadataList
                            );
                        }
                    );
                }
            }

            return metadataMap;
        },
        preMap: preMap!,
        postMap: postMap!,
    });
}
