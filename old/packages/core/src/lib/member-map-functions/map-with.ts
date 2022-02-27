import type { Dictionary, MapWithReturn, SelectorReturn } from '../types';
import { TransformationType, Unpacked, ValueSelector } from '../types';

type Constructor<TModel> = new (...args: unknown[]) => TModel;

export function mapWith<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>,
  TWithDestination extends Constructor<Unpacked<TSelectorReturn>> | string =
    | Constructor<Unpacked<TSelectorReturn>>
    | string,
  TWithSource extends Constructor<unknown> | string =
    | Constructor<unknown>
    | string,
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
          withDestination as string,
          withSource as unknown as string
        ) as unknown as TSelectorReturn;
      }

      return mapper.map(
        sourceValue as Dictionary<unknown>,
        withDestination as string,
        withSource as unknown as string
      );
    },
    withSourceValue,
  ];
}
