import type { Dictionary, FromValueReturn, SelectorReturn } from '../types';
import { TransformationType } from '../types';

export function fromValue<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    rawValue: TSelectorReturn
): FromValueReturn<TSource, TDestination, TSelectorReturn> {
    return [TransformationType.FromValue, () => rawValue];
}
