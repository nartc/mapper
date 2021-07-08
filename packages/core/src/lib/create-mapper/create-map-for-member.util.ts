import type {
  CreateMapFluentFunction,
  Dictionary,
  Mapping,
  MappingProperty,
  MemberMapReturn,
  PreConditionReturn,
  Selector,
  SelectorReturn,
} from '@automapper/types';
import {
  MapFnClassId,
  MappingClassId,
  MappingPropertiesClassId,
  TransformationType,
} from '@automapper/types';
import { isSamePath } from '../utils';
import { getMemberPath } from './get-member-path.util';

/**
 *
 * @param {Mapping} mapping - Mapping between source <> destination
 * @param {Selector} selector - the member selector on `forMember(selector)`
 * @param preCondOrMapMemberFn
 * @param mapMemberFn
 * @param fluentFunction
 */
export function createMapForMember<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TMemberType = SelectorReturn<TDestination>
>(
  mapping: Mapping<TSource, TDestination>,
  selector: Selector<TDestination, TMemberType>,
  [preCondOrMapMemberFn, mapMemberFn]: [
    preCondOrMapMemberFn:
      | PreConditionReturn<TSource, TDestination>
      | MemberMapReturn<TSource, TDestination>
      | undefined,
    mapMemberFn?: MemberMapReturn<TSource, TDestination>
  ],
  fluentFunction: CreateMapFluentFunction<TSource, TDestination>
): CreateMapFluentFunction<TSource, TDestination> {
  // get the memberPath from the selector
  // eg: `s => s.foo.bar` returns `foo.bar`
  const memberPath = getMemberPath(selector);

  // reassign mapMemberFn and preCond
  if (mapMemberFn == null) {
    mapMemberFn = preCondOrMapMemberFn as MemberMapReturn;
    preCondOrMapMemberFn = undefined;
  }

  // initialize sourcePath
  let sourcePath: string[] = [];

  // if the transformation is MapWith, we have information on the source value selector
  if (
    mapMemberFn[MapFnClassId.type] === TransformationType.MapWith &&
    mapMemberFn[MapFnClassId.misc] != null
  ) {
    sourcePath = getMemberPath(mapMemberFn[MapFnClassId.misc]!);
  }

  // initialize MappingProperty
  const mappingProperty: MappingProperty = [
    [memberPath, sourcePath],
    [mapMemberFn, false, preCondOrMapMemberFn as PreConditionReturn],
  ];

  // check existProp on mapping
  const existProp = mapping[MappingClassId.properties].find(([propName]) =>
    isSamePath(propName, memberPath)
  );

  // if exists, overrides
  if (existProp != null) {
    existProp[MappingPropertiesClassId.property] = mappingProperty;
  } else {
    // push MappingProperty to mapping
    mapping[MappingClassId.properties].push([memberPath, mappingProperty]);
  }

  return fluentFunction;
}
