import type {
  Dictionary,
  MapWithArgumentsReturn,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function mapWithArguments<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  withArgumentsResolver: (
    source: TSource,
    extraArguments: Record<string, unknown>
  ) => TSelectorReturn
): MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn> {
  return [TransformationType.MapWithArguments, withArgumentsResolver];
}
