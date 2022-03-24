import type {
    Dictionary,
    SelectorReturn,
    UndefinedSubstitutionReturn,
} from '../types';
import { TransformationType } from '../types';
import { get } from '../utils/get';

export function undefinedSubstitution<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    substitution: TSelectorReturn
): UndefinedSubstitutionReturn<TSource, TDestination, TSelectorReturn> {
    return [
        TransformationType.UndefinedSubstitution,
        (source, sourceMemberPath) => {
            const sourceValue = get(
                source,
                sourceMemberPath
            ) as TSelectorReturn;
            return sourceValue === undefined ? substitution : sourceValue;
        },
    ];
}
