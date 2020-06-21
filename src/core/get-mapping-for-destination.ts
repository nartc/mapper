import { MappingStorage } from '../storages';
import { Constructible, Dict, Mapping } from '../types';

export function getMappingForDestination<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  destination: Constructible<TDestination>,
  source: Constructible<TSource>,
  mappingStorage: MappingStorage,
  isInherit: boolean = false
): Mapping<TSource, TDestination> | undefined | never {
  const mapping = mappingStorage.get(source, destination);

  if (!mapping && !isInherit) {
    throw new Error(
      `Mapping not found for source ${source.toString()} and destination ${destination.toString()}`
    );
  }

  return mapping as Mapping<TSource, TDestination>;
}
