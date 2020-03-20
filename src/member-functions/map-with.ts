import { getMappingForDestination, map, mapArray } from '../core';
import {
  Constructible,
  Dict,
  MapWithFunction,
  SelectorReturn,
  TransformationType,
  Unpacked,
  ValueSelector,
} from '../types';
import { isClass, isEmpty } from '../utils';

export function mapWith<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  withDestination: Constructible<Unpacked<TSelectorReturn>>,
  withValue: ValueSelector<TSource>
): ReturnType<MapWithFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<MapWithFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = source => {
    const sourceValue = withValue(source);
    if (isEmpty(sourceValue)) {
      return null;
    }

    if (!isClass(sourceValue)) {
      console.warn(
        `MapWith was invoked with a primitive. No mapping was executed`
      );
      return null;
    }

    const mapping = getMappingForDestination(
      withDestination,
      sourceValue.constructor
    );
    if (Array.isArray(sourceValue)) {
      return isEmpty(sourceValue[0])
        ? []
        : (mapArray(sourceValue, mapping) as any);
    }

    return map(sourceValue, mapping) as TSelectorReturn;
  };
  result.withValueSelector = withValue;
  result.type = TransformationType.MapWith as const;
  return result;
}
