import type { Dictionary, MapCallback, MappingConfiguration } from '../types';
import { MappingCallbacksClassId, MappingClassId } from '../types';

export function afterMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    cb: MapCallback<TSource, TDestination>
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        if (mapping[MappingClassId.callbacks] == null) {
            mapping[MappingClassId.callbacks] = [];
        }
        mapping[MappingClassId.callbacks]![MappingCallbacksClassId.afterMap] =
            cb;
    };
}
