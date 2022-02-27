import { PojosMetadataStorage, pojosSymbolStorage } from '../storages';

export function exploreMetadata(
  metadataStorage: PojosMetadataStorage,
  ...keys: string[]
) {
  keys.forEach((key) => {
    if (!metadataStorage.has(key)) {
      const metadataList = pojosSymbolStorage.get(Symbol.for(key));
      for (const [propertyKey, metadata] of metadataList) {
        metadataStorage.addMetadata(key, [[propertyKey], () => metadata]);
      }
    }
  });
}
