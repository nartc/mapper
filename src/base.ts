import { plainToClass } from 'class-transformer';
import set from 'lodash.set';
import { defaultMapActionOptions } from './constants';
import {
  ConditionPredicate,
  Constructible,
  ConvertUsingTransformOptions,
  CreateMapActions,
  Dict,
  MapActionOptions,
  MapFromCallback,
  Mapping,
  MappingProperty,
  MapWithTransformOptions,
  NamingConvention,
  Resolver,
  TransformationType,
  ValueSelector,
} from './types';
import {
  _assertMappingErrors,
  _get,
  _getMappingKey,
  _getSourcePropertyKey,
  _initializeReversedMappingProperties,
  _isClass,
  _isDate,
  _isEmpty,
  _isObjectLike,
  _isResolver,
  _setMappingPropertyForMapFromMember,
} from './utils';

export const _getMappingForDestination = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  destination: Constructible<TDestination>,
  mappings: { [key: string]: Mapping }
): Mapping<TSource, TDestination> => {
  const destinationName = destination.prototype.constructor.name;
  const sourceKey = Object.keys(mappings)
    .filter(key => key.includes(destinationName))
    .find(key => mappings[key].destinationKey === destinationName);

  const sourceName = mappings[sourceKey as string].sourceKey;
  const mapping = mappings[_getMappingKey(sourceName, destinationName)];

  if (!mapping) {
    throw new Error(
      `Mapping not found for source ${sourceName} and destination ${destinationName}`
    );
  }

  return mapping;
};

const _getMappingForNestedKey = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  val: Constructible<TSource>,
  mappings: { [key: string]: Mapping }
): Mapping<TSource, TDestination> => {
  const mappingName = val.constructor.name;
  const destinationEntry = Object.entries(mappings)
    .filter(([key, _]) => key.includes(mappingName))
    .find(([key, _]) => mappings[key].sourceKey === mappingName);

  if (!destinationEntry) {
    throw new Error(`Mapping not found for source ${mappingName}`);
  }

  const destination = destinationEntry[1].destination as Constructible<
    TDestination
  >;

  if (!destination) {
    throw new Error(`Mapping not found for source ${mappingName}`);
  }

  const mapping = _getMapping(val, destination, mappings);

  if (!mapping) {
    throw new Error(
      `Mapping not found for source ${mappingName} and destination ${destination.name ||
        destination.constructor.name}`
    );
  }

  return mapping;
};

