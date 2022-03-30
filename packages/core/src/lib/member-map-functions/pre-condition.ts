import type {
    ConditionPredicate,
    Dictionary,
    PreConditionReturn,
    SelectorReturn,
} from '../types';

export function preCondition<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    predicate: ConditionPredicate<TSource>,
    defaultValue?: TSelectorReturn
): PreConditionReturn<TSource, TDestination, TSelectorReturn> {
    return [predicate, defaultValue];
}
