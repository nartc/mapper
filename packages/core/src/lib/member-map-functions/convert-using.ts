import type {
  Converter,
  ConvertUsingReturn,
  Dictionary,
  Selector,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function convertUsing<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>,
  TConvertSource = TSource
>(
  converter: Converter<TConvertSource, TSelectorReturn>,
  value?: Selector<TSource, TConvertSource>
): ConvertUsingReturn<TSource, TConvertSource> {
  return [
    TransformationType.ConvertUsing,
    (source) => {
      let valueToConvert = source as unknown as TConvertSource;

      if (value) {
        valueToConvert = value(source);
      }
      return converter.convert(valueToConvert) as unknown as TConvertSource;
    },
  ];
}
