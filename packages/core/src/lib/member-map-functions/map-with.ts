import type {
  Dictionary,
  MapWithReturn,
  SelectorReturn,
} from '@automapper/types';
import {
  Fn,
  TransformationType,
  Unpacked,
  ValueSelector,
} from '@automapper/types';

export function mapWith<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  withDestination: Fn<Unpacked<unknown | TSelectorReturn>>,
  withSourceValue: ValueSelector<TSource>,
  withSource: Fn<unknown>
): MapWithReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.MapWith,
    (source, mapper) => {
      const sourceValue = withSourceValue(source);

      if (Array.isArray(sourceValue)) {
        return mapper.mapArray(
          sourceValue,
          withDestination() as string,
          withSource() as string
        ) as unknown as TSelectorReturn;
      }

      return mapper.map(
        sourceValue as Dictionary<unknown>,
        withDestination() as string,
        withSource() as string
      );
    },
    withSourceValue,
  ];
}