const _mapMember = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  type: TransformationType,
  destinationObj: TDestination,
  destinationMemberPath: string,
  convertUsing: ConvertUsingTransformOptions,
  sourceObj: TSource,
  mapWith: MapWithTransformOptions,
  propSourceMemberPath: string,
  prop: MappingProperty,
  fromValue: any,
  nullSubstitution: any,
  condition: ConditionPredicate,
  mapFrom: MapFromCallback,
  mapping: Mapping<TSource, TDestination>,
  mappings: { [key: string]: Mapping }
) => {
  if (type === TransformationType.Ignore) {
    set(destinationObj, destinationMemberPath, null);
    return;
  }

  if (type === TransformationType.ConvertUsing) {
    const { converter, value } = convertUsing as ConvertUsingTransformOptions;
    set(
      destinationObj,
      destinationMemberPath,
      converter.convert(value(sourceObj))
    );
    return;
  }

  if (type === TransformationType.MapWith) {
    const _mapping = _getMappingForDestination(
      (mapWith as MapWithTransformOptions).destination,
      mappings
    );
    const _source = (mapWith as MapWithTransformOptions).fromValue(sourceObj);
    if (_isEmpty(_source)) {
      console.warn(
        `${propSourceMemberPath} does not exist on ${_mapping.source}`
      );
      set(destinationObj, destinationMemberPath, null);
      return;
    }

    if (!_isClass(_source as any)) {
      console.warn(
        `${prop.destinationMemberPath} is type ${
          (mapWith as MapWithTransformOptions).destination.name
        } but ${_source} is a primitive. No mapping was executed`
      );
      set(destinationObj, destinationMemberPath, null);
      return;
    }

    if (Array.isArray(_source)) {
      set(
        destinationObj,
        destinationMemberPath,
        _isEmpty(_source[0])
          ? []
          : (_mapArray(
              _source,
              _mapping as Mapping,
              defaultMapActionOptions,
              mappings
            ) as any)
      );
      return;
    }

    set(
      destinationObj,
      destinationMemberPath,
      _map(_source, _mapping, defaultMapActionOptions, false, mappings)
    );
    return;
  }

  if (type === TransformationType.FromValue) {
    set(destinationObj, destinationMemberPath, fromValue);
    return;
  }

  if (type === TransformationType.Condition) {
    const _passed = condition && condition(sourceObj);
    if (_passed) {
      set(
        destinationObj,
        destinationMemberPath,
        _get(sourceObj, propSourceMemberPath)
      );
      return;
    }

    set(destinationObj, destinationMemberPath, null);
    return;
  }

  if (type === TransformationType.NullSubstituion) {
    set(
      destinationObj,
      destinationMemberPath,
      _get(sourceObj, propSourceMemberPath, nullSubstitution)
    );
    return;
  }

  if (type === TransformationType.MapFrom) {
    if (_isResolver(mapFrom as MapFromCallback)) {
      set(
        destinationObj,
        destinationMemberPath,
        (mapFrom as Resolver).resolve(
          sourceObj,
          destinationObj,
          prop.transformation
        )
      );
      return;
    }

    const mapFromValue = (mapFrom as ValueSelector)(sourceObj);
    set(destinationObj, destinationMemberPath, mapFromValue);
    _setMappingPropertyForMapFromMember(
      destinationMemberPath,
      propSourceMemberPath,
      mapping,
      mapFrom as ValueSelector
    );
    return;
  }

  const sourceVal = (mapFrom as ValueSelector)(sourceObj);
  if (sourceVal === undefined || sourceVal === null) {
    set(destinationObj, destinationMemberPath, null);
    return;
  }

  if (_isObjectLike(sourceVal)) {
    if (_isDate(sourceVal)) {
      set(destinationObj, destinationMemberPath, new Date(sourceVal));
      return;
    }

    if (Array.isArray(sourceVal)) {
      const _first = sourceVal[0];
      if (_isEmpty(_first)) {
        set(destinationObj, destinationMemberPath, []);
        return;
      }

      if (!_isObjectLike(_first)) {
        set(destinationObj, destinationMemberPath, sourceVal.slice());
        return;
      }

      const nestedMapping = _getMappingForNestedKey(_first, mappings);
      set(
        destinationObj,
        destinationMemberPath,
        _mapArray(sourceVal, nestedMapping, defaultMapActionOptions, mappings)
      );
      return;
    }
  }

  if (
    (typeof sourceVal === 'object' || typeof sourceVal === 'function') &&
    _isClass(sourceVal)
  ) {
    const nestedMapping = _getMappingForNestedKey(sourceVal, mappings);
    set(
      destinationObj,
      destinationMemberPath,
      _map(sourceVal, nestedMapping, defaultMapActionOptions, false, mappings)
    );
    return;
  }

  set(destinationObj, destinationMemberPath, sourceVal);
  return;
};

/**
 * Private Functions
 */
const _hasMapping = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  source: Constructible<TSource>,
  destination: Constructible<TDestination>,
  mappings: { [key: string]: Mapping }
): string => {
  const key = _getMappingKey(source.name, destination.name);
  if (mappings[key]) {
    throw new Error(
      `Mapping for source ${source.name} and destination ${destination.name} is already existed`
    );
  }

  return key;
};

const _getMapping = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  source: Constructible<TSource>,
  destination: Constructible<TDestination>,
  mappings: { [key: string]: Mapping }
): Mapping<TSource, TDestination> => {
  const sourceName = source.prototype
    ? source.prototype.constructor.name
    : source.constructor.name;
  const destinationName = destination.prototype
    ? destination.prototype.constructor.name
    : destination.constructor.name;
  const mapping = mappings[_getMappingKey(sourceName, destinationName)];

  if (!mapping) {
    throw new Error(
      `Mapping not found for source ${sourceName} and destination ${destinationName}`
    );
  }

  return mapping;
};

