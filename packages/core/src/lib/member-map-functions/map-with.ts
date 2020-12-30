import type {
  Dictionary,
  MapWithFunction,
  SelectorReturn,
} from '@automapper/types';
import {
  Fn,
  TransformationType,
  Unpacked,
  ValueSelector,
} from '@automapper/types';

export function mapWith<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  withDestination: Fn<Unpacked<unknown | TSelectorReturn>>,
  withSourceValue: ValueSelector<TSource>,
  withSource: Fn<unknown>
): ReturnType<MapWithFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    TransformationType.MapWith,
    withSourceValue,
    (source, mapper) => {
      const sourceValue = withSourceValue(source);
      return mapper.map(
        sourceValue,
        withDestination() as string,
        withSource() as string
      );
    },
  ];
}
