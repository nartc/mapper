/* eslint-disable prefer-const */
import type {
  ConditionFunction,
  ConvertUsingFunction,
  Dictionary,
  ErrorHandler,
  FromValueFunction,
  MapDeferFunction,
  MapFromFunction,
  MapInitializeFunction,
  MapOptions,
  Mapper,
  Mapping,
  MapWithFunction,
  MemberMapFunction,
} from '@automapper/types';
import { MapFnClassId, TransformationType } from '@automapper/types';
import { isEmpty } from '../utils';
import { set, setMutate } from './set.util';

/**
 * Instruction on how to map a particular member on the destination
 *
 * @param {ReturnType<MemberMapFunction>} transformationMapFn - Transformation information of the property
 * @param {TSource} sourceObj - The sourceObject being used to map to destination
 * @param destination - destination meta key
 * @param {string} destinationMemberPath - the property path on the destination
 * @param {Mapper} mapper - the mapper instance
 */
function mapMember<TSource extends Dictionary<TSource> = unknown>(
  transformationMapFn: ReturnType<MemberMapFunction>,
  sourceObj: TSource,
  destination: unknown,
  destinationMemberPath: string,
  mapper: Mapper
) {
  let value: unknown;
  const transformationType: TransformationType =
    transformationMapFn[MapFnClassId.type];
  const mapFn = transformationMapFn[MapFnClassId.fn];

  switch (transformationType) {
    case TransformationType.MapFrom:
      value = (mapFn as ReturnType<MapFromFunction>[MapFnClassId.fn])(
        sourceObj,
        destination
      );
      break;
    case TransformationType.FromValue:
      value = (mapFn as ReturnType<FromValueFunction>[MapFnClassId.fn])();
      break;
    case TransformationType.MapWith:
      value = (mapFn as ReturnType<MapWithFunction>[MapFnClassId.fn])(
        sourceObj,
        mapper
      );
      break;
    case TransformationType.ConvertUsing:
      value = (mapFn as ReturnType<ConvertUsingFunction>[MapFnClassId.fn])(
        sourceObj
      );
      break;
    case TransformationType.Condition:
    case TransformationType.NullSubstitution:
      value = (mapFn as ReturnType<ConditionFunction>[MapFnClassId.fn])(
        sourceObj,
        destinationMemberPath
      );
      break;
    case TransformationType.MapDefer:
      value = mapMember(
        (mapFn as ReturnType<MapDeferFunction>[MapFnClassId.fn])(
          sourceObj
        ) as ReturnType<MemberMapFunction>,
        sourceObj,
        destination,
        destinationMemberPath,
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
  TDestination extends Dictionary<TDestination> = unknown
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
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
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
    destination: TDestination
  ) => (value: unknown) => {
    destination = set(destination, destinationMemberPath, value);
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
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
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
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
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
  const { beforeMap: mapBeforeAction, afterMap: mapAfterAction } =
    options ?? {};

  // Before Map
  // Do not run before map when in Map Array mode
  if (!isMapArray) {
    const beforeMap = mapBeforeAction ?? mappingBeforeAction;
    beforeMap?.(sourceObj, destination);
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
          [
            transformationPreCondPredicate,
            preCondDefaultValue = undefined,
          ] = [],
        ],
      ],
      [nestedDestinationMemberKey, nestedSourceMemberKey] = [],
    ] = propsToMap[i];

    // Setup a shortcut function to set destinationMemberPath on destination with value as argument
    const setMember = setMemberFn(destinationMemberPath, destination);

    // This destination key is being configured. Push to configuredKeys array
    configuredKeys.push(destinationMemberPath);

    // Pre Condition check
    if (
      transformationPreCondPredicate &&
      !transformationPreCondPredicate(sourceObj)
    ) {
      setMember(preCondDefaultValue);
      continue;
    }

    // Start with all the mapInitialize
    if (
      transformationMapFn[MapFnClassId.type] ===
      TransformationType.MapInitialize
    ) {
      const mapInitializedValue = (transformationMapFn[
        MapFnClassId.fn
      ] as ReturnType<MapInitializeFunction>[MapFnClassId.fn])(sourceObj);

      // if null/undefined
      if (mapInitializedValue == null) {
        setMember(mapInitializedValue);
        continue;
      }

      // if isDate
      if (mapInitializedValue instanceof Date) {
        setMember(new Date(mapInitializedValue));
        continue;
      }

      // if isArray
      if (Array.isArray(mapInitializedValue)) {
        const [first] = mapInitializedValue;
        // if first item is a primitive
        if (typeof first !== 'object') {
          setMember(mapInitializedValue.slice());
          continue;
        }

        // if first is empty
        if (isEmpty(first)) {
          setMember([]);
          continue;
        }

        setMember(
          mapArray(
            mapInitializedValue,
            nestedDestinationMemberKey,
            nestedSourceMemberKey,
            undefined,
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
        setMember(
          map(
            mapInitializedValue,
            nestedMapping,
            undefined,
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
      setMember(mapInitializedValue);
      continue;
    }

    setMember(
      mapMember(
        transformationMapFn,
        sourceObj,
        destination,
        destinationMemberPath,
        mapper
      )
    );
  }

  // After map
  // Do not map for when in Map Array mode
  if (!isMapArray) {
    const afterMap = mapAfterAction ?? mappingAfterAction;
    afterMap?.(sourceObj, destination);
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
 * @param {MapOptions} options - the map options for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - error handler
 */
export function mapArray<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
>(
  sourceArray: TSource[],
  destination: unknown,
  source: unknown,
  options: MapOptions<TSource[], TDestination[]>,
  mapper: Mapper,
  errorHandler: ErrorHandler
) {
  // intialize an empty array
  let destinationArray: TDestination[] = [];

  // destructure mapOptions
  const { beforeMap, afterMap } = options ?? {};

  // run beforeMap for the whole map operation
  beforeMap?.(sourceArray, []);

  // loop through each item and run map() for each
  for (let i = 0, len = sourceArray.length; i < len; i++) {
    const mapping = mapper.getMapping(source, destination);
    destinationArray.push(
      mapReturn(
        sourceArray[i],
        mapping as Mapping<TSource, TDestination>,
        undefined,
        mapper,
        errorHandler,
        true
      )
    );
  }

  // run afterMap for the whole map operation
  afterMap?.(sourceArray, destinationArray);

  return destinationArray;
}
