import type { MappingConfiguration } from '../types';
import { mapFrom } from '../member-map-functions/map-from';

import { forMember } from './for-member';

export function autoMap<
    TSource extends { [key in TKey]: TValue },
    TDestination extends { [key in TKey]: TValue },
    TKey extends keyof TSource & keyof TDestination,
    TValue extends TSource[TKey] & TDestination[TKey]
>(prop: TKey): MappingConfiguration<TSource, TDestination> {
    return forMember(
        (dest) => dest[prop] as TValue,
        mapFrom((src) => src[prop])
    );
}
