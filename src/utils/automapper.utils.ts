import { plainToClass } from 'class-transformer';
import { get } from 'lodash';
import {
  ConditionPredicate,
  ConvertUsingTransformOptions,
  CreateMapFluentFunctions,
  CreateReversedMapFluentFunctions,
  DestinationMemberExpressionOptions,
  Dict,
  ForMemberExpression,
  MapFromCallback,
  Mapping,
  MappingProperty,
  MapWithTransformOptions,
  Selector,
  TransformationType,
  ValueSelector,
} from '../types';
import {
  _getMemberPath,
  _getPathRecursive,
  _getSourcePropertyKey,
  _getTransformationType,
} from './common.utils';

export function _initializeMappingProperties<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(mapping: Mapping<TSource, TDestination>): void {
  const destination = plainToClass(
    mapping.destination,
    new mapping.destination(),
    { enableCircularCheck: true, enableImplicitConversion: true }
  );
  const source = plainToClass(mapping.source, new mapping.source(), {
    enableCircularCheck: true,
    enableImplicitConversion: true,
  });
  const destinationPaths = _getPathRecursive(destination);

  for (let i = 0; i < destinationPaths.length; i++) {
    const path = destinationPaths[i];
    const sourcePath = _getSourcePropertyKey(
      mapping.destinationMemberNamingConvention,
      mapping.sourceMemberNamingConvention,
      path
    );

    if (!source.hasOwnProperty(sourcePath)) {
      const _paths = sourcePath
        .split(mapping.sourceMemberNamingConvention.splittingExpression)
        .filter(Boolean);
      if (_paths.length === 1 || !source.hasOwnProperty(_paths[0])) {
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
            mapFrom: s => get(s, _paths.join('.')),
          },
          destinationMemberPath: path,
          destinationMemberSelector: d => (d as any)[path],
          sourceMemberPath: _paths.join('.'),
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
          mapFrom: s => get(s, sourcePath),
        },
        destinationMemberSelector: d => (d as any)[path],
        destinationMemberPath: path,
        sourceMemberPath: sourcePath,
      })
    );
  }
}

export function _initializeReversedMappingProperties<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  mapping: Mapping<TSource, TDestination>
): Map<string, MappingProperty<TDestination, TSource>> {
  const model = plainToClass(mapping.source, new mapping.source());
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

    if (!model.hasOwnProperty(_path)) {
      continue;
    }

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
          mapFrom: d => get(d, prop.destinationMemberPath),
        },
      })
    );
  }

  return reversedProperties;
}

export function _createMapForPath<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelector extends Selector<TSource> = Selector<TSource>
>(
  reversedMapping: Mapping<TDestination, TSource>,
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
  let condition: ConditionPredicate<TDestination>;
  let fromValue: any;
  let mapWith: MapWithTransformOptions<TDestination, TSource>;
  let convertUsing: ConvertUsingTransformOptions<TDestination, TSource>;
  let preCondition: ConditionPredicate<TDestination>;

  const opts: DestinationMemberExpressionOptions<TDestination, TSource> = {
    mapFrom: cb => {
      mapFrom = cb;
    },
    mapWith: (destination, value) => {
      mapWith = { destination, fromValue: value };
    },
    condition: predicate => {
      condition = predicate;
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
    preCondition: predicate => {
      preCondition = predicate;
      return opts;
    },
  };

  fn(opts);
  // @ts-ignore
  const _pcfn = _transformationType.withPreCondition ? preCondition : null;
  reversedMapping.properties.set(
    _path,
    Object.freeze({
      destinationMemberPath: _path,
      destinationMemberSelector: pathSelector,
      transformation: Object.freeze({
        transformationType: {
          type: _transformationType.type,
          preCondition: _pcfn,
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
      }),
    })
  );

  return reversedFluentFunctions;
}

export function _createMapForMember<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelector extends Selector<TDestination> = Selector<TDestination>
>(
  mapping: Mapping<TSource, TDestination>,
  memberSelector: TSelector,
  fn: ForMemberExpression<TSource, TDestination>,
  fluentFunctions: CreateMapFluentFunctions<TSource, TDestination>
): CreateMapFluentFunctions<TSource, TDestination> {
  const _transformationType = _getTransformationType(fn);
  const _memberPath = _getMemberPath(memberSelector);

  let mapFrom: MapFromCallback<TSource, TDestination>;
  let condition: ConditionPredicate<TSource>;
  let fromValue: any;
  let mapWith: MapWithTransformOptions<TSource, TDestination>;
  let convertUsing: ConvertUsingTransformOptions<TSource, TDestination>;
  let preCondition: ConditionPredicate<TSource>;

  const opts: DestinationMemberExpressionOptions<TSource, TDestination> = {
    mapFrom: cb => {
      mapFrom = cb;
    },
    mapWith: (destination, value) => {
      mapWith = { destination, fromValue: value };
    },
    condition: predicate => {
      condition = predicate;
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
    preCondition: predicate => {
      preCondition = predicate;
      return opts;
    },
  };

  fn(opts);

  // @ts-ignore
  const _pcfn = _transformationType.withPreCondition ? preCondition : null;

  mapping.properties.set(
    _memberPath,
    Object.freeze({
      destinationMemberPath: _memberPath,
      destinationMemberSelector: memberSelector,
      transformation: Object.freeze({
        transformationType: {
          type: _transformationType.type,
          preCondition: _pcfn,
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
      }),
    })
  );

  return fluentFunctions;
}

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
          preCondition: null,
          type: TransformationType.MapFrom,
        },
        mapFrom,
      },
    })
  );
}
