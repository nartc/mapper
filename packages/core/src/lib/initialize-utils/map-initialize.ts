import type {
  Dictionary,
  MapInitializeReturn,
  SelectorReturn
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function mapInitialize<TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>>(
  sourcePath: string[]
): MapInitializeReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.MapInitialize,
    (source) => get(source, sourcePath) as TSelectorReturn
  ];
}
