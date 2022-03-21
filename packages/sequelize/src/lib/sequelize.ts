import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { defaultSerializerOptions } from '@automapper/core';
import type { Model } from 'sequelize';

export function sequelize({
    destinationConstructor = (_, destinationIdentifier) => {
        if ('sequelize' in (destinationIdentifier as Constructor)) {
            return (destinationIdentifier as any).build();
        }
        return new (destinationIdentifier as Constructor)();
    },
    applyMetadata,
    postMap,
    preMap,
}: MappingStrategyInitializerOptions = defaultSerializerOptions): MappingStrategyInitializer<Constructor> {
    if (preMap === defaultSerializerOptions.preMap) {
        preMap = <TSource extends Dictionary<TSource>>(source: TSource) => {
            if ((source as unknown as Model).get) {
                return (source as unknown as Model).get();
            }
            return source;
        };
    }

    return classes({ destinationConstructor, applyMetadata, postMap, preMap });
}
