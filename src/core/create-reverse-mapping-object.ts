import { MappingStorage } from '../storages';
import { BaseOf, Constructible, Dict, Mapping, MappingClassId } from '../types';
import { getMappingForDestination } from './get-mapping-for-destination';
import { inheritBaseMapping } from './inherit-base-mapping';
import { initializeReverseMappingProps } from './initialize-reverse-mapping-props';

export function createReverseMappingObject<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  mappingStorage: MappingStorage
): Mapping<TDestination, TSource, TBaseDestination, TBaseSource> {
  const [source, destination] = mapping[MappingClassId.models];
  const [useUndefined, sourceConvention, destinationConvention] = mapping[
    MappingClassId.conventions
  ];
  const bases = mapping[MappingClassId.bases];

  let reversedMapping = mappingStorage.get(destination, source);
  if (reversedMapping) {
    return reversedMapping;
  }

  reversedMapping = [
    [destination, source],
    [useUndefined, destinationConvention, sourceConvention],
    initializeReverseMappingProps(mapping),
    [],
    (bases?.slice().reverse() || []) as [Constructible, Constructible],
  ];

  const reversedBaseMapping = getMappingForDestination(
    reversedMapping[MappingClassId.bases]![1],
    reversedMapping[MappingClassId.bases]![0],
    mappingStorage,
    true
  );
  if (reversedBaseMapping) {
    inheritBaseMapping(reversedMapping, reversedBaseMapping);
  }

  mappingStorage.set(destination, source, reversedMapping);
  return reversedMapping;
}
