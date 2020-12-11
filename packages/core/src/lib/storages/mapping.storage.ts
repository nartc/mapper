import { AutoMapperStorage } from '@automapper/models';

/**
 * Internal MappingStorage
 *
 * @private
 */
export class MappingStorage extends AutoMapperStorage<'mapping'> {
  protected storage: WeakMap<any, WeakMap<any, any>>;

  protected getInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey: any,
    nestedEntryKey: any
  ): WeakMap<any, any> {
    return storage.get(entryKey)?.get(nestedEntryKey);
  }

  protected hasInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey: any,
    nestedEntryKey: any
  ): boolean {
    return storage.get(entryKey)?.has(nestedEntryKey) ?? false;
  }

  protected setInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey: any,
    [nestedEntryKey, nestedEntryValue]: [any, WeakMap<any, any>]
  ): void {
    if (!storage.has(entryKey)) {
      storage.set(
        entryKey,
        new WeakMap<any, any>().set(nestedEntryKey, nestedEntryValue)
      );
      return;
    }

    if (!this.hasInternal(storage, entryKey, nestedEntryKey)) {
      storage.get(entryKey).set(nestedEntryKey, nestedEntryValue);
    }
  }
}
