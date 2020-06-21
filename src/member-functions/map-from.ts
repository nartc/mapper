import {
  Dict,
  MapFromFunction,
  Resolver,
  SelectorReturn,
  ValueSelector,
} from '../types';

export function mapFrom<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  from:
    | ValueSelector<TSource, TDestination, TSelectorReturn>
    | Resolver<TSource, TDestination, TSelectorReturn>
): ReturnType<MapFromFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    1, // 1: TransformationType.MapFrom
    from as ValueSelector<TSource, TDestination, TSelectorReturn>,
    (source, destination) => {
      if (isResolver(from)) {
        return from.resolve(source, destination);
      }

      return from(source);
    },
  ];
}

function isResolver(fn: ValueSelector | Resolver<any>): fn is Resolver<any> {
  return 'resolve' in fn;
}
