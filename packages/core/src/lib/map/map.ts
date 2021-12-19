import type {
  Dictionary,
  ErrorHandler,
  MapArrayOptions,
  MapInitializeReturn,
  MapOptions,
  Mapper,
  Mapping,
} from '../types';
import { MapFnClassId, TransformationType } from '../types';
import { get, isEmpty, mappingNullCheck, set, setMutate } from '../utils';
import { mapMember } from './map-member';
import { assertUnmappedProperties } from './assert-unmapped-properties';

function setMemberMutateFn(destinationObj: Record<string, unknown>) {
  return (destinationMember: string[]) => (value) => {
    if (value !== undefined) {
      setMutate(destinationObj, destinationMember, value);
    }
  };
}

function getMemberMutateFn(destinationObj: Record<string, unknown>) {
  return (memberPath: string[] | undefined) =>
    get(destinationObj, memberPath) as Record<string, unknown>;
}

function setMemberReturnFn<TDestination extends Dictionary<TDestination> = any>(
  destinationMemberPath: string[],
  destination: TDestination
) {
  return (value: unknown) => {
    destination = set(destination, destinationMemberPath, value);
  };
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
  return map({
    sourceObj,
    mapping,
    options,
    mapper,
    errorHandler,
    setMemberFn: setMemberReturnFn,
    isMapArray,
  });
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
  map({
    sourceObj,
    mapping,
    options,
    mapper,
    errorHandler,
    setMemberFn: setMemberMutateFn(destinationObj),
    getMemberFn: getMemberMutateFn(destinationObj),
  });
}

interface MapParameter<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> {
  sourceObj: TSource;
  mapping: Mapping<TSource, TDestination>;
  options: MapOptions<TSource, TDestination>;
  mapper: Mapper;
  errorHandler: ErrorHandler;
  setMemberFn: (
    destinationMemberPath: string[],
    destination?: TDestination
  ) => (value: unknown) => void;
  getMemberFn?: (
    destinationMemberPath: string[] | undefined
  ) => Record<string, unknown>;
  isMapArray?: boolean;
}

/**
 *
 * @param {TSource} sourceObj - the source object
 * @param {Mapping} mapping - the Mapping object of source <> destination
 * @param {MapOptions} options - options used for this particular map operation
 * @param {Mapper} mapper - the mapper instance
 * @param {ErrorHandler} errorHandler - the error handler
 * @param {Function} setMemberFn
 * @param {Function} getMemberFn
 * @param {boolean} [isMapArray = false] - whether the map operation is in Array mode
 */
function map<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>({
  sourceObj,
  mapping,
  options,
  mapper,
  errorHandler,
  setMemberFn,
  getMemberFn,
  isMapArray = false,
}: MapParameter<TSource, TDestination>) {
  // destructure the mapping
  const [
    [, destination],
    [sourceKey, destinationKey],
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
  for (let i = 0, propsLen = propsToMap.length; i < propsLen; i++) {
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
Error at "${destinationMemberPath}" on ${
          typeof destination === 'string'
            ? destination
            : destination['prototype']?.constructor?.name
        } (${JSON.stringify(destination)})
---------------------------------------------------------------------
Original error: ${originalError}`;
        errorHandler.handle(errorMessage);
        throw new Error(errorMessage);
      }
    };

    // This destination key is being configured. Push to configuredKeys array
    configuredKeys.push(destinationMemberPath[0]);

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
      const mapInitializedValue = (
        transformationMapFn[
          MapFnClassId.fn
        ] as MapInitializeReturn[MapFnClassId.fn]
      )(sourceObj);

      // if null/undefined
      // if isDate, isFile
      // if metadata is null, treat as-is
      if (
        mapInitializedValue == null ||
        mapInitializedValue instanceof Date ||
        Object.prototype.toString.call(mapInitializedValue).slice(8, -1) ===
          'File' ||
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

        mappingNullCheck(
          nestedMapping,
          errorHandler,
          nestedSourceMemberKey,
          nestedDestinationMemberKey
        );

        // nested mutate
        const destinationMemberValue = getMemberFn?.(destinationMemberPath);
        if (destinationMemberValue !== undefined) {
          map({
            sourceObj: mapInitializedValue,
            mapping: nestedMapping!,
            options: { extraArguments },
            mapper,
            errorHandler,
            setMemberFn: setMemberMutateFn(destinationMemberValue),
            getMemberFn: getMemberMutateFn(destinationMemberValue),
          });
          continue;
        }

        // for nested model, we do not care about mutate or return. we will always need to return
        setMember(() =>
          map({
            sourceObj: mapInitializedValue,
            mapping: nestedMapping!,
            options: { extraArguments },
            mapper,
            errorHandler,
            setMemberFn: setMemberReturnFn,
          })
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
  // Do not run for when in Map Array mode
  if (!isMapArray) {
    const afterMap = mapAfterAction ?? mappingAfterAction;
    if (afterMap) {
      afterMap(sourceObj, destination);
    }
  }

  // Check unmapped properties
  assertUnmappedProperties(
    destination,
    configuredKeys,
    sourceKey,
    destinationKey,
    errorHandler
  );

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
  const destinationArray: TDestination[] = [];

  // destructure mapOptions
  const { beforeMap, afterMap, extraArguments } = options ?? {};

  // run beforeMap for the whole map operation
  if (beforeMap) {
    beforeMap(sourceArray, []);
  }

  // loop through each item and run map() for each
  for (let i = 0, len = sourceArray.length; i < len; i++) {
    const mapping = mapper.getMapping(source, destination) as Mapping<
      TSource,
      TDestination
    >;

    mappingNullCheck(mapping, errorHandler, source, destination);

    destinationArray.push(
      mapReturn(
        sourceArray[i],
        mapping,
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
