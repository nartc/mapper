import { createInitialMapping } from '@automapper/core';
import type { MapPluginInitializer } from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import {
  PojosMappingStorage,
  PojosMetadataStorage,
  pojosSymbolStorage,
} from './storages';
import { exploreMetadata, instantiate } from './utils';

export const pojos: MapPluginInitializer<string> = (errorHandler) => {
  const metadataStorage = new PojosMetadataStorage();
  const mappingStorage = new PojosMappingStorage();

  return {
    instantiate(model, obj?) {
      return instantiate(metadataStorage, model, obj);
    },
    initializeMapping(source, destination, options?) {
      if (mappingStorage.has(source, destination)) {
        errorHandler.handle(
          `Mapping for source ${source} and destination ${destination} already exists`
        );
        return;
      }

      exploreMetadata(metadataStorage, source, destination);

      const [destinationObj, destinationNestedMetadataMap] =
        this.instantiate(destination);

      const [sourceObj, sourceNestedMetadataMap] = this.instantiate(source);

      return createInitialMapping(
        sourceObj,
        destinationObj,
        sourceNestedMetadataMap as unknown[],
        destinationNestedMetadataMap as unknown[],
        (mapping) => {
          mappingStorage.set(source, destination, mapping);
        },
        options,
        {
          isMetadataNullAtKey: (key) =>
            metadataStorage.getMetadataForKey(destination, key) === null,
        }
      );
    },
    getMapping(source, destination) {
      const mapping = mappingStorage.get(source, destination);
      if (!mapping) {
        errorHandler.handle(
          `Mapping not found for source ${source} and destination ${destination}`
        );
        return;
      }

      const [sourceObj] = this.instantiate(source);
      const [destinationObj] = this.instantiate(destination);

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
