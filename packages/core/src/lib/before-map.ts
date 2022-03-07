import type { Dictionary, MapCallback, MappingConfigurationFn } from './types';
import { MappingCallbacksClassId, MappingClassId } from './types';

export function beforeMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    cb: MapCallback<TSource, TDestination>
): MappingConfigurationFn<TSource, TDestination> {
    return () => {
        return (mapping) => {
            if (mapping[MappingClassId.callbacks] == null) {
                mapping[MappingClassId.callbacks] = [];
            }
            mapping[MappingClassId.callbacks][
                MappingCallbacksClassId.beforeMap
            ] = cb;
        };
    };
}
