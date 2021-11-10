import type {
  Dictionary,
  MapWithArgumentsReturn,
  Resolver,
  SelectorReturn,
} from '../types';
import { TransformationType } from '../types';
import { isResolver } from '../utils';

export function mapWithArguments<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
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
