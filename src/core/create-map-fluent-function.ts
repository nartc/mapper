import { MappingStorage } from '../storages';
import {
  BaseOf,
  CreateMapFluentFunction,
  CreateMapOptions,
  Dict,
  Mapping,
  MappingClassId,
  MemberMapFunction,
  PreConditionFunction,
  Selector,
  SelectorReturn,
} from '../types';
import { createMapForMember } from './create-map-for-member';
import { createReverseMapFluentFunction } from './create-reverse-map-fluent-function';
import { createReverseMappingObject } from './create-reverse-mapping-object';
import { getMappingForDestination } from './get-mapping-for-destination';
import { inheritBaseMapping } from './inherit-base-mapping';

export function createMapFluentFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  options: CreateMapOptions<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >,
  mappingStorage: MappingStorage
): CreateMapFluentFunction<
  TSource,
  TDestination,
  TBaseSource,
  TBaseDestination
> {
  if (options.includeBase?.length) {
    const [baseSource, baseDestination] = options.includeBase;
    const baseMapping = getMappingForDestination(
      baseDestination,
      baseSource,
      mappingStorage,
      true
    );
    if (baseMapping != null) {
      inheritBaseMapping(mapping, baseMapping);
    }
  }

  const fluentFunction: CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  > = {
    forMember: (
      selector: Selector<TDestination, SelectorReturn<TDestination>>,
      ...functions: Array<
        ReturnType<MemberMapFunction> | ReturnType<PreConditionFunction>
      >
    ) =>
      createMapForMember(mapping, selector, functions as any, fluentFunction),
    beforeMap: action => {
      mapping[MappingClassId.actions][0] = action;
      return fluentFunction;
    },
    afterMap: action => {
      mapping[MappingClassId.actions][1] = action;
      return fluentFunction;
    },
    reverseMap: () =>
      createReverseMapFluentFunction(
        createReverseMappingObject(mapping, mappingStorage)
      ),
  };

  return fluentFunction;
}
