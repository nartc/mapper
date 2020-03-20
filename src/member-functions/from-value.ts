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
  const result: ReturnType<FromValueFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = () => rawValue;
  result.type = TransformationType.FromValue as const;
  return result;
}
