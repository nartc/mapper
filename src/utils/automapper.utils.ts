import { instantiate } from '../metadata-explorer';
import {
  BaseOf,
  ConditionTransformation,
  Constructible,
  ConvertUsingTransformOptions,
  CreateMapFluentFunctions,
  CreateReversedMapFluentFunctions,
  DestinationMemberExpressionOptions,
  Dict,
  ForMemberExpression,
  MapActionOptions,
  MapFromCallback,
  Mapping,
  MappingProperty,
  MapWithTransformOptions,
  Selector,
  TransformationType,
  ValueSelector,
} from '../types';
import {
  _get,
  _getMemberPath,
  _getPathRecursive,
  _getSourcePropertyKey,
  _getTransformationType,
  _isClass,
} from './common.utils';

/**
 * Internal method
 * @private
 */
export function _initializeMappingProperties<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(mapping: Mapping<TSource, TDestination>): void {
  const destination = instantiate(mapping.destination);
  let source = instantiate(mapping.source);

  const sourceProtoConstructor =
    Object.getPrototypeOf(source.constructor) ||
    (source.constructor as any).__proto__;

  if (sourceProtoConstructor?.name) {
    source = Object.assign(source, instantiate(sourceProtoConstructor));
  }

  const sourceProto =
    Object.getPrototypeOf(source) ||
    source.constructor.prototype ||
    (source as any).__proto__;
  const destinationPaths = _getPathRecursive(destination);

  for (let i = 0; i < destinationPaths.length; i++) {
    const path = destinationPaths[i];
    const sourcePath = _getSourcePropertyKey(
      mapping.destinationMemberNamingConvention,
      mapping.sourceMemberNamingConvention,
      path
    );

    const dottedSourcePaths = sourcePath.split('.');
    if (dottedSourcePaths.length > 1) {
      const [first] = dottedSourcePaths;
      if (
        !source.hasOwnProperty(first) ||
        ((source as any)[first] && _isClass((source as any)[first]))
      ) {
        continue;
      }
    }

    if (
      !source.hasOwnProperty(sourcePath) &&
      !sourceProto.hasOwnProperty(sourcePath)
    ) {
      const [first, ...paths] = sourcePath
        .split(mapping.sourceMemberNamingConvention.splittingExpression)
        .filter(Boolean)
        .filter(p => p !== '.');
      if (!paths.length || !source.hasOwnProperty(first)) {
        continue;
      }

      const sourceMemberPath = [
        [first]
          .concat(
            paths.map(p =>
              mapping.sourceMemberNamingConvention.transformPropertyName([p])
            )
          )
          .join('.'),
      ];

      if (paths.length > 1) {
        sourceMemberPath.push(
          [first]
            .concat(
              mapping.sourceMemberNamingConvention.transformPropertyName(paths)
            )
            .join('.')
        );
      }

      mapping.properties.set(
        path,
        Object.seal({
          transformation: {
            transformationType: {
              preCondition: null,
              type: TransformationType.MapInitialize,
            },
            mapFrom: s => _get(s, null, ...sourceMemberPath),
          },
          destinationMemberPath: path,
          destinationMemberSelector: d => (d as any)[path],
        })
      );
      continue;
    }

    mapping.properties.set(
      path,
      Object.seal({
        transformation: {
          transformationType: {
            preCondition: null,
            type: TransformationType.MapInitialize,
          },
          mapFrom: s => _get(s, null, sourcePath),
        },
        destinationMemberSelector: d => (d as any)[path],
        destinationMemberPath: path,
        sourceMemberPath: sourcePath,
      })
    );
  }
}

export function _inheritBaseMapping<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  baseMapping: Mapping<TBaseSource, TBaseDestination>
): void {
  const props = mapping.properties;
  for (
    let i = 0,
      baseMappingSize = baseMapping.properties.size,
      baseProperties = Array.from(baseMapping.properties.values());
    i < baseMappingSize;
    i++
  ) {
    const prop = baseProperties[i];

    if (props.has(prop.destinationMemberPath)) {
      continue;
    }

    props.set(prop.destinationMemberPath, Object.seal({ ...prop } as any));
  }
}

