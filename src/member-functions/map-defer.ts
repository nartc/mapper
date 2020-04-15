import {
  DeferFunction,
  Dict,
  MapDeferFunction,
  SelectorReturn,
  TransformationType,
} from '../types';

export function mapDefer<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  defer: DeferFunction<TSource, TDestination, TSelectorReturn>
): ReturnType<MapDeferFunction<TSource, TDestination, TSelectorReturn>> {
  return [TransformationType.MapDefer as const, null, defer];
}
