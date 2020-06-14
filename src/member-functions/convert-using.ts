import {
  Converter,
  ConvertUsingFunction,
  Dict,
  Selector,
  SelectorReturn,
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
    5, // 5: TransformationType.ConvertUsing
    null,
    source => converter.convert(value(source)),
  ];
}
