/**
 * Internal PojosSymbolStorage
 *
 * @private
 */
import type { Metadata, MetadataClassId } from '@automapper/core';

class PojosSymbolStorage {
  private storage = new Map<
    symbol,
    [
      propertyKey: string,
      metadata: ReturnType<Metadata<string>[MetadataClassId.metadataFn]>
    ][]
  >();

  set(
    key: symbol,
    rawMetadataList: [
      propertyKey: string,
      metadata: ReturnType<Metadata<string>[MetadataClassId.metadataFn]>
    ][]
  ): void {
    if (this.storage.has(key)) {
      return;
    }

    this.storage.set(key, rawMetadataList);
  }

  get(
    key: symbol
  ): [
    propertyKey: string,
    metadata: ReturnType<Metadata<string>[MetadataClassId.metadataFn]>
  ][] {
    return this.storage.get(key) || [];
  }

  has(key: symbol): boolean {
    return this.storage.has(key);
  }

  dispose() {
    this.storage = new Map<
      symbol,
      [
        propertyKey: string,
        metadata: ReturnType<Metadata<string>[MetadataClassId.metadataFn]>
      ][]
    >();
  }
}

export const pojosSymbolStorage = new PojosSymbolStorage();
