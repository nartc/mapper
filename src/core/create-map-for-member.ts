import {
  BaseOf,
  Dict,
  Mapping,
  MappingClassId,
  MappingProperty,
  MemberMapFunction,
  PreConditionFunction,
  Selector,
} from '../types';
import { getMemberPath } from '../utils';

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
    mapMemberFn = preCond as ReturnType<MemberMapFunction>;
    preCond = undefined as any;
  }

  const mappingProperty: MappingProperty<
    TSource,
    TDestination,
    ReturnType<TSelector>
  > = Object.seal({
    paths: [memberPath],
    transformation: {
      mapFn: mapMemberFn,
      type: mapMemberFn.type,
      preCond,
    },
  });
  const propIndex = mapping[MappingClassId.props].findIndex(
    ([propName]) => propName === memberPath
  );

  if (propIndex !== -1) {
    mapping[MappingClassId.props].splice(propIndex, 1, [
      memberPath,
      mappingProperty,
    ]);
    return fluentFunction;
  }

  mapping[MappingClassId.props].push([
    memberPath,
    Object.seal({
      paths: [memberPath],
      transformation: {
        mapFn: mapMemberFn,
        type: mapMemberFn.type,
        preCond,
      },
    }),
  ]);

  return fluentFunction;
}
