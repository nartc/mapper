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
  return [
    TransformationType.MapWith as const,
    withValue,
    (source, mappingStorage) => {
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

      if (Array.isArray(sourceValue)) {
        if (isEmpty(sourceValue[0])) {
          return [];
        }

        const mapping = getMappingForDestination(
          withDestination,
          sourceValue[0].constructor,
          mappingStorage
        );
        return mapArray(sourceValue, mapping, undefined, mappingStorage) as any;
      }

      const mapping = getMappingForDestination(
        withDestination,
        sourceValue.constructor,
        mappingStorage
      );
      return map(
        sourceValue,
        mapping,
        undefined,
        mappingStorage
      ) as TSelectorReturn;
    },
  ];
}
