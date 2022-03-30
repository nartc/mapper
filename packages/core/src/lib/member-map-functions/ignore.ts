import type { Dictionary, IgnoreReturn, SelectorReturn } from '../types';
import { TransformationType } from '../types';

export function ignore<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(): IgnoreReturn<TSource, TDestination, TSelectorReturn> {
    return [TransformationType.Ignore];
}
