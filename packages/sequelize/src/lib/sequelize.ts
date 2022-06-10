import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
    MetadataIdentifier,
} from '@automapper/core';
import { defaultStrategyInitializerOptions } from '@automapper/core';
import type { Model } from 'sequelize';

export function sequelize(
    options: MappingStrategyInitializerOptions = defaultStrategyInitializerOptions
): MappingStrategyInitializer<Constructor> {
    const mergedOptions = {
        ...defaultStrategyInitializerOptions,
        destinationConstructor: (
            _: Dictionary<object>,
            destinationIdentifier: MetadataIdentifier
        ) => {
            if ('sequelize' in (destinationIdentifier as Constructor)) {
                return (destinationIdentifier as any).build();
            }
            return new (destinationIdentifier as Constructor)();
        },
        ...options,
    };

    if (mergedOptions.preMap === defaultStrategyInitializerOptions.preMap) {
        mergedOptions.preMap = <TSource extends Dictionary<TSource>>(
            source: TSource
        ) => {
            if ((source as unknown as Model).get) {
                return (source as unknown as Model).get();
            }
            return source;
        };
    }

    return classes(mergedOptions);
}
