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
  return [
    TransformationType.ConvertUsing as const,
    null,
    source => converter.convert(value(source)),
  ];
}
