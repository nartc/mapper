import type {
  Dictionary,
  MapInitializeFunction,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function mapInitialize<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  ...sourcePaths: string[]
): ReturnType<MapInitializeFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    TransformationType.MapInitialize,
    null,
    (source) => get(source, ...sourcePaths) as TSelectorReturn,
  ];
}
