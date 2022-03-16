import type {
    Dictionary,
    NullSubstitutionReturn,
    SelectorReturn,
} from '../types';
import { TransformationType } from '../types';
import { get } from '../utils/get';

export function nullSubstitution<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    substitution: TSelectorReturn
): NullSubstitutionReturn<TSource, TDestination, TSelectorReturn> {
    return [
        TransformationType.NullSubstitution,
        (source, sourceMemberPath) => {
            const sourceValue = get(
                source,
                sourceMemberPath
            ) as TSelectorReturn;
            return sourceValue === null ? substitution : sourceValue;
        },
    ];
}