export const _map = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  sourceObj: TSource,
  mapping: Mapping<TSource, TDestination>,
  option: MapActionOptions<TSource, TDestination> = defaultMapActionOptions,
  isArrayMap: boolean = false,
  mappings: { [key: string]: Mapping }
): TDestination => {
  sourceObj = plainToClass(mapping.source, sourceObj, {
    excludeExtraneousValues: true,
  });
  const { afterMap, beforeMap } = option;
  const {
    destination,
    properties,
    afterMapAction,
    beforeMapAction,
    sourceMemberNamingConvention,
    destinationMemberNamingConvention,
  } = mapping;
  const configKeys = [];

  let destinationObj = new destination();

  if (!isArrayMap) {
    if (beforeMap) {
      beforeMap(sourceObj, new destination(), { ...mapping });
    } else if (beforeMapAction) {
      beforeMapAction(sourceObj, new destination(), { ...mapping });
    }
  }

  for (const prop of Array.from(properties.values())) {
    configKeys.push(prop.destinationMemberPath);
    const {
      transformation: {
        transformationType: { preCondition, type },
        mapFrom,
        fromValue,
        convertUsing,
        mapWith,
        condition,
        nullSubstitution,
      },
      destinationMemberPath,
    } = prop;
    const propSourceMemberPath = _getSourcePropertyKey(
      destinationMemberNamingConvention,
      sourceMemberNamingConvention,
      destinationMemberPath
    );

    if (preCondition && !preCondition(sourceObj)) {
      set(destinationObj, destinationMemberPath, null);
      continue;
    }

    if (preCondition && preCondition(sourceObj)) {
      _mapMember(
        type,
        destinationObj,
        destinationMemberPath,
        convertUsing as ConvertUsingTransformOptions,
        sourceObj,
        mapWith as MapWithTransformOptions,
        propSourceMemberPath,
        prop,
        fromValue,
        nullSubstitution,
        condition as ConditionPredicate,
        mapFrom as MapFromCallback,
        mapping,
        mappings
      );
      continue;
    }

    _mapMember(
      type,
      destinationObj,
      destinationMemberPath,
      convertUsing as ConvertUsingTransformOptions,
      sourceObj,
      mapWith as MapWithTransformOptions,
      propSourceMemberPath,
      prop,
      fromValue,
      nullSubstitution,
      condition as ConditionPredicate,
      mapFrom as MapFromCallback,
      mapping,
      mappings
    );
  }

  destinationObj = plainToClass(destination, destinationObj, {
    excludeExtraneousValues: true,
  });
  _assertMappingErrors(destinationObj, configKeys);

  if (!isArrayMap) {
    if (afterMap) {
      afterMap(sourceObj, destinationObj, { ...mapping });
    } else if (afterMapAction) {
      afterMapAction(sourceObj, destinationObj, { ...mapping });
    }
  }

  return destinationObj;
};

export const _mapArray = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  sourceArray: TSource[],
  mapping: Mapping<TSource, TDestination>,
  option: MapActionOptions<TSource[], TDestination[]> = defaultMapActionOptions,
  mappings: { [key: string]: Mapping }
): TDestination[] => {
  let destination: TDestination[] = [];
  const { beforeMap, afterMap } = option;

  if (beforeMap) {
    beforeMap(sourceArray, destination, { ...mapping } as any);
  }

  destination = sourceArray.map(s => _map(s, mapping, {}, true, mappings));

  if (afterMap) {
    afterMap(sourceArray, destination, { ...mapping } as any);
  }

  return destination;
};

export const _createMappingObject = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  source: Constructible<TSource>,
  destination: Constructible<TDestination>,
  options: CreateMapActions,
  mappings: { [key: string]: Mapping }
): Mapping<TSource, TDestination> => {
  const _key = _hasMapping(source, destination, mappings);
  const _mapping: Mapping<TSource, TDestination> = Object.seal({
    source,
    sourceKey: source.prototype.constructor.name,
    destination,
    destinationKey: destination.prototype.constructor.name,
    properties: new Map(),
    sourceMemberNamingConvention: options.sourceMemberNamingConvention as NamingConvention,
    destinationMemberNamingConvention: options.destinationMemberNamingConvention as NamingConvention,
    beforeMapAction: undefined,
    afterMapAction: undefined,
  });

  mappings[_key] = _mapping;
  return _mapping;
};

export const _createReversedMappingObject = <
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  mapping: Mapping<TSource, TDestination>,
  mappings: { [key: string]: Mapping }
): Mapping<TDestination, TSource> => {
  const _reversedKey = _hasMapping(
    mapping.destination,
    mapping.source,
    mappings
  );
  const _reversedMapping: Mapping<TDestination, TSource> = Object.seal({
    source: mapping.destination,
    sourceKey: mapping.destination.prototype
      ? mapping.destination.prototype.constructor.name
      : mapping.destination.constructor.name,
    destination: mapping.source,
    destinationKey: mapping.source.prototype
      ? mapping.source.prototype.constructor.name
      : mapping.source.constructor.name,
    sourceMemberNamingConvention: mapping.destinationMemberNamingConvention,
    destinationMemberNamingConvention: mapping.sourceMemberNamingConvention,
    properties: _initializeReversedMappingProperties(mapping),
    beforeMapAction: undefined,
    afterMapAction: undefined,
  });
  mappings[_reversedKey] = _reversedMapping;
  return _reversedMapping;
};
