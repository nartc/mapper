/* eslint-disable prefer-const */
import type {
  ConditionReturn,
  ConvertUsingReturn,
  Dictionary,
  ErrorHandler,
  FromValueReturn,
  MapArrayOptions,
  MapDeferReturn,
  MapFromReturn,
  MapInitializeReturn,
  MapOptions,
  Mapper,
  Mapping,
  MapWithArgumentsReturn,
  MapWithReturn,
  MemberMapReturn,
} from '@automapper/types';
import { MapFnClassId, TransformationType } from '@automapper/types';
import { isEmpty } from '../utils';
import { set, setMutate } from './set.util';

/**
 * Instruction on how to map a particular member on the destination
 *
 * @param {MemberMapReturn} transformationMapFn - Transformation information of the property
 * @param {TSource} sourceObj - The sourceObject being used to map to destination
 * @param destination - destination meta key
 * @param {string} destinationMemberPath - the property path on the destination
 * @param {Record<string, any>} extraArguments
 * @param {Mapper} mapper - the mapper instance
 */
function mapMember<TSource extends Dictionary<TSource> = any>(
  transformationMapFn: MemberMapReturn,
  sourceObj: TSource,
  destination: unknown,
  destinationMemberPath: string,
  extraArguments: Record<string, unknown> | undefined,
  mapper: Mapper
) {
  let value: unknown;
  const transformationType: TransformationType =
    transformationMapFn[MapFnClassId.type];
  const mapFn = transformationMapFn[MapFnClassId.fn];

  switch (transformationType) {
    case TransformationType.MapFrom:
      value = (mapFn as MapFromReturn[MapFnClassId.fn])(sourceObj, destination);
      break;
    case TransformationType.FromValue:
      value = (mapFn as FromValueReturn[MapFnClassId.fn])();
      break;
    case TransformationType.MapWith:
      value = (mapFn as MapWithReturn[MapFnClassId.fn])(sourceObj, mapper);
      break;
    case TransformationType.ConvertUsing:
      value = (mapFn as ConvertUsingReturn[MapFnClassId.fn])(sourceObj);
      break;
    case TransformationType.Condition:
    case TransformationType.NullSubstitution:
      value = (mapFn as ConditionReturn[MapFnClassId.fn])(
        sourceObj,
        destinationMemberPath
      );
      break;
    case TransformationType.MapWithArguments:
      value = (mapFn as MapWithArgumentsReturn[MapFnClassId.fn])(
        sourceObj,
        extraArguments || {}
      );
      break;
    case TransformationType.MapDefer:
      value = mapMember(
        (mapFn as MapDeferReturn[MapFnClassId.fn])(
          sourceObj
        ) as MemberMapReturn,
        sourceObj,
        destination,
        destinationMemberPath,
        extraArguments,
        mapper
      );
      break;
  }
  return value;
}

/**
 * Depends on implementation of plugin.initializeMapping
 */
function assertUnmappedProperties<
  TDestination extends Dictionary<TDestination> = any
>(
  destination: TDestination,
  configuredKeys: string[],
  errorHandler: ErrorHandler
) {
  const unmappedKeys = Object.keys(destination).filter(
    (k) => !configuredKeys.includes(k)
  );
  if (unmappedKeys.length) {
    errorHandler.handle(`
Unmapped properties:
-------------------
${unmappedKeys.join(',\n')}
`);
  }
}

/**
 *
 * @param {TSource} sourceObj - the source object
 * @param {Mapping} mapping - the Mapping object of source <> destination
 * @param {MapOptions} options - options used for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - the error handler
 * @param {boolean} [isMapArray = false] - whether the map operation is in Array mode
 */
export function mapReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  sourceObj: TSource,
  mapping: Mapping<TSource, TDestination>,
  options: MapOptions<TSource, TDestination>,
  mapper: Mapper,
  errorHandler: ErrorHandler,
  isMapArray = false
): TDestination {
  const setMemberReturn = (
    destinationMemberPath: string,
    destination?: TDestination
  ) => (value: unknown) => {
    destination = set(destination!, destinationMemberPath, value);
  };
  return map(
    sourceObj,
    mapping,
    options,
    mapper,
    errorHandler,
    setMemberReturn,
    isMapArray
  );
}

/**
 *
 * @param {TSource} sourceObj - the source object
 * @param {Mapping} mapping - the Mapping object of source <> destination
 * @param {MapOptions} options - options used for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - the error handler
 * @param {TDestination} destinationObj - the destination obj to be mutated
 */
export function mapMutate<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  sourceObj: TSource,
  mapping: Mapping<TSource, TDestination>,
  options: MapOptions<TSource, TDestination>,
  mapper: Mapper,
  errorHandler: ErrorHandler,
  destinationObj: TDestination
): void {
  const setMemberMutate = (destinationMember: string) => (value: unknown) => {
    setMutate(destinationObj, destinationMember, value);
  };
  map(sourceObj, mapping, options, mapper, errorHandler, setMemberMutate);
}

/**
 *
 * @param {TSource} sourceObj - the source object
 * @param {Mapping} mapping - the Mapping object of source <> destination
 * @param {MapOptions} options - options used for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - the error handler
 * @param {Function} setMemberFn
 * @param {boolean} [isMapArray = false] - whether the map operation is in Array mode
 */
