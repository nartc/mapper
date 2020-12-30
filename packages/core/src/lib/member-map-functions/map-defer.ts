import type {
  DeferFunction,
  Dictionary,
  MapDeferFunction,
} from '@automapper/types';
import { SelectorReturn, TransformationType } from '@automapper/types';

export function mapDefer<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  defer: DeferFunction<TSource, TDestination, TSelectorReturn>
): ReturnType<MapDeferFunction<TSource, TDestination, TSelectorReturn>> {
  return [TransformationType.MapDefer, null, defer];
}
