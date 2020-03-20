import {
  Dict,
  MapFromFunction,
  Resolver,
  SelectorReturn,
  TransformationType,
  ValueSelector,
} from '../types';
import { isResolver } from '../utils';

export function mapFrom<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  from:
    | ValueSelector<TSource, TDestination, TSelectorReturn>
    | Resolver<TSource, TDestination, TSelectorReturn>
): ReturnType<MapFromFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<MapFromFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = (source, destination, transformation) => {
    if (isResolver(from)) {
      return from.resolve(source, destination, transformation);
    }

    return from(source);
  };
  result.type = TransformationType.MapFrom as const;
  result.fromSelector = from as ValueSelector;

  return result;
}
