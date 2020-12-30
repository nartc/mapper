import type {
  Dictionary,
  FromValueFunction,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function fromValue<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  rawValue: TSelectorReturn
): ReturnType<FromValueFunction<TSource, TDestination, TSelectorReturn>> {
  return [TransformationType.FromValue, null, () => rawValue];
}
