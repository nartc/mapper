import {
  Dict,
  MapFromFunction,
  Resolver,
  SelectorReturn,
  TransformationType,
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
    TransformationType.MapFrom as const,
    from as ValueSelector,
    (source, destination, transformation) => {
      if (isResolver(from)) {
        return from.resolve(source, destination, transformation);
      }

      return from(source);
    },
  ];
}

function isResolver(
  fn: ValueSelector | Resolver<any, any>
): fn is Resolver<any, any> {
  return 'resolve' in fn;
}
