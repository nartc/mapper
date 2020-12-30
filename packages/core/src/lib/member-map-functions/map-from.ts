import type {
  Dictionary,
  MapFromFunction,
  Resolver,
  SelectorReturn,
  ValueSelector,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function mapFrom<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  from:
    | ValueSelector<TSource, TDestination, TSelectorReturn>
    | Resolver<TSource, TDestination, TSelectorReturn>
): ReturnType<MapFromFunction<TSource, TDestination, TSelectorReturn>> {
  if (isResolver(from)) {
    return [TransformationType.MapFrom, null, from.resolve.bind(from)];
  }

  return [TransformationType.MapFrom, from, from];
}

function isResolver(fn: ValueSelector | Resolver): fn is Resolver {
  return 'resolve' in fn;
}
