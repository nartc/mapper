import {
  Dict,
  MapInitializeFunction,
  SelectorReturn,
  TransformationType,
} from '../types';
import { get } from '../utils';

export function mapInitialize<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  ...paths: string[]
): ReturnType<MapInitializeFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<MapInitializeFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = source => get(source, null, ...paths);
  result.type = TransformationType.MapInitialize as const;
  return result;
}
