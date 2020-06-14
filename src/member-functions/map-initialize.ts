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
  defaultVal: undefined | null,
  ...paths: string[]
): ReturnType<MapInitializeFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    TransformationType.MapInitialize,
    null,
    source => get(source, defaultVal, ...paths),
  ];
}
