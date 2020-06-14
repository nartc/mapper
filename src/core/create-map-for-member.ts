import {
  BaseOf,
  Dict,
  MapFromFunction,
  Mapping,
  MappingClassId,
  MappingProperty,
  MemberMapFunction,
  MemberMapFunctionId,
  PreConditionFunction,
  Selector,
} from '../types';
import { getMemberPath, isThisMemberMap } from '../utils';

export function createMapForMember<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any,
  TSelector extends Selector<TDestination> = Selector<TDestination>,
  TReturnType = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  selector: TSelector,
  [preCond, mapMemberFn]: [
    ReturnType<PreConditionFunction<TSource, TDestination>>,
    ReturnType<MemberMapFunction<TSource, TDestination>>
  ],
  fluentFunction: TReturnType
): TReturnType {
  const memberPath = getMemberPath(selector);

  if (mapMemberFn == null) {
    mapMemberFn = preCond as any;
    preCond = undefined as any;
  }

  let sourcePath: string = '';
  // 1: TransformationType.MapFrom
  if (isThisMemberMap<MapFromFunction>(mapMemberFn, 1)) {
    sourcePath = getMemberPath(mapMemberFn[MemberMapFunctionId.misc]);
  }

  const paths: [string, string?] = !!sourcePath
    ? [memberPath, sourcePath]
    : [memberPath];

  const mappingProperty: MappingProperty<
    TSource,
    TDestination,
    ReturnType<TSelector>
  > = Object.seal({
    paths,
    transformation: {
      mapFn: mapMemberFn,
      type: mapMemberFn[MemberMapFunctionId.type],
      preCond,
    },
  });

  const existProp = mapping[MappingClassId.props].find(
    ([propName]) => propName === memberPath
  );
  if (existProp != null) {
    existProp[1] = mappingProperty;
    return fluentFunction;
  }

  mapping[MappingClassId.props].push([memberPath, mappingProperty]);
  return fluentFunction;
}
