/**
 * Internal MappingStorage
 *
 * @private
 */
export class MappingStorage {
  protected storage = new WeakMap<any, WeakMap<any, any>>();

  setMapping(entryKey, [nestedEntryKey, nestedEntryValue]): void {
    this.setInternal(this.storage, entryKey, nestedEntryKey, nestedEntryValue);
  }

  hasMapping(entryKey, nestedEntryKey): boolean {
    return this.hasInternal(this.storage, entryKey, nestedEntryKey);
  }

  getMapping(entryKey, nestedEntryKey) {
    return this.getInternal(this.storage, entryKey, nestedEntryKey);
  }

  protected getInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey,
    nestedEntryKey
  ): any {
    return storage.get(entryKey)?.get(nestedEntryKey);
  }

  protected setInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey,
    nestedEntryKey,
    nestedEntryValue
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

  protected hasInternal(
    storage: WeakMap<any, WeakMap<any, any>>,
    entryKey,
    nestedEntryKey
  ): boolean {
    return storage.get(entryKey)?.has(nestedEntryKey) ?? false;
  }
}
