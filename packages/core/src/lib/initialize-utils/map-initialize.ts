import type {
  Dictionary,
  MapInitializeReturn,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function mapInitialize<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  ...sourcePaths: string[]
): MapInitializeReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.MapInitialize,
    (source) => get(source, ...sourcePaths) as TSelectorReturn,
  ];
}
