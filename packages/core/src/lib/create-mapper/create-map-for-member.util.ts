import type {
  CreateMapFluentFunction,
  Dictionary,
  Mapping,
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
import { getMemberPath } from './get-member-path.util';

/**
 *
 * @param {Mapping} mapping - Mapping between source <> destination
 * @param {Selector} selector - the member selector on `forMember(selector)`
 * @param preCond
 * @param mapMemberFn
 * @param fluentFunction
 */
export function createMapForMember<
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