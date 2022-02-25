import type {
  ClassInstanceStorage,
  ClassMetadataStorage,
  Constructible,
} from '@automapper/classes';
import type { Dictionary } from '@automapper/core';
import {
  get,
  isDateConstructor,
  isDefined,
  isEmpty,
  isPrimitiveConstructor,
  setMutate,
} from '@automapper/core';
import { isCollection } from './is-collection.util';
import { isEntity } from './is-entity.util';

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
  let instance = defaultValue
    ? Object.assign(new model(), defaultValue)
    : new model();

  // if metadata is empty, return the instance early
  if (isEmpty(metadata) || !metadata) {
    return [instance];
  }

  let isMikro = false;
  if (isEntity(instance)) {
    try {
      instance = instance.toPOJO() as TModel;
      isMikro = true;
    } catch (e) {
      instance = instance as TModel;
    }
  }

  // initialize a nestedConstructible with empty []
  const nestedConstructible: unknown[] = [];

  for (let i = 0, metadataLen = metadata.length; i < metadataLen; i++) {
    // destructure
    const [key, meta, isGetterOnly] = metadata[i];

    // skip getter only completely
    if (isGetterOnly) {
      continue;
    }

    // get the value at the current key
    let valueAtKey = get(instance as Record<string, unknown>, key);

    if (isCollection(valueAtKey)) {
      valueAtKey = valueAtKey.getSnapshot();
    }

    // call the meta fn to get the metaResult of the current key
    const metaResult = meta();

    // push to nestedConstructible
    nestedConstructible.push([key, metaResult as Constructible]);

    // if is String, Number, Boolean, Array, assign valueAtKey or undefined
    // null meta means this has any type or an arbitrary object, treat as primitives
    if (isPrimitiveConstructor(metaResult) || metaResult === null) {
      const value = isDefined(valueAtKey, true) ? valueAtKey : undefined;
      setMutate(instance as Record<string, unknown>, key, value);
      continue;
    }

    // if is Date, assign a new Date value if valueAtKey is defined, otherwise, undefined
    if (isDateConstructor(metaResult)) {
      const value = isDefined(valueAtKey)
        ? Array.isArray(valueAtKey)
          ? [...valueAtKey]
          : new Date(valueAtKey as number)
        : undefined;
      setMutate(instance as Record<string, unknown>, key, value);
      continue;
    }

    // if the value at key is an array
    if (Array.isArray(valueAtKey)) {
      // loop through each value and recursively call instantiate with each value
      const value = valueAtKey.map((val) => {
        const [instantiateResultItem] = instantiate(
          instanceStorage,
          metadataStorage,
          metaResult as Constructible,
          val
        );
        return instantiateResultItem;
      });
      setMutate(instance as Record<string, unknown>, key, value);
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
      setMutate(
        instance as Record<string, unknown>,
        key,
        definedInstantiateResult
      );
      continue;
    }

    // if value is null/undefined but defaultValue is not
    // should assign straightaway
    if (isDefined(defaultValue)) {
      setMutate(instance as Record<string, unknown>, key, valueAtKey);
      continue;
    }

    // get depth and count of the current key on the current model
    // Eg: Foo {bar: Bar}, model here is Foo and key is bar
    const [depth, count = 0] = instanceStorage.getDepthAndCount(model, key);

    // if no depth, just instantiate with new keyword without recursive
    if (depth === 0) {
      setMutate(
        instance as Record<string, unknown>,
        key,
        new (metaResult as Constructible)()
      );
      continue;
    }

    // if depth equals count, meaning instantiate has run enough loop.
    // reset the count then assign with new keyword
    if (depth === count) {
      instanceStorage.resetCount(model, key);
      setMutate(
        instance as Record<string, unknown>,
        key,
        new (metaResult as Constructible)()
      );
      continue;
    }

    // increment the count and recursively call instantiate
    instanceStorage.setCount(model, key, isDefined(count) ? count + 1 : 1);
    const [instantiateResult] = instantiate(
      instanceStorage,
      metadataStorage,
      metaResult as Constructible
    );
    setMutate(instance as Record<string, unknown>, key, instantiateResult);
  }

  // after all, resetAllCount on the current model
  instanceStorage.resetAllCount(model);
  // return instance and the nestedConstructible array
  return [
    isMikro ? Object.assign(new model(), instance) : instance,
    nestedConstructible,
  ];
}
