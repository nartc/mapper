import { MappingStorage, metadataStorage } from '../storages';
import { Constructible, Dict, Mapping } from '../types';

export function getMappingForNestedKey<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TDestinationKey extends keyof TDestination = any
>(
  destinationConstructor: Constructible<TDestination>,
  destinationMemberKey: TDestinationKey,
  sourceConstructor: Constructible<TSource>,
  mappingStorage: MappingStorage
): Mapping<TSource, TDestination[TDestinationKey]> {
  const keyMetadata = metadataStorage.getMetadataForKey(
    destinationConstructor,
    destinationMemberKey
  );

  const meta = keyMetadata?.[1]();
  if (!meta || Array.isArray(meta)) {
    throw new Error(
      `Metadata for ${destinationMemberKey} is a primitive or Array. Consider manual map this property`
    );
  }

  const mapping = mappingStorage.get(sourceConstructor, meta);
  if (!mapping) {
    throw new Error(
      `Mapping for ${destinationMemberKey} cannot be found. Consider manual map this property with MapWith`
    );
  }

  return mapping;
}