function map<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  sourceObj: TSource,
  mapping: Mapping<TSource, TDestination>,
  options: MapOptions<TSource, TDestination>,
  mapper: Mapper,
  errorHandler: ErrorHandler,
  setMemberFn: (
    destinationMemberPath: string,
    destination?: TDestination
  ) => (value: unknown) => void,
  isMapArray = false
) {
  // destructure the mapping
  let [
    [, destination],
    propsToMap,
    [mappingBeforeAction, mappingAfterAction],
  ] = mapping;

  // initialize an array of keys that have already been configured
  const configuredKeys: string[] = [];

  // deconstruct MapOptions
  const {
    beforeMap: mapBeforeAction,
    afterMap: mapAfterAction,
    extraArguments,
  } = options ?? {};

  // Before Map
  // Do not run before map when in Map Array mode
  if (!isMapArray) {
    const beforeMap = mapBeforeAction ?? mappingBeforeAction;
    if (beforeMap) {
      beforeMap(sourceObj, destination);
    }
  }

  // map
  let i = propsToMap.length;
  while (i--) {
    // Destructure a props on Mapping which is [propertyKey, MappingProperty, nested?]
    const [
      destinationMemberPath,
      [
        ,
        [
          transformationMapFn,
          isMetadataNull = false,
          [
            transformationPreCondPredicate,
            preCondDefaultValue = undefined,
          ] = [],
        ],
      ],
      [nestedDestinationMemberKey, nestedSourceMemberKey] = [],
    ] = propsToMap[i];

    // Setup a shortcut function to set destinationMemberPath on destination with value as argument
    const setMember = (valFn: () => unknown) => {
      try {
        const val = valFn();
        return setMemberFn(destinationMemberPath, destination)(val);
      } catch (originalError) {
        const errorMessage = `
Error at "${destinationMemberPath}" on ${JSON.stringify(destination)}
---------------------------------------------------------------------
Original error: ${originalError}`;
        errorHandler.handle(errorMessage);
        throw new Error(errorMessage);
      }
    };

    // This destination key is being configured. Push to configuredKeys array
    configuredKeys.push(destinationMemberPath);

    // Pre Condition check
    if (
      transformationPreCondPredicate &&
      !transformationPreCondPredicate(sourceObj)
    ) {
      setMember(() => preCondDefaultValue);
      continue;
    }

    // Start with all the mapInitialize
    if (
      transformationMapFn[MapFnClassId.type] ===
      TransformationType.MapInitialize
    ) {
      const mapInitializedValue = (transformationMapFn[
        MapFnClassId.fn
      ] as MapInitializeReturn[MapFnClassId.fn])(sourceObj);

      // if null/undefined
      // if isDate
      // if metadata is null, treat as-is
      if (
        mapInitializedValue == null ||
        mapInitializedValue instanceof Date ||
        isMetadataNull
      ) {
        setMember(() => mapInitializedValue);
        continue;
      }

      // if isArray
      if (Array.isArray(mapInitializedValue)) {
        const [first] = mapInitializedValue;
        // if first item is a primitive
        if (typeof first !== 'object') {
          setMember(() => mapInitializedValue.slice());
          continue;
        }

        // if first is empty
        if (isEmpty(first)) {
          setMember(() => []);
          continue;
        }

        setMember(() =>
          mapArray(
            mapInitializedValue,
            nestedDestinationMemberKey,
            nestedSourceMemberKey,
            { extraArguments },
            mapper,
            errorHandler
          )
        );
        continue;
      }

      // if is object
      if (typeof mapInitializedValue === 'object') {
        const nestedMapping = mapper.getMapping(
          nestedSourceMemberKey,
          nestedDestinationMemberKey
        );
        // for nested model, we do not care about mutate or return. we will always need to return
        setMember(() =>
          map(
            mapInitializedValue,
            nestedMapping!,
            {},
            mapper,
            errorHandler,
            (memberPath, nestedDestination) => (value) => {
              nestedDestination = set(nestedDestination, memberPath, value);
            }
          )
        );
        continue;
      }

      // if is primitive
      setMember(() => mapInitializedValue);
      continue;
    }

    setMember(() =>
      mapMember(
        transformationMapFn,
        sourceObj,
        destination,
        destinationMemberPath,
        extraArguments,
        mapper
      )
    );
  }

  // After map
  // Do not map for when in Map Array mode
  if (!isMapArray) {
    const afterMap = mapAfterAction ?? mappingAfterAction;
    if (afterMap) {
      afterMap(sourceObj, destination);
    }
  }

  // Check unmapped properties
  assertUnmappedProperties(destination, configuredKeys, errorHandler);

  return destination;
}

/**
 *
 * @param {TSource[]} sourceArray - the array of source items to map
 * @param destination - destination meta key
 * @param source - source meta key
 * @param {MapArrayOptions} options - the map options for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - error handler
 */
export function mapArray<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  sourceArray: TSource[],
  destination: unknown,
  source: unknown,
  options: MapArrayOptions<TSource, TDestination>,
  mapper: Mapper,
  errorHandler: ErrorHandler
) {
  // initialize an empty array
  let destinationArray: TDestination[] = [];

  // destructure mapOptions
  const { beforeMap, afterMap, extraArguments } = options ?? {};

  // run beforeMap for the whole map operation
  if (beforeMap) {
    beforeMap(sourceArray, []);
  }

  // loop through each item and run map() for each
  for (let i = 0, len = sourceArray.length; i < len; i++) {
    destinationArray.push(
      mapReturn(
        sourceArray[i],
        mapper.getMapping(source, destination) as Mapping<
          TSource,
          TDestination
        >,
        { extraArguments },
        mapper,
        errorHandler,
        true
      )
    );
  }

  // run afterMap for the whole map operation
  if (afterMap) {
    afterMap(sourceArray, destinationArray);
  }

  return destinationArray;
}
