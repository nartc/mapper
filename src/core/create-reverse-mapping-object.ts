import { mappingStorage } from '../storages';
import { BaseOf, Constructible, Dict, Mapping } from '../types';
import { getMappingForDestination } from './get-mapping-for-destination';
import { inheritBaseMapping } from './inherit-base-mapping';
import { initializeReverseMappingProps } from './initialize-reverse-mapping-props';

export function createReverseMappingObject<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>
): Mapping<TDestination, TSource, TBaseDestination, TBaseSource> {
  const {
    models: [source, destination],
    conventions: [sourceConvention, destinationConvention],
    bases,
  } = mapping;

  let reversedMapping = mappingStorage.get(destination, source);
  if (reversedMapping) {
    return reversedMapping;
  }

  reversedMapping = Object.seal({
    models: [destination, source],
    conventions: [destinationConvention, sourceConvention],
    bases: bases?.slice().reverse() as [Constructible, Constructible],
    actions: undefined,
    props: initializeReverseMappingProps(mapping),
  });

  if (reversedMapping.bases) {
    const reversedBaseMapping = getMappingForDestination(
      reversedMapping.bases[1],
      reversedMapping.bases[0],
      true
    );
    if (reversedBaseMapping) {
      inheritBaseMapping(reversedMapping, reversedBaseMapping);
    }
  }

  mappingStorage.set(destination, source, reversedMapping);
  return reversedMapping;
}
