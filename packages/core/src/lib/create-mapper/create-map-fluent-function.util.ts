import type {
  CreateMapFluentFunction,
  Dictionary,
  Mapping,
  MemberMapReturn,
  PreConditionReturn,
} from '../types';
import { MappingClassId } from '../types';
import { createMapForMember } from './create-map-for-member.util';
import { createMapForSelf } from './create-map-for-self.util';

/**
 * Method to create FluentFunction for chaining forMember, beforeMap, and afterMap
 *
 * @param {Mapping} mapping - Mapping object of source <> destination
 */
export function createMapFluentFunction<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  mapping: Mapping<TSource, TDestination>
): CreateMapFluentFunction<TSource, TDestination> {
  return {
    forMember(
      selector,
      ...functions: [
        (
          | PreConditionReturn<TSource, TDestination>
          | MemberMapReturn<TSource, TDestination>
        ),
        MemberMapReturn<TSource, TDestination>?
      ]
    ) {
      createMapForMember(mapping, selector, functions);
      return this;
    },
    forSelf(source, selector) {
      createMapForSelf(mapping, source, selector);
      return this;
    },
    beforeMap(mapAction) {
      // assign before mapAction to mapping
      mapping[MappingClassId.actions][0] = mapAction;
      return this;
    },
    afterMap(mapAction) {
      // assign after mapAction to mapping
      mapping[MappingClassId.actions][1] = mapAction;
      return this;
    },
  };
}
