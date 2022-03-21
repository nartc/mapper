import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { defaultSerializerOptions } from '@automapper/core';
import { serializeEntity } from './serialize-entity';

export function mikro({
    destinationConstructor = (_, destinationIdentifier) =>
        new (destinationIdentifier as Constructor)(),
    applyMetadata,
    postMap,
    preMap = <TSource extends Dictionary<TSource>>(source: TSource) =>
        serializeEntity(source) as TSource,
}: MappingStrategyInitializerOptions = defaultSerializerOptions): MappingStrategyInitializer<Constructor> {
    return classes({ destinationConstructor, applyMetadata, preMap, postMap });
}
