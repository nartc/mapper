import { isResolver } from './is-resolver';
import type {
    Dictionary,
    MapFromReturn,
    Resolver,
    SelectorReturn,
    ValueSelector,
} from './types';
import { TransformationType } from './types';

export function mapFrom<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    from:
        | ValueSelector<TSource, TDestination, TSelectorReturn>
        | Resolver<TSource, TDestination, TSelectorReturn>
): MapFromReturn<TSource, TDestination, TSelectorReturn> {
    if (isResolver(from)) {
        return [TransformationType.MapFrom, from.resolve.bind(from)];
    }

    return [TransformationType.MapFrom, from];
}