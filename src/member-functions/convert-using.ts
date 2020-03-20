import {
  Converter,
  ConvertUsingFunction,
  Dict,
  Selector,
  SelectorReturn,
  TransformationType,
} from '../types';

export function convertUsing<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>,
  TConvertSource = TSource
>(
  converter: Converter<TConvertSource, TSelectorReturn>,
  value: Selector<TSource, TConvertSource>
): ReturnType<ConvertUsingFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<ConvertUsingFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = source => converter.convert(value(source));
  result.type = TransformationType.ConvertUsing as const;
  return result;
}
