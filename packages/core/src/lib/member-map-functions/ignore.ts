import type { Dictionary, IgnoreReturn } from '../types';
import { TransformationType } from '../types';

export function ignore<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(): IgnoreReturn<TSource, TDestination> {
    return [TransformationType.Ignore];
}