/**
 * Internal method
 * @private
 */
export function _initializeReversedMappingProperties<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>
): Map<string, MappingProperty<TDestination, TSource>> {
  const model = instantiate(mapping.source);
  const proto =
    Object.getPrototypeOf(model) ||
    model.constructor.prototype ||
    (model as any).__proto__;
  const reversedProperties = new Map<
    string,
    MappingProperty<TDestination, TSource>
  >();

  for (const prop of Array.from(mapping.properties.values())) {
    if (
      !prop.sourceMemberPath &&
      !prop.transformation.mapFrom &&
      !prop.transformation.mapWith
    ) {
      continue;
    }

    const _path = prop.sourceMemberPath
      ? prop.sourceMemberPath
      : prop.transformation.mapFrom
      ? _getMemberPath(prop.transformation.mapFrom as ValueSelector)
      : _getMemberPath(
          (prop.transformation.mapWith as MapWithTransformOptions).fromValue
        );

    if (!model.hasOwnProperty(_path) && !proto.hasOwnProperty(_path)) {
      continue;
    }

    !reversedProperties.has(_path) &&
      reversedProperties.set(
        _path,
        Object.seal({
          sourceMemberPath: prop.destinationMemberPath,
          destinationMemberPath: _path,
          destinationMemberSelector: s =>
            (s as any)[prop.sourceMemberPath as string],
          transformation: {
            transformationType: {
              preCondition: null,
              type: TransformationType.MapInitialize,
            },
            mapFrom: d => _get(d, null, prop.destinationMemberPath),
          },
        })
      );
  }

  return reversedProperties;
}

/**
 * Internal method
 * @private
 */
export function _createMapForPath<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any,
  TSelector extends Selector<TSource> = Selector<TSource>
>(
  reversedMapping: Mapping<
    TDestination,
    TSource,
    TBaseDestination,
    TBaseSource
  >,
  pathSelector: TSelector,
  fn: ForMemberExpression<TDestination, TSource>,
  reversedFluentFunctions: CreateReversedMapFluentFunctions<
    TDestination,
    TSource
  >
): CreateReversedMapFluentFunctions<TDestination, TSource> {
  const _transformationType = _getTransformationType(fn);
  const _path = _getMemberPath(pathSelector);

  let mapFrom: MapFromCallback<TDestination, TSource>;
  let condition: ConditionTransformation<TDestination, ReturnType<TSelector>>;
  let fromValue: any;
  let mapWith: MapWithTransformOptions<TDestination, TSource>;
  let convertUsing: ConvertUsingTransformOptions<TDestination, TSource>;
  let preCondition: ConditionTransformation<
    TDestination,
    ReturnType<TSelector>
  >;
  let nullSubstitution: any;

  const opts: DestinationMemberExpressionOptions<TDestination, TSource> = {
    mapFrom: cb => {
      mapFrom = cb;
    },
    mapWith: (destination, value) => {
      mapWith = { destination, fromValue: value };
    },
    condition: (predicate, defaultValue) => {
      condition = { predicate, defaultValue };
    },
    ignore(): void {
      // do nothing
    },
    fromValue: value => {
      fromValue = value;
    },
    convertUsing: (converter, value) => {
      convertUsing = { converter, value };
    },
    preCondition: (predicate, defaultValue) => {
      preCondition = { predicate, defaultValue };
      return opts;
    },
    nullSubstitution: value => {
      nullSubstitution = value;
    },
  };

  fn(opts);

  reversedMapping.properties.set(
    _path,
    Object.freeze({
      destinationMemberPath: _path,
      destinationMemberSelector: pathSelector,
      transformation: Object.freeze({
        transformationType: {
          type: _transformationType.type,
          // @ts-ignore
          preCondition,
        },
        // @ts-ignore
        mapFrom,
        // @ts-ignore
        condition,
        // @ts-ignore
        fromValue,
        // @ts-ignore
        mapWith,
        // @ts-ignore
        convertUsing,
        // @ts-ignore
        nullSubstitution,
      }),
    })
  );

  return reversedFluentFunctions;
}

