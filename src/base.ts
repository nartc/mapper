import set from 'lodash.set';
import { defaultMapActionOptions } from './constants';
import { instantiate, metadataManager } from './metadata-explorer';
import {
  BaseOf,
  Constructible,
  ConvertUsingTransformOptions,
  CreateMapOptions,
  Dict,
  MapActionOptions,
  MapFromCallback,
  Mapping,
  MappingTransformation,
  MapWithTransformOptions,
  NamingConvention,
  Resolver,
  TransformationType,
  ValueSelector,
} from './types';
import {
  _assertMappingErrors,
  _get,
  _getSourcePropertyKey,
  _inheritBaseMapping,
  _initializeReversedMappingProperties,
  _isClass,
  _isDate,
  _isEmpty,
  _isObjectLike,
  _isResolver,
  _setMappingPropertyForMapFromMember,
} from './utils';

/**
 * Internal base class for AutoMapper
 *
 * @private
 */
export abstract class AutoMapperBase {
  private _mappingsMap!: WeakMap<
    Constructible,
    WeakMap<Constructible, Mapping>
  >;

  protected constructor() {
    this._mappingsMap = new WeakMap<
      Constructible,
      WeakMap<Constructible, Mapping>
    >();
  }

  protected _mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArray: TSource[],
    mapping: Mapping<TSource, TDestination>,
    option: MapActionOptions<
      TSource[],
      TDestination[]
    > = defaultMapActionOptions
  ): Promise<TDestination[]> {
    return Promise.resolve().then(() =>
      this._mapArray(sourceArray, mapping, option)
    );
  }

  protected _mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArray: TSource[],
    mapping: Mapping<TSource, TDestination>,
    option: MapActionOptions<
      TSource[],
      TDestination[]
    > = defaultMapActionOptions
  ): TDestination[] {
    let destination: TDestination[] = [];
    const { beforeMap, afterMap } = option;

    if (beforeMap) {
      beforeMap(sourceArray, destination, { ...mapping } as any);
    }

    destination = sourceArray.map(s => this._map(s, mapping, {}, true));

    if (afterMap) {
      afterMap(sourceArray, destination, { ...mapping } as any);
    }

    return destination;
  }

  protected _mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    mapping: Mapping<TSource, TDestination>,
    option: MapActionOptions<TSource, TDestination> = defaultMapActionOptions,
    isArrayMap: boolean = false
  ): Promise<TDestination> {
    return Promise.resolve().then(() =>
      this._map(sourceObj, mapping, option, isArrayMap)
    );
  }

  protected _map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    mapping: Mapping<TSource, TDestination>,
    option: MapActionOptions<TSource, TDestination> = defaultMapActionOptions,
    isArrayMap: boolean = false
  ): TDestination {
    !(sourceObj instanceof mapping.source) &&
      (sourceObj = instantiate(mapping.source, sourceObj));
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

    let destinationObj = instantiate(destination);

    if (!isArrayMap) {
      if (beforeMap) {
        beforeMap(sourceObj, destinationObj, { ...mapping });
      } else if (beforeMapAction) {
        beforeMapAction(sourceObj, destinationObj, { ...mapping });
      }
    }

    const props = Array.from(properties.values());
    for (let i = 0, len = props.length; i < len; i++) {
      const { transformation, destinationMemberPath } = props[i];
      configKeys.push(destinationMemberPath);
      const propSourceMemberPath = _getSourcePropertyKey(
        destinationMemberNamingConvention,
        sourceMemberNamingConvention,
        destinationMemberPath
      );

      if (
        transformation.transformationType.preCondition &&
        !transformation.transformationType.preCondition.predicate(sourceObj)
      ) {
        set(
          destinationObj,
          destinationMemberPath,
          transformation.transformationType.preCondition.defaultValue || null
        );
        continue;
      }

      this._mapMember(
        destinationObj,
        destinationMemberPath,
        sourceObj,
        propSourceMemberPath,
        mapping,
        transformation
      );
    }

    _assertMappingErrors(destinationObj, configKeys);

    if (!isArrayMap) {
      if (afterMap) {
        afterMap(sourceObj, destinationObj, { ...mapping });
      } else if (afterMapAction) {
        afterMapAction(sourceObj, destinationObj, { ...mapping });
      }
    }

    return destinationObj;
  }

  private _mapMember<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    destinationObj: TDestination,
    destinationMemberPath: string,
    sourceObj: TSource,
    propSourceMemberPath: string,
    mapping: Mapping<TSource, TDestination>,
    transformation: MappingTransformation<TSource, TDestination>
  ) {
    const {
      transformationType: { type },
      mapFrom,
      fromValue,
      convertUsing,
      mapWith,
      condition,
      nullSubstitution,
    } = transformation;

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
      const _source = mapWith?.fromValue(sourceObj);

      if (_isEmpty(_source)) {
        console.warn(`${propSourceMemberPath} does not exist`);
        set(destinationObj, destinationMemberPath, null);
        return;
      }

      if (!_isClass(_source)) {
        console.warn(
          `${destinationMemberPath} is type ${mapWith?.destination.name} but ${_source} is a primitive. No mapping was executed`
        );
        set(destinationObj, destinationMemberPath, null);
        return;
      }

      const _mapping = this._getMappingForDestination(
        (mapWith as MapWithTransformOptions).destination,
        _source.constructor as Constructible<TSource>
      );

      if (Array.isArray(_source)) {
        set(
          destinationObj,
          destinationMemberPath,
          _isEmpty(_source[0])
            ? []
            : this._mapArray(_source, _mapping as Mapping)
        );
        return;
      }

      set(destinationObj, destinationMemberPath, this._map(_source, _mapping));
      return;
    }

    if (type === TransformationType.FromValue) {
      set(destinationObj, destinationMemberPath, fromValue);
      return;
    }

    if (type === TransformationType.Condition) {
      if (condition && condition.predicate(sourceObj)) {
        set(
          destinationObj,
          destinationMemberPath,
          _get(sourceObj, null, propSourceMemberPath)
        );
        return;
      }

      set(
        destinationObj,
        destinationMemberPath,
        condition?.defaultValue || null
      );
      return;
    }

    if (type === TransformationType.NullSubstituion) {
      set(
        destinationObj,
        destinationMemberPath,
        _get(sourceObj, nullSubstitution, propSourceMemberPath)
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
            transformation
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

        const nestedMapping = this._getMappingForNestedKey(
          mapping.destination,
          destinationMemberPath as keyof TDestination,
          _first.constructor
        );
        set(
          destinationObj,
          destinationMemberPath,
          this._mapArray(sourceVal, nestedMapping)
        );
        return;
      }
    }

    if (
      (typeof sourceVal === 'object' || typeof sourceVal === 'function') &&
      _isClass(sourceVal)
    ) {
      const nestedMapping = this._getMappingForDestination(
        _get(destinationObj, null, destinationMemberPath).constructor,
        sourceVal.constructor
      );
      set(
        destinationObj,
        destinationMemberPath,
        this._map(sourceVal, nestedMapping)
      );
      return;
    }

    set(destinationObj, destinationMemberPath, sourceVal);
    return;
  }

  protected _createMappingObject<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any,
    TBaseSource extends BaseOf<TSource, TBaseSource> = any,
    TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>,
    options: CreateMapOptions
  ): Mapping<TSource, TDestination, TBaseSource, TBaseDestination> {
    if (this._hasMappingMap(source, destination)) {
      throw new Error(
        `Mapping for source ${source.toString()} and destination ${destination.toString()} is already existed`
      );
    }

    const _mapping: Mapping<
      TSource,
      TDestination,
      TBaseSource,
      TBaseDestination
    > = Object.seal({
      source,
      sourceKey: source.prototype.constructor.name,
      destination,
      destinationKey: destination.prototype.constructor.name,
      properties: new Map(),
      sourceMemberNamingConvention: options.sourceMemberNamingConvention as NamingConvention,
      destinationMemberNamingConvention: options.destinationMemberNamingConvention as NamingConvention,
      beforeMapAction: undefined,
      afterMapAction: undefined,
      baseSource: undefined,
      baseDestination: undefined,
    });

    this._mappingsMap.set(
      source,
      new WeakMap<Constructible, Mapping>().set(destination, _mapping)
    );
    return _mapping;
  }

  protected _createReversedMappingObject<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any,
    TBaseSource extends BaseOf<TSource, TBaseSource> = any,
    TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
  >(
    mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>
  ): Mapping<TDestination, TSource, TBaseDestination, TBaseSource> {
    if (this._hasMappingMap(mapping.destination, mapping.source)) {
      throw new Error(
        `Mapping for source ${mapping.destination.toString()} and destination ${mapping.source.toString()} is already existed`
      );
    }

    const _reversedMapping: Mapping<
      TDestination,
      TSource,
      TBaseDestination,
      TBaseSource
    > = Object.seal({
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
      baseSource: mapping.baseDestination,
      baseDestination: mapping.baseSource,
    });

    if (
      _reversedMapping.baseSource != null &&
      _reversedMapping.baseDestination != null
    ) {
      const reversedBaseMapping = this._getMappingForDestination(
        _reversedMapping.baseDestination,
        _reversedMapping.baseSource,
        true
      );
      if (reversedBaseMapping != null) {
        _inheritBaseMapping(_reversedMapping, reversedBaseMapping);
      }
    }

    this._mappingsMap.set(
      mapping.destination,
      new WeakMap<Constructible, Mapping>().set(
        mapping.source,
        _reversedMapping
      )
    );
    return _reversedMapping;
  }

  protected _dispose() {
    this._mappingsMap = new WeakMap<
      Constructible,
      WeakMap<Constructible, Mapping>
    >();
  }

  protected _getMappingForDestination<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    destination: Constructible<TDestination>,
    sourceObj: Constructible<TSource>,
    isInherit: boolean = false
  ): Mapping<TSource, TDestination> {
    const mapping = this._mappingsMap.get(sourceObj)?.get(destination);

    if (!mapping && !isInherit) {
      throw new Error(
        `Mapping not found for source ${sourceObj.constructor.name} and destination ${destination.constructor.name}`
      );
    }

    return mapping as Mapping;
  }

  /**
   * Private Functions
   */
  private _hasMappingMap<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>
  ): boolean {
    return (
      (this._mappingsMap.has(source) &&
        this._mappingsMap.get(source)?.has(destination)) ||
      false
    );
  }

  private _getMappingForNestedKey<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any,
    TDestinationKey extends keyof TDestination = any
  >(
    destinationConstructor: Constructible<TDestination>,
    destinationMemberKey: TDestinationKey,
    sourceConstructor: Constructible<TSource>
  ): Mapping<TSource, TDestination> {
    const keyMetadata = metadataManager.getMetadataForKey(
      destinationConstructor,
      destinationMemberKey
    );

    if (keyMetadata == null) {
      throw new Error(
        `Metadata for ${destinationMemberKey} cannot be found. Consider manual map this property`
      );
    }

    const meta = keyMetadata[1]();
    if (!meta || Array.isArray(meta)) {
      throw new Error(
        `Metadata for ${destinationMemberKey} is a primitive or Array. Consider manual map this property`
      );
    }

    return this._getMappingForDestination(meta, sourceConstructor);
  }
}
