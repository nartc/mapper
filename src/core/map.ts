import set from 'lodash.set';
import {
  ConditionFunction,
  ConvertUsingFunction,
  Dict,
  FromValueFunction,
  IgnoreFunction,
  MapFromFunction,
  MapInitializeFunction,
  MapOptions,
  Mapping,
  MapWithFunction,
  NullSubstitutionFunction,
  TransformationType,
} from '../types';
import {
  get,
  getSourcePropertyKey,
  isClass,
  isDate,
  isEmpty,
  isObjectLike,
  isThisMemberMap,
} from '../utils';
import { getMappingForDestination } from './get-mapping-for-destination';
import { getMappingForNestedKey } from './get-mapping-for-nested-key';
import { instantiate } from './instantiate';

export function map<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  sourceObj: TSource,
  mapping: Mapping<TSource, TDestination>,
  options: MapOptions<TSource, TDestination> = {
    beforeMap: undefined,
    afterMap: undefined,
  },
  isArrayMap: boolean = false
): TDestination {
  const [
    [sourceModel, destinationModel],
    [sourceConvention, destinationConvention],
    props,
    actions,
  ] = mapping as Required<Mapping<TSource, TDestination>>;
  if (!(sourceObj instanceof sourceModel)) {
    sourceObj = instantiate(sourceModel, sourceObj);
  }
  const [beforeAction, afterAction] = actions || [];
  const { beforeMap, afterMap } = options;
  const configKeys = [];

  let destination = instantiate(destinationModel);

  if (!isArrayMap) {
    if (beforeMap) {
      beforeMap(sourceObj, destination, { ...mapping } as any);
    } else if (beforeAction) {
      beforeAction(sourceObj, destination, { ...mapping } as any);
    }
  }

  let i = props.length;
  while (i--) {
    const [memberPath, { transformation }] = props[i];
    configKeys.push(memberPath);

    if (transformation.preCond && !transformation.preCond(sourceObj)) {
      set(
        destination,
        memberPath,
        transformation.preCond?.defaultValue ?? null
      );
      continue;
    }

    if (
      isThisMemberMap<IgnoreFunction>(
        transformation.mapFn,
        TransformationType.Ignore
      )
    ) {
      set(destination, memberPath, null);
      continue;
    }

    const sourceMemberPath = getSourcePropertyKey(
      [sourceConvention, destinationConvention],
      memberPath
    );

    if (
      isThisMemberMap<MapInitializeFunction>(
        transformation.mapFn,
        TransformationType.MapInitialize
      )
    ) {
      const mapInitializeValue = transformation.mapFn(sourceObj);
      if (mapInitializeValue == null) {
        set(destination, memberPath, null);
        continue;
      }

      if (isObjectLike(mapInitializeValue)) {
        if (isDate(mapInitializeValue)) {
          set(destination, memberPath, new Date(mapInitializeValue));
          continue;
        }

        if (Array.isArray(mapInitializeValue)) {
          const first = mapInitializeValue[0];
          if (isEmpty(first)) {
            set(destination, memberPath, []);
            continue;
          }

          if (!isObjectLike(first)) {
            set(destination, memberPath, mapInitializeValue.slice());
            continue;
          }

          const nestedMapping = getMappingForNestedKey(
            destinationModel,
            memberPath as keyof TDestination,
            first.constructor
          );
          set(
            destination,
            memberPath,
            mapArray(mapInitializeValue, nestedMapping)
          );
          continue;
        }
      }

      if (
        (typeof mapInitializeValue === 'object' ||
          typeof mapInitializeValue === 'function') &&
        isClass(mapInitializeValue)
      ) {
        const nestedMapping = getMappingForDestination(
          get(destination, null, memberPath).constructor,
          mapInitializeValue.constructor
        );
        set(destination, memberPath, map(mapInitializeValue, nestedMapping));
        continue;
      }

      set(destination, memberPath, mapInitializeValue);
      continue;
    }

    let value: any;
    if (
      isThisMemberMap<ConditionFunction>(
        transformation.mapFn,
        TransformationType.Condition
      ) ||
      isThisMemberMap<NullSubstitutionFunction>(
        transformation.mapFn,
        TransformationType.NullSubstitution
      )
    ) {
      value = transformation.mapFn(sourceObj, sourceMemberPath);
    } else if (
      isThisMemberMap<MapFromFunction>(
        transformation.mapFn,
        TransformationType.MapFrom
      )
    ) {
      value = transformation.mapFn(sourceObj, destination, transformation);
    } else if (
      isThisMemberMap<MapWithFunction>(
        transformation.mapFn,
        TransformationType.MapWith
      ) ||
      isThisMemberMap<FromValueFunction>(
        transformation.mapFn,
        TransformationType.FromValue
      ) ||
      isThisMemberMap<ConvertUsingFunction>(
        transformation.mapFn,
        TransformationType.ConvertUsing
      )
    ) {
      value = transformation.mapFn(sourceObj);
    }

    set(destination, memberPath, value);
  }

  if (!isArrayMap) {
    if (afterMap) {
      afterMap(sourceObj, destination, { ...mapping } as any);
    } else if (afterAction) {
      afterAction(sourceObj, destination, { ...mapping } as any);
    }
  }

  return destination;
}

export function mapArray<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  sourceArray: TSource[],
  mapping: Mapping<TSource, TDestination>,
  options: MapOptions<TSource[], TDestination[]> = {
    beforeMap: undefined,
    afterMap: undefined,
  }
): TDestination[] {
  let destination: TDestination[] = [];
  const { beforeMap, afterMap } = options;

  if (beforeMap) {
    beforeMap(sourceArray, destination, { ...mapping });
  }

  const len = sourceArray.length;
  if (!len) {
    if (afterMap) {
      afterMap(sourceArray, destination, { ...mapping });
    }

    return destination;
  }

  for (let i = 0; i < len; i++) {
    const source = sourceArray[i];
    destination.push(map(source, mapping, {}, true));
  }

  if (afterMap) {
    afterMap(sourceArray, destination, { ...mapping });
  }

  return destination;
}
