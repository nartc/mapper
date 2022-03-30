import {
    ApplyMetadataFn,
    Constructor,
    defaultSerializerOptions,
    Dictionary,
    getMetadataMap,
    Mapper,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataIdentifier,
} from '@automapper/core';
import 'reflect-metadata';
import { getMetadataList } from './get-metadata-list';

export function classes(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<Constructor> {
    const {
        destinationConstructor = (
            _: Dictionary<object>,
            destinationIdentifier: MetadataIdentifier
        ) => new (destinationIdentifier as Constructor)(),
        applyMetadata,
        postMap,
        preMap,
    } = { ...defaultSerializerOptions, ...options };

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
                const [metadataList, nestedConstructors] =
                    getMetadataList(identifier);
                metadataMap.set(identifier, metadataList);

                for (
                    let j = 0, nestedLength = nestedConstructors.length;
                    j < nestedLength;
                    j++
                ) {
                    const nestedConstructor = nestedConstructors[j];
                    if (getMetadataMap(mapper).has(nestedConstructor)) {
                        continue;
                    }
                    const nestedConstructorsMetadataMap =
                        this.retrieveMetadata(nestedConstructor);
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
        preMap,
        postMap,
    });
}
