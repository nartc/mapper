import type {
    Converter,
    ConvertUsingReturn,
    Dictionary,
    SelectorReturn,
} from './types';
import { TransformationType } from './types';

export function convertUsing<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
>(
    converter: Converter<TSource, TSelectorReturn>
): ConvertUsingReturn<TSource, TDestination, TSelectorReturn> {
    return [
        TransformationType.ConvertUsing,
        (source) => converter.convert(source),
    ];
}
