import {
  BaseOf,
  CreateReversedMapFluentFunction,
  Dict,
  Mapping,
  MappingClassId,
  MemberMapFunction,
  PreConditionFunction,
  Selector,
  SelectorReturn,
} from '../types';
import { createMapForMember } from './create-map-for-member';

export function createReverseMapFluentFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TDestination, TSource, TBaseDestination, TBaseSource>
): CreateReversedMapFluentFunction<TDestination, TSource> {
  const reversedMapFluentFunction: CreateReversedMapFluentFunction<
    TDestination,
    TSource
  > = {
    forPath: (
      selector: Selector<TSource, SelectorReturn<TSource>>,
      ...functions: [
        (
          | ReturnType<PreConditionFunction<TDestination, TSource>>
          | ReturnType<MemberMapFunction<TDestination, TSource>>
        ),
        ReturnType<MemberMapFunction<TDestination, TSource>>?
      ]
    ) =>
      createMapForMember(
        mapping,
        selector,
        functions as any,
        reversedMapFluentFunction
      ),
    beforeMap: action => {
      mapping[MappingClassId.actions][0] = action;
      return reversedMapFluentFunction;
    },
    afterMap: action => {
      mapping[MappingClassId.actions][1] = action;
      return reversedMapFluentFunction;
    },
  };

  return reversedMapFluentFunction;
}
