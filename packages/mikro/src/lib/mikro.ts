import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    Mapping,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataIdentifier,
} from '@automapper/core';
import {
    defaultStrategyInitializerOptions,
    MappingClassId,
} from '@automapper/core';
import { serializeEntity } from './serialize-entity';

export function mikro(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<Constructor> {
    const mergedOptions = {
        ...defaultStrategyInitializerOptions,
        destinationConstructor: (
            _: Dictionary<object>,
            destinationIdentifier: MetadataIdentifier
        ) => new (destinationIdentifier as Constructor)(),
        ...options,
    };

    if (mergedOptions.preMap === defaultStrategyInitializerOptions.preMap) {
        mergedOptions.preMap = <
            TSource extends Dictionary<TSource>,
            TDestination extends Dictionary<TDestination>
        >(
            source: TSource,
            mapping: Mapping<TSource, TDestination>
        ) => {
            const [sourceMetadataObject] =
                mapping[MappingClassId.identifierMetadata];
            return serializeEntity(source, sourceMetadataObject) as TSource;
        };
    }

    return classes(mergedOptions);
}
