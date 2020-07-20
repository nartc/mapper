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
  value?: Selector<TSource, TConvertSource>
): ReturnType<ConvertUsingFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    5, // 5: TransformationType.ConvertUsing
    null,
    source => {
      let valueToConvert: TConvertSource;
      if (value) {
        valueToConvert = value(source);
      } else {
        valueToConvert = (source as unknown) as TConvertSource;
      }
      return converter.convert(valueToConvert);
    },
  ];
}
