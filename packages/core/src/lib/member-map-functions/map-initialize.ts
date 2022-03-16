import type { Dictionary, MapInitializeReturn, SelectorReturn } from '../types';
import { TransformationType } from '../types';
import { get } from '../utils/get';

export function mapInitialize<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    sourcePath: string[]
): MapInitializeReturn<TSource, TDestination, TSelectorReturn> {
    return [
        TransformationType.MapInitialize,
        (source) => get(source, sourcePath) as TSelectorReturn,
    ];
}
