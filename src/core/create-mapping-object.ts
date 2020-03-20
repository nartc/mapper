import { mappingStorage } from '../storages';
import {
  BaseOf,
  Constructible,
  CreateMapOptions,
  Dict,
  Mapping,
} from '../types';

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
  >
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
  > = Object.seal({
    models: [source, destination],
    props: [],
    conventions: [
      options.sourceMemberNamingConvention,
      options.destinationMemberNamingConvention,
    ] as Mapping['conventions'],
    actions: undefined,
    bases: undefined,
  });
  mappingStorage.set(source, destination, mapping);
  return mapping;
}
