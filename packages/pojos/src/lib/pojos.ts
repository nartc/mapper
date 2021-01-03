import { createInitialMapping } from '@automapper/core';
import type { CreateMapOptions, MapPluginInitializer } from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import {
  PojosMappingStorage,
  PojosMetadataStorage,
  pojosSymbolStorage,
} from './storages';
import { instantiate } from './utils';

export const pojos: MapPluginInitializer<string> = (errorHandler) => {
  const metadataStorage = new PojosMetadataStorage();
  const mappingStorage = new PojosMappingStorage();

  return {
    initializeMapping(
      source: string,
      destination: string,
      options?: CreateMapOptions
    ) {
      if (mappingStorage.has(source, destination)) {
        errorHandler.handle(
          `Mapping for source ${source} and destination ${destination} already exists`
        );
        return;
      }

      exploreMetadata(metadataStorage, source, destination);

      const [destinationObj, destinationNestedMetadataMap] = instantiate(
        metadataStorage,
        destination
      );

      const [sourceObj, sourceNestedMetadataMap] = instantiate(
        metadataStorage,
        source
      );

      return createInitialMapping(
        sourceObj,
        destinationObj,
        sourceNestedMetadataMap,
        destinationNestedMetadataMap,
        (mapping) => {
          mappingStorage.set(source, destination, mapping);
        },
        options
      );
    },
    getMapping(source: string, destination: string) {
      const mapping = mappingStorage.get(source, destination);
      if (!mapping) {
        errorHandler.handle(
          `Mapping not found for source ${source} and destination ${destination}`
        );
        return;
      }

      const [sourceObj] = instantiate(metadataStorage, source);
      const [destinationObj] = instantiate(metadataStorage, destination);

      mapping[MappingClassId.mappings] = [sourceObj, destinationObj];
      return mapping;
    },
    dispose() {
      metadataStorage.dispose();
      mappingStorage.dispose();
      pojosSymbolStorage.dispose();
    },
  };
};

function exploreMetadata(
  metadataStorage: PojosMetadataStorage,
  ...keys: string[]
) {
  keys.forEach((key) => {
    if (!metadataStorage.has(key)) {
      const metadataList = pojosSymbolStorage.get(Symbol.for(key));
      for (const [propertyKey, metadata] of metadataList) {
        metadataStorage.addMetadata(key, [propertyKey, () => metadata]);
      }
    }
  });
}
