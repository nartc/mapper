import { classes } from '@automapper/classes';
import type {
    Constructor,
    Dictionary,
    MappingStrategyInitializer,
    MappingStrategyInitializerOptions,
} from '@automapper/core';
import { defaultApplyMetadata } from '@automapper/core';
import { serializeEntity } from './serialize-entity';

export function mikro({
    destinationConstructor = (_, destinationIdentifier) =>
        new (destinationIdentifier as Constructor)(),
    applyMetadata = defaultApplyMetadata,
    postMap,
    preMap = <TSource extends Dictionary<TSource>>(source: TSource) =>
        serializeEntity(source) as TSource,
}: MappingStrategyInitializerOptions = {}): MappingStrategyInitializer<Constructor> {
    return classes({ destinationConstructor, applyMetadata, preMap, postMap });
}
