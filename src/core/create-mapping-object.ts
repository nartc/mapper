import { MappingStorage } from '../storages';
import {
  BaseOf,
  Constructible,
  CreateMapOptions,
  Dict,
  Mapping,
} from '../types';
import { initializeMappingProps } from './initialize-mapping-props';

export function createMappingObject<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  source: Constructible<TSource>,
  destination: Constructible<TDestination>,
  options: CreateMapOptions<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >,
  mappingStorage: MappingStorage
) {
  if (mappingStorage.has(source, destination)) {
    throw new Error(
      `Mapping for source ${source.toString()} and destination ${destination.toString()} already exists`
    );
  }

  const mapping: Mapping<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  > = [
    [source, destination],
    [
      options.useUndefined!,
      options.sourceMemberNamingConvention!,
      options.destinationMemberNamingConvention!,
    ],
    [],
    [],
  ];
  initializeMappingProps(mapping);
  mappingStorage.set(source, destination, mapping);
  return mapping;
}
