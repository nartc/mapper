import { isResolver } from './is-resolver';
import type {
    Dictionary,
    MapWithArgumentsReturn,
    Resolver,
    SelectorReturn,
} from './types';
import { TransformationType } from './types';

export function mapWithArguments<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    withArgumentsResolver:
        | ((
              source: TSource,
              extraArguments: Record<string, unknown>
          ) => TSelectorReturn)
        | Resolver<TSource, Record<string, unknown>, TSelectorReturn>
): MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn> {
    if (isResolver(withArgumentsResolver)) {
        return [
            TransformationType.MapWithArguments,
            withArgumentsResolver.resolve.bind(withArgumentsResolver),
        ];
    }
    return [TransformationType.MapWithArguments, withArgumentsResolver];
}
