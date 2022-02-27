import type { Dictionary, MapInitializeReturn, SelectorReturn } from '../types';
import { TransformationType } from '../types';
import { get } from '../utils';

export function mapInitialize<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  sourcePath: string[]
): MapInitializeReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.MapInitialize,
    (source) => get(source, sourcePath) as TSelectorReturn,
  ];
}
