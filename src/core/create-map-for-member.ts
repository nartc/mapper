import {
  Dict,
  MapFromFunction,
  Mapping,
  MappingClassId,
  MappingProperty,
  MapWithFunction,
  MemberMapFunction,
  MemberMapFunctionId,
  PreConditionFunction,
  Selector,
} from '../types';
import { getMemberPath, isThisMemberMap } from '../utils';

export function createMapForMember<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelector extends Selector<TDestination> = Selector<TDestination>,
  TReturnType = any
>(
  mapping: Mapping<TSource, TDestination>,
  selector: TSelector,
  [preCond, mapMemberFn]: [
    (
      | ReturnType<PreConditionFunction<TSource, TDestination>>
      | ReturnType<MemberMapFunction<TSource, TDestination>>
    ),
    ReturnType<MemberMapFunction<TSource, TDestination>>?
  ],
  fluentFunction: TReturnType
): TReturnType {
  const memberPath = getMemberPath(selector);

  if (mapMemberFn == null) {
    mapMemberFn = preCond as ReturnType<
      MemberMapFunction<TSource, TDestination>
    >;
    preCond = undefined;
  }

  let sourcePath: string = '';
  // 1: TransformationType.MapFrom
  // 4: TransformationType.MapWith
  if (isThisMemberMap<MapFromFunction, MapWithFunction>(mapMemberFn, 1, 4)) {
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
      preCond: preCond as ReturnType<
        PreConditionFunction<TSource, TDestination>
      >,
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
