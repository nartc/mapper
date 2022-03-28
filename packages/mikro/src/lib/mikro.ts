import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataIdentifier,
} from '@automapper/core';
import { defaultSerializerOptions } from '@automapper/core';
import { serializeEntity } from './serialize-entity';

export function mikro(
    options: MappingStrategyInitializerOptions = {}
): MappingStrategyInitializer<Constructor> {
    const mergedOptions = {
        ...defaultSerializerOptions,
        destinationConstructor: (
            _: Dictionary<object>,
            destinationIdentifier: MetadataIdentifier
        ) => new (destinationIdentifier as Constructor)(),
        ...options,
    };

    if (mergedOptions.preMap === defaultSerializerOptions.preMap) {
        mergedOptions.preMap = <TSource extends Dictionary<TSource>>(
            source: TSource
        ) => serializeEntity(source) as TSource;
    }

    return classes(mergedOptions);
}
