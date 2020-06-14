import { Dict, FromValueFunction, SelectorReturn } from '../types';

export function fromValue<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  rawValue: TSelectorReturn
): ReturnType<FromValueFunction<TSource, TDestination, TSelectorReturn>> {
  // 3: TransformationType.FromValue
  return [3, null, () => rawValue];
}
