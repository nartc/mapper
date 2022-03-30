import type { DeferFunction, Dictionary, MapDeferReturn } from '../types';
import { SelectorReturn, TransformationType } from '../types';

export function mapDefer<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    defer: DeferFunction<TSource, TDestination, TSelectorReturn>
): MapDeferReturn<TSource, TDestination, TSelectorReturn> {
    return [TransformationType.MapDefer, defer];
}
