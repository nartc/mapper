import {
  Dict,
  FromValueFunction,
  SelectorReturn,
  TransformationType,
} from '../types';

export function fromValue<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  rawValue: TSelectorReturn
): ReturnType<FromValueFunction<TSource, TDestination, TSelectorReturn>> {
  return [TransformationType.FromValue as const, null, () => rawValue];
}
