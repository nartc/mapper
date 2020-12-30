import type {
  Converter,
  ConvertUsingFunction,
  Dictionary,
  Selector,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function convertUsing<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>,
  TConvertSource = TSource
>(
  converter: Converter<TConvertSource, TSelectorReturn>,
  value?: Selector<TSource, TConvertSource>
): ReturnType<ConvertUsingFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    TransformationType.ConvertUsing,
    null,
    (source) => {
      const valueToConvert: TConvertSource = value
        ? value(source)
        : ((source as unknown) as TConvertSource);
      return converter.convert(valueToConvert);
    },
  ];
}
