import type { Mapping, MappingStorage } from '@automapper/types';

/**
 * Internal PojosMappingStorage
 *
 * @private
 */
export class PojosMappingStorage implements MappingStorage<string> {
  private storage = new Map<string, Map<string, Mapping>>();

  get(source: string, destination: string): Mapping | undefined {
    return this.storage.get(source)?.get(destination);
  }

  has(source: string, destination: string): boolean {
    return this.storage.get(source)?.has(destination);
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
      this.storage.get(source)?.set(destination, mapping);
    }
  }

  dispose(): void {
    this.storage = new Map<string, Map<string, Mapping>>();
  }
}
