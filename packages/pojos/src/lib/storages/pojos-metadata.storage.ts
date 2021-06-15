import { isSamePath } from '@automapper/core';
import type { Metadata, MetadataStorage } from '@automapper/types';

/**
 * Internal PojosMetadataStorage
 *
 * @private
 */
export class PojosMetadataStorage implements MetadataStorage<string> {
  private storage = new Map<string, Array<Metadata<string>>>();

  addMetadata(metaKey: string, metadata: Metadata<string>): void {
    // Get metadata on the model
    const exists = this.storage.get(metaKey) ?? [];

    // if already exists, break
    if (exists.some(([existKey]) => isSamePath(existKey, metadata[0]))) {
      return;
    }

    this.storage.set(metaKey, [...exists, metadata]);
  }

  getMetadata(metaKey: string): Array<Metadata<string>> {
    const metadataList = this.storage.get(metaKey) ?? [];

    // empty metadata
    if (!metadataList.length) {
      return [];
    }

    const resultMetadataList: Array<Metadata<string>> = [];
    for (let i = 0; i < metadataList.length; i++) {
      const metadata = metadataList[i];
      // skip existing
      if (resultMetadataList.some(([key]) => isSamePath(key, metadata[0]))) {
        continue;
      }
      resultMetadataList.push(metadataList[i]);
    }

    return resultMetadataList;
  }

  getMetadataForKey(
    metaKey: string,
    key: string[]
  ): Metadata<string> | undefined {
    return this.getMetadata(metaKey).find(([innerMetaKey]) =>
      isSamePath(innerMetaKey, key)
    );
  }

  has(metaKey: string): boolean {
    return this.storage.has(metaKey);
  }

  dispose(): void {
    this.storage = new Map<string, Array<Metadata<string>>>();
  }
}