/**
 * Internal method
 * @private
 */
export function _createMapForMember<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any,
  TSelector extends Selector<TDestination> = Selector<TDestination>
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  memberSelector: TSelector,
  fn: ForMemberExpression<TSource, TDestination>,
  fluentFunctions: CreateMapFluentFunctions<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >
): CreateMapFluentFunctions<
  TSource,
  TDestination,
  TBaseSource,
  TBaseDestination
> {
  const _transformationType = _getTransformationType(fn);
  const _memberPath = _getMemberPath(memberSelector);

  let mapFrom: MapFromCallback<TSource, TDestination>;
  let condition: ConditionTransformation<TSource, ReturnType<TSelector>>;
  let fromValue: any;
  let mapWith: MapWithTransformOptions<TSource, TDestination>;
  let convertUsing: ConvertUsingTransformOptions<TSource, TDestination>;
  let preCondition: ConditionTransformation<TSource, ReturnType<TSelector>>;
  let nullSubstitution: any;

  const opts: DestinationMemberExpressionOptions<TSource, TDestination> = {
    mapFrom: cb => {
      mapFrom = cb;
    },
    mapWith: (destination, value) => {
      mapWith = { destination, fromValue: value };
    },
    condition: (predicate, defaultValue) => {
      condition = { predicate, defaultValue };
    },
    ignore(): void {
      // do nothing
    },
    fromValue: value => {
      fromValue = value;
    },
    convertUsing: (converter, value) => {
      convertUsing = { converter, value };
    },
    preCondition: (predicate, defaultValue) => {
      preCondition = { predicate, defaultValue };
      return opts;
    },
    nullSubstitution: value => {
      nullSubstitution = value;
    },
  };

  fn(opts);

  mapping.properties.set(
    _memberPath,
    Object.freeze({
      destinationMemberPath: _memberPath,
      destinationMemberSelector: memberSelector,
      transformation: Object.freeze({
        transformationType: {
          type: _transformationType.type,
          // @ts-ignore
          preCondition,
        },
        // @ts-ignore
        mapFrom,
        // @ts-ignore
        condition,
        // @ts-ignore
        fromValue,
        // @ts-ignore
        mapWith,
        // @ts-ignore
        convertUsing,
        // @ts-ignore
        nullSubstitution,
      }),
    })
  );

  return fluentFunctions;
}

/**
 * Internal method
 * @private
 */
export function _setMappingPropertyForMapFromMember<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  path: string,
  sourcePath: string,
  mapping: Mapping<TSource, TDestination>,
  mapFrom: ValueSelector
): void {
  mapping.properties.set(
    path,
    Object.seal({
      destinationMemberSelector: dest => (dest as any)[path],
      destinationMemberPath: path,
      sourceMemberPath: sourcePath,
      transformation: {
        transformationType: {
          preCondition:
            mapping.properties.get(path)?.transformation.transformationType
              .preCondition || null,
          type: TransformationType.MapFrom,
        },
        mapFrom,
      },
    })
  );
}

/**
 * Internal method
 * @private
 */
export function _getPropsFromArguments<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  args: any[]
): {
  destination: Constructible<TDestination>;
  source?: Constructible<TSource>;
  options?: MapActionOptions<TSource, TDestination>;
} {
  const destination: Constructible<TDestination> = args[0];

  if (args.length === 1) {
    return { destination };
  }

  if (args.length === 3) {
    return { destination, source: args[1], options: args[2] };
  }

  let temp = args[1];

  if (
    (typeof temp === 'function' || _isClass(temp)) &&
    !temp['beforeMap'] &&
    !temp['afterMap']
  ) {
    return { destination, source: temp };
  }

  return { destination, options: temp };
}
