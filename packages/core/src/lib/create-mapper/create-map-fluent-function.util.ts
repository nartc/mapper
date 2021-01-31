import type {
  CreateMapFluentFunction,
  Dictionary,
  MapAction,
  Mapping,
  MemberMapReturn,
  PreConditionReturn,
  Selector,
  SelectorReturn,
} from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import { createMapForMember } from './create-map-for-member.util';

/**
 * Method to create FluentFunction for chaining forMember etc...
 *
 * @param {Mapping} mapping - Mapping object of source <> destination
 */
export function createMapFluentFunction<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
>(
  mapping: Mapping<TSource, TDestination>
): CreateMapFluentFunction<TSource, TDestination> {
  // initialize fluentFunction
  const fluentFunction: CreateMapFluentFunction<TSource, TDestination> = {
    forMember<TMemberType = SelectorReturn<TDestination>>(
      selector: Selector<TDestination, TMemberType>,
      ...functions: [
        (
          | PreConditionReturn<TSource, TDestination, TMemberType>
          | MemberMapReturn<TSource, TDestination, TMemberType>
        ),
        MemberMapReturn<TSource, TDestination, TMemberType>?
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
