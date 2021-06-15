import type { Metadata, MetadataStorage } from '@automapper/types';
import type { Constructible } from '../types';
import { isSamePath } from '@automapper/core';

/**
 * Internal ClassMetadataStorage
 *
 * This is to store Metadata of all the models using ReflectMetadata
 * Not test due to private
 *
 * @private
 */
export class ClassMetadataStorage implements MetadataStorage<Constructible> {
  private storage = new WeakMap<
    Constructible,
    Array<Metadata<Constructible>>
  >();

  getMetadata(model: Constructible): Array<Metadata<Constructible>> {
    const metadataList = this.storage.get(model) ?? [];

    // empty metadata
    if (!metadataList.length) {
      // try to get the metadata on the prototype of the class
      return model.name ? this.getMetadata(Object.getPrototypeOf(model)) : [];
    }

    const resultMetadataList: Array<Metadata<Constructible>> = [];
    for (let i = 0; i < metadataList.length; i++) {
      const metadata = metadataList[i];
      // skip existing
      if (resultMetadataList.some(([metaKey]) => isSamePath(metaKey, metadata[0]))) {
        continue;
      }
      resultMetadataList.push(metadataList[i]);
    }

    return resultMetadataList;
  }

  getMetadataForKey(
    model: Constructible,
    key: string[]
  ): Metadata<Constructible> | undefined {
    return this.getMetadata(model).find(([metaKey]) => isSamePath(metaKey, key));
  }

  addMetadata(model: Constructible, metadata: Metadata<Constructible>): void {
    // Get metadata on the model
    const exists = this.storage.get(model) ?? [];

    // Get metadata on prototype
    const protoExists = this.storage.get(Object.getPrototypeOf(model)) ?? [];

    // merged existing metadata
    const merged = [...protoExists, ...exists];

    // if already exists, break
    if (merged.some(([existKey]) => isSamePath(existKey, metadata[0]))) {
      return;
    }

    this.storage.set(model, [...merged, metadata]);
  }

  has(metaKey: Constructible): boolean {
    return this.storage.has(metaKey);
  }

  dispose(): void {
    this.storage = new WeakMap<Constructible, Array<Metadata<Constructible>>>();
  }
}
