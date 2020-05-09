export abstract class NestStorage<
  TKey extends object = any,
  TValue = unknown,
  TNestedMap extends Map<any, TValue> | WeakMap<TKey, TValue> = any
> {
  protected storage: WeakMap<TKey, TNestedMap>;

  protected constructor() {
    this.storage = new WeakMap<TKey, TNestedMap>();
  }

  set(key: TKey, nestedKey: any, value: TValue): void {
    this.setInternal(this.storage, key, nestedKey, value);
  }

  get(key: TKey, nestedKey: any): TValue | undefined {
    return this.getInternal(this.storage, key, nestedKey);
  }

  has(key: TKey, nestedKey: any): boolean {
    return this.hasInternal(this.storage, key, nestedKey);
  }

  protected getInternal<
    TKey extends object = any,
    TValue = unknown,
    TNestedMap extends Map<any, TValue> | WeakMap<TKey, TValue> = any
  >(
    storage: WeakMap<TKey, TNestedMap>,
    key: TKey,
    nestedKey: any
  ): TValue | undefined {
    return storage.get(key)?.get(nestedKey);
  }

  protected hasInternal<
    TKey extends object = any,
    TValue = unknown,
    TNestedMap extends Map<any, TValue> | WeakMap<TKey, TValue> = any
  >(storage: WeakMap<TKey, TNestedMap>, key: TKey, nestedKey: any): boolean {
    return storage.get(key)?.has(nestedKey) || false;
  }

  protected abstract setInternal<TKey extends object = any, TValue = unknown>(
    storage: WeakMap<TKey, any>,
    key: TKey,
    nestedKey: any,
    value: TValue
  ): void;

  protected abstract dispose(): void;
}

export abstract class WeakMapNestedStorage<
  TKey extends object = any,
  TValue = unknown
> extends NestStorage<TKey, TValue, WeakMap<TKey, TValue>> {
  protected constructor() {
    super();
  }

  dispose(): void {
    this.storage = new WeakMap<TKey, WeakMap<TKey, TValue>>();
  }

  protected setInternal<TKey extends object = any, TValue = unknown>(
    storage: WeakMap<TKey, WeakMap<TKey, TValue>>,
    key: TKey,
    nestedKey: TKey,
    value: TValue
  ) {
    if (!storage.has(key)) {
      storage.set(key, new WeakMap<TKey, TValue>().set(nestedKey, value));
      return;
    }

    if (!this.hasInternal(storage, key, nestedKey)) {
      storage.get(key)?.set(nestedKey, value);
    }
  }
}

export abstract class MapNestedStorage<
  TKey extends object = any,
  TValue = unknown
> extends NestStorage<TKey, TValue, Map<any, TValue>> {
  protected constructor() {
    super();
  }

  dispose(): void {
    this.storage = new WeakMap<TKey, Map<any, TValue>>();
  }

  protected setInternal<TKey extends object = any, TValue = unknown>(
    storage: WeakMap<TKey, Map<any, TValue>>,
    key: TKey,
    nestedKey: unknown,
    value: TValue
  ) {
    if (!storage.has(key)) {
      storage.set(key, new Map<any, TValue>().set(nestedKey, value));
      return;
    }

    if (!this.hasInternal(storage, key, nestedKey)) {
      storage.get(key)?.set(nestedKey, value);
    }
  }
}
