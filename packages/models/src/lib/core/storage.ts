export type EntryValueMap = {
  mapping: WeakMap<any, any>;
  profile: any;
  metadata: any;
};

export abstract class AutoMapperStorage<
  TType extends 'mapping' | 'profile' | 'metadata',
  TStorageKey
> {
  protected abstract storage: WeakMap<any, EntryValueMap[TType]>;

  get(
    entryKey,
    nestedEntryKey?: EntryValueMap[TType] extends WeakMap<any, any>
      ? any
      : never
  ): EntryValueMap[TType] {
    return this.getInternal(this.storage, entryKey, nestedEntryKey);
  }

  has(
    entryKey,
    nestedEntryKey?: EntryValueMap[TType] extends WeakMap<any, any>
      ? any
      : never
  ): boolean {
    return this.hasInternal(this.storage, entryKey, nestedEntryKey);
  }

  set(
    entryKey,
    entryValue: EntryValueMap[TType] extends WeakMap<any, any>
      ? [any, EntryValueMap[TType]]
      : EntryValueMap[TType]
  ): void {
    this.setInternal(this.storage, entryKey, entryValue);
  }

  protected abstract getInternal(
    storage: WeakMap<any, EntryValueMap[TType]>,
    entryKey,
    nestedEntryKey: EntryValueMap[TType] extends WeakMap<any, any> ? any : never
  ): EntryValueMap[TType];

  protected abstract hasInternal(
    storage: WeakMap<any, EntryValueMap[TType]>,
    entryKey,
    nestedEntryKey: EntryValueMap[TType] extends WeakMap<any, any> ? any : never
  ): boolean;

  protected abstract setInternal(
    storage: WeakMap<any, EntryValueMap[TType]>,
    entryKey,
    entryValue: EntryValueMap[TType] extends WeakMap<any, any>
      ? [any, EntryValueMap[TType]]
      : EntryValueMap[TType]
  ): void;
}
