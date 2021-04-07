import {
  isDateConstructor,
  isDefined,
  isEmpty,
  isPrimitiveConstructor,
} from '@automapper/core';
import type { Dictionary } from '@automapper/types';
import type { ClassInstanceStorage, ClassMetadataStorage } from '../storages';
import type { Constructible } from '../types';

/**
 * Recursively instantiate a model with its metadata
 *
 * @param {ClassInstanceStorage} instanceStorage
 * @param {ClassMetadataStorage} metadataStorage
 * @param {Constructible} model
 * @param {TModel} defaultValue
 */
export function instantiate<TModel extends Dictionary<TModel>>(
  instanceStorage: ClassInstanceStorage,
  metadataStorage: ClassMetadataStorage,
  model: Constructible<TModel>,
  defaultValue?: TModel
): [TModel, unknown[]?] {
  // get the metadata of the model
  const metadata = metadataStorage.getMetadata(model);

  // instantiate a model with/without defaultValue
  const instance = defaultValue
    ? Object.assign(new model(), defaultValue)
    : new model();

  // if metadata is empty, return the instance early
  if (isEmpty(metadata) || !metadata) {
    return [instance];
  }

  // initialize a nestedConstructible with empty []
  const nestedConstructible: unknown[] = [];
  let i = metadata.length;

  // reversed loop
  while (i--) {
    // destructure
    const [key, meta, isGetterOnly] = metadata[i];

    // skip getter only completely
    if (isGetterOnly) {
      continue;
    }

    // get the value at the current key
    const valueAtKey = (instance as Record<string, unknown>)[key];

    // call the meta fn to get the metaResult of the current key
    const metaResult = meta();

    // if is String, Number, Boolean, Array, assign valueAtKey or undefined
    // null meta means this has any type or an arbitrary object, treat as primitives
    if (isPrimitiveConstructor(metaResult) || metaResult === null) {
      (instance as Record<string, unknown>)[key] = isDefined(valueAtKey, true)
        ? valueAtKey
        : undefined;
      continue;
    }

    // if is Date, assign a new Date value if valueAtKey is defined, otherwise, undefined
    if (isDateConstructor(metaResult)) {
      (instance as Record<string, unknown>)[key] = isDefined(valueAtKey)
        ? new Date(valueAtKey as number)
        : undefined;
      continue;
    }

    // This current key must be a nested model
    // push to nestedConstructible
    nestedConstructible.push([key, metaResult as Constructible]);

    // if the value at key is an array
    if (Array.isArray(valueAtKey)) {
      // loop through each value and recursively call instantiate with each value
      (instance as Record<string, unknown>)[key] = valueAtKey.map((val) => {
        const [instantiateResultItem] = instantiate(
          instanceStorage,
          metadataStorage,
          metaResult as Constructible,
          val
        );
        return instantiateResultItem;
      });
      continue;
    }

    // if value is not null/undefined
    if (isDefined(valueAtKey)) {
      // instantiate with value at key
      const [definedInstantiateResult] = instantiate(
        instanceStorage,
        metadataStorage,
        metaResult as Constructible,
        valueAtKey as Dictionary<unknown>
      );
      (instance as Record<string, unknown>)[key] = definedInstantiateResult;
      continue;
    }

    // if value is null/undefined but defaultValue is not
    // should assign straightaway
    if (isDefined(defaultValue)) {
      (instance as Record<string, unknown>)[key] = valueAtKey;
      continue;
    }

    // get depth and count of the current key on the current model
    // Eg: Foo {bar: Bar}, model here is Foo and key is bar
    const [depth, count = 0] = instanceStorage.getDepthAndCount(model, key);

    // if no depth, just instantiate with new keyword without recursive
    if (depth === 0) {
      (instance as Record<string, unknown>)[
        key
      ] = new (metaResult as Constructible)();
      continue;
    }

    // if depth equals count, meaning instantiate has run enough loop.
    // reset the count then assign with new keyword
    if (depth === count) {
      instanceStorage.resetCount(model, key);
      (instance as Record<string, unknown>)[
        key
      ] = new (metaResult as Constructible)();
      continue;
    }

    // increment the count and recursively call instantiate
    instanceStorage.setCount(model, key, isDefined(count) ? count + 1 : 1);
    const [instantiateResult] = instantiate(
      instanceStorage,
      metadataStorage,
      metaResult as Constructible
    );
    (instance as Record<string, unknown>)[key] = instantiateResult;
  }

  // after all, resetAllCount on the current model
  instanceStorage.resetAllCount(model);
  // return instance and the nestedConstructible array
  return [instance, nestedConstructible];
}
