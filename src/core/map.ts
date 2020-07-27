import set from 'lodash.set';
import { MappingStorage } from '../storages';
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
  MemberMapFunction,
  MemberMapFunctionId,
  NullSubstitutionFunction,
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

function mapMember<TSource, TDestination>(
  mapFn: ReturnType<MemberMapFunction<TSource, TDestination>>,
  sourceObj: TSource,
  sourceMemberPath: string,
  destination: TDestination,
  mappingStorage: MappingStorage,
  defaultValue: undefined | null
) {
  let value: unknown;
  /**
   * 0: TransformationType.Ignore
   * 1: TransformationType.MapFrom
   * 2: TransformationType.Condition
   * 3: TransformationType.FromValue
   * 4: TransformationType.MapWith
   * 5: TransformationType.ConvertUsing
   * 7: TransformationType.NullSubstitution
   */
  if (isThisMemberMap<NullSubstitutionFunction>(mapFn, 7)) {
    value = mapFn[MemberMapFunctionId.fn](sourceObj, sourceMemberPath);
  } else if (isThisMemberMap<ConditionFunction>(mapFn, 2)) {
    value = mapFn[MemberMapFunctionId.fn](
      sourceObj,
      defaultValue,
      sourceMemberPath
    );
  } else if (isThisMemberMap<MapFromFunction>(mapFn, 1)) {
    value = mapFn[MemberMapFunctionId.fn](sourceObj, destination);
  } else if (isThisMemberMap<MapWithFunction>(mapFn, 4)) {
    value = mapFn[MemberMapFunctionId.fn](sourceObj, mappingStorage);
  } else if (isThisMemberMap<ConvertUsingFunction>(mapFn, 5)) {
    value = mapFn[MemberMapFunctionId.fn](sourceObj);
  } else if (isThisMemberMap<FromValueFunction>(mapFn, 3)) {
    value = mapFn[MemberMapFunctionId.fn]();
  } else if (isThisMemberMap<IgnoreFunction>(mapFn, 0)) {
    value = defaultValue;
  } else {
    const memberMapFunction = mapFn[MemberMapFunctionId.fn](
      sourceObj,
      sourceMemberPath
    );
    value = mapMember(
      memberMapFunction,
      sourceObj,
      sourceMemberPath,
      destination,
      mappingStorage,
      defaultValue
    );
  }

  return value;
}

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
  mappingStorage: MappingStorage,
  isArrayMap: boolean = false
): TDestination {
  const [
    [sourceModel, destinationModel],
    [useUndefined, sourceConvention, destinationConvention],
    props,
    actions,
  ] = mapping as Required<Mapping<TSource, TDestination>>;

  /**
   * If sourceObj is a POJO (plain object)
   * then instantiate it to become an instance of sourceModel
   */
  if (!(sourceObj instanceof sourceModel)) {
    sourceObj = instantiate(sourceModel, sourceObj);
  }

  const defaultEmptyValue = useUndefined ? undefined : null;
  const [beforeAction, afterAction] = actions;
  const { beforeMap, afterMap } = options;
  const configKeys = [];

  const destination = instantiate(destinationModel);

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

    if (transformation.preCond && !transformation.preCond[0](sourceObj)) {
      set(
        destination,
        memberPath,
        transformation.preCond[1] ?? defaultEmptyValue
      );
      continue;
    }

    const sourceMemberPath = getSourcePropertyKey(
      [sourceConvention, destinationConvention],
      memberPath
    );

    // 6: TransformationType.MapInitialize
    if (isThisMemberMap<MapInitializeFunction>(transformation.mapFn, 6)) {
      const mapInitializeValue = transformation.mapFn[MemberMapFunctionId.fn](
        sourceObj
      );
      if (mapInitializeValue == null) {
        set(destination, memberPath, defaultEmptyValue);
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
            first.constructor,
            mappingStorage
          );
          set(
            destination,
            memberPath,
            mapArray(
              mapInitializeValue,
              nestedMapping,
              undefined,
              mappingStorage
            )
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
          mapInitializeValue.constructor,
          mappingStorage
        ) as Mapping;
        set(
          destination,
          memberPath,
          map(mapInitializeValue, nestedMapping, undefined, mappingStorage)
        );
        continue;
      }

      set(destination, memberPath, mapInitializeValue);
      continue;
    }

    set(
      destination,
      memberPath,
      mapMember(
        transformation.mapFn,
        sourceObj,
        sourceMemberPath,
        destination,
        mappingStorage,
        defaultEmptyValue
      )
    );
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
  },
  mappingStorage: MappingStorage
): TDestination[] {
  let destination: TDestination[] = [];
  const { beforeMap, afterMap } = options;

  if (beforeMap) {
    beforeMap(sourceArray, destination, { ...mapping });
  }

  for (let i = 0, len = sourceArray.length; i < len; i++) {
    destination.push(map(sourceArray[i], mapping, {}, mappingStorage, true));
  }

  if (afterMap) {
    afterMap(sourceArray, destination, { ...mapping });
  }

  return destination;
}
