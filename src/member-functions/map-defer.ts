import {
  DeferFunction,
  Dict,
  MapDeferFunction,
  SelectorReturn,
} from '../types';

export function mapDefer<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  defer: DeferFunction<TSource, TDestination, TSelectorReturn>
): ReturnType<MapDeferFunction<TSource, TDestination, TSelectorReturn>> {
  // 8: TransformationType.MapDefer
  return [8, null, defer];
}
