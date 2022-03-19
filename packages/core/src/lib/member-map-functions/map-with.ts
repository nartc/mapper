import type {
    Dictionary,
    MapWithReturn,
    ModelIdentifier,
    SelectorReturn,
} from '../types';
import { TransformationType, ValueSelector } from '../types';

type Constructor<TModel> = new (...args: unknown[]) => TModel;

export function mapWith<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>,
    TWithDestination extends ModelIdentifier = ModelIdentifier,
    TWithSource extends ModelIdentifier = ModelIdentifier,
    TWithSourceValue extends ValueSelector = TWithSource extends Constructor<
        infer InferredWithSource
    >
        ? ValueSelector<TSource, InferredWithSource>
        : ValueSelector<TSource>
>(
    withDestination: TWithDestination,
    withSource: TWithSource,
    withSourceValue: TWithSourceValue
): MapWithReturn<TSource, TDestination, TSelectorReturn> {
    return [
        TransformationType.MapWith,
        (source, mapper) => {
            const sourceValue = withSourceValue(source);

            if (Array.isArray(sourceValue)) {
                return mapper.mapArray(
                    sourceValue,
                    withSource,
                    withDestination
                ) as unknown as TSelectorReturn;
            }

            return mapper.map(
                sourceValue,
                withSource,
                withDestination
            ) as unknown as TSelectorReturn;
        },
    ];
}
