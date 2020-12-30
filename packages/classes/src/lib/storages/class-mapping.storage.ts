import type { Mapping, MappingStorage } from '@automapper/types';
import type { Constructible } from '../types';

/**
 * Internal ClassMappingStorage
 *
 * This is to store the Mapping when created with Constructibles
 * Not test due to private
 *
 * @private
 */
export class ClassMappingStorage implements MappingStorage<Constructible> {
  private storage = new WeakMap<
    Constructible,
    WeakMap<Constructible, Mapping>
  >();

  get(source: Constructible, destination: Constructible): Mapping | undefined {
    return this.storage.get(source)?.get(destination);
  }

  set(
    source: Constructible,
    destination: Constructible,
    mapping: Mapping
  ): void {
    if (!this.storage.has(source)) {
      this.storage.set(
        source,
        new WeakMap<Constructible, Mapping>().set(destination, mapping)
      );
      return;
    }

    if (!this.has(source, destination)) {
      this.storage.get(source)!.set(destination, mapping);
    }
  }

  has(source: Constructible, destination: Constructible): boolean {
    return this.storage.get(source)?.has(destination) ?? false;
  }

  dispose(): void {
    this.storage = new WeakMap<
      Constructible,
      WeakMap<Constructible, Mapping>
    >();
  }
}
