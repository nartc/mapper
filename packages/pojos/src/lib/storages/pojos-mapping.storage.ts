import type { Mapping, MappingStorage } from '@automapper/types';

/**
 * Internal PojosMappingStorage
 *
 * @private
 */
export class PojosMappingStorage implements MappingStorage<string> {
  private storage = new Map<string, Map<string, Mapping>>();

  get(source: string, destination: string): Mapping | undefined {
    const sourceVal = this.storage.get(source);
    return sourceVal ? sourceVal.get(destination) : undefined;
  }

  has(source: string, destination: string): boolean | undefined {
    const sourceVal = this.storage.get(source);
    return sourceVal ? sourceVal.has(destination) : undefined;
  }

  set(source: string, destination: string, mapping: Mapping): void {
    if (!this.storage.has(source)) {
      this.storage.set(
        source,
        new Map<string, Mapping>().set(destination, mapping)
      );
      return;
    }

    if (!this.has(source, destination)) {
      const sourceVal = this.storage.get(source);
      sourceVal && sourceVal.set(destination, mapping);
    }
  }

  dispose(): void {
    this.storage = new Map<string, Map<string, Mapping>>();
  }
}
