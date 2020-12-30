import type {
  CreateMapFluentFunction,
  CreateMapOptions,
  CreateMapperOptions,
  Dictionary,
  MapAction,
  Mapper,
  Mapping,
  MappingProfile,
  MappingProperty,
  MemberMapFunction,
  PreConditionFunction,
  Selector,
  SelectorReturn,
} from '@automapper/types';
import {
  MapFnClassId,
  MappingClassId,
  MappingPropertiesClassId,
  TransformationType,
} from '@automapper/types';
import { map, mapArray } from './map';
import { getMemberPath } from './utils';

/**
 * Method to create a Mapper with a plugin
 *
 * @param {CreateMapperOptions} createMapperOptions - options for createMapper
 */
export function createMapper<TKey = unknown>({
  name,
  pluginInitializer,
  namingConventions,
  errorHandle: customErrorHandler,
}: CreateMapperOptions<TKey>): Mapper<TKey> {
  // default errorHandler to console.error
  const errorHandler = customErrorHandler || { handle: console.error };

  // get the plugin
  const plugin = pluginInitializer(errorHandler);

  return {
    name,
    createMap(source, destination, options: CreateMapOptions = {}) {
      // if namingConventions isn't passed in for this Mapping pair, use the global ones
      if (options && !options.namingConventions) {
        options.namingConventions = namingConventions;
      }

      // create the initial mapping between source and destination
      const mapping = plugin.initializeMapping(source, destination, options);

      // return the FluentFunction for chaining
      return createMapFluentFunction(mapping);
    },
    getMapping: plugin.getMapping.bind(plugin),
    addProfile(profile: MappingProfile) {
      profile(this);
      return this;
    },
    map(sourceObj, destination, source, options?) {
      const { preMap } = plugin;

      // run preMap if available
      const [sourceInstance] = preMap?.(source, destination, sourceObj) ?? [];

      // get mapping between Source and Destination
      const mapping = this.getMapping(source, destination);

      // map
      return map(
        sourceInstance ?? sourceObj,
        mapping,
        options,
        this,
        errorHandler
      );
    },
    mapAsync(sourceObj, destination, source, options?) {
      return Promise.resolve(this.map(sourceObj, destination, source, options));
    },
    mapArray(sourceArr, destination, source, options) {
      return mapArray(
        sourceArr,
        destination,
        source,
        options,
        this,
        errorHandler
      );
    },
    mapArrayAsync(sourceArr, destination, source, options) {
      return Promise.resolve(
        this.mapArray(sourceArr, destination, source, options)
      );
    },
    dispose() {
      plugin.dispose?.();
    },
  };
}

/**
 * Method to create FluentFunction for chaining forMember etc...
 *
 * @param {Mapping} mapping - Mapping object of source <> destination
 */
function createMapFluentFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
>(
  mapping: Mapping<TSource, TDestination>
): CreateMapFluentFunction<TSource, TDestination> {
  // initialize fluentFunction
  const fluentFunction: CreateMapFluentFunction<TSource, TDestination> = {
    forMember<TMemberType = SelectorReturn<TDestination>>(
      selector: Selector<TDestination, TMemberType>,
      ...functions: [
        (
          | ReturnType<PreConditionFunction<TSource, TDestination, TMemberType>>
          | ReturnType<MemberMapFunction<TSource, TDestination, TMemberType>>
        ),
        ReturnType<MemberMapFunction<TSource, TDestination, TMemberType>>?
      ]
    ): CreateMapFluentFunction<TSource, TDestination> {
      return createMapForMember<TSource, TDestination>(
        mapping,
        selector,
        functions,
        fluentFunction
      );
    },
    beforeMap(mapAction: MapAction<TSource, TDestination>) {
      // assign mapAction to mapping
      mapping[MappingClassId.actions][0] = mapAction;
      return fluentFunction;
    },
    afterMap(mapAction: MapAction<TSource, TDestination>) {
      // assign mapAction to mapping
      mapping[MappingClassId.actions][1] = mapAction;
      return fluentFunction;
    },
  };

  return fluentFunction;
}

/**
 *
 * @param {Mapping} mapping - Mapping between source <> destination
 * @param {Selector} selector - the member selector on `forMember(selector)`
 * @param preCond
 * @param mapMemberFn
 * @param fluentFunction
 */
function createMapForMember<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TMemberType = SelectorReturn<TDestination>
>(
  mapping: Mapping<TSource, TDestination>,
  selector: Selector<TDestination, TMemberType>,
  [preCond, mapMemberFn]: [
    preCond:
      | ReturnType<PreConditionFunction<TSource, TDestination>>
      | ReturnType<MemberMapFunction<TSource, TDestination>>,
    mapMemberFn?: ReturnType<MemberMapFunction<TSource, TDestination>>
  ],
  fluentFunction: CreateMapFluentFunction<TSource, TDestination>
): CreateMapFluentFunction<TSource, TDestination> {
  // get the memberPath from the selector
  // eg: `s => s.foo.bar` returns `foo.bar`
  const memberPath = getMemberPath(selector);

  // reassign mapMemberFn and preCond
  if (mapMemberFn == null) {
    mapMemberFn = preCond as ReturnType<MemberMapFunction>;
    preCond = undefined;
  }

  // initialize sourcePath
  let sourcePath = '';

  // if the transformation is MapFrom or MapWith, we have information on the source value selector
  if (
    mapMemberFn[MapFnClassId.type] === TransformationType.MapFrom ||
    mapMemberFn[MapFnClassId.type] === TransformationType.MapWith
  ) {
    sourcePath = getMemberPath(mapMemberFn[MapFnClassId.misc]);
  }

  // initialize paths tuple
  const paths: [member: string, source?: string] = !sourcePath
    ? [memberPath]
    : [memberPath, sourcePath];

  // initialize MappingProperty
  const mappingProperty: MappingProperty = [
    paths,
    [mapMemberFn, preCond as ReturnType<PreConditionFunction>],
  ];

  // check existProp on mapping
  const existProp = mapping[MappingClassId.properties].find(
    ([propName]) => propName === memberPath
  );

  // if exists, overrides
  if (existProp != null) {
    existProp[MappingPropertiesClassId.property] = mappingProperty;
    return fluentFunction;
  }

  // push MappingProperty to mapping
  mapping[MappingClassId.properties].push([memberPath, mappingProperty]);
  return fluentFunction;
}
