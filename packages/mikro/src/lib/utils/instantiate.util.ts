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
import {Utils} from '@mikro-orm/core';
import { MikroInitializerOptions } from '../types';
import { getEntity } from './get-entity.util';

/**
 * Recursively instantiate a model with its metadata
 *
 * @param {ClassInstanceStorage} instanceStorage
 * @param {ClassMetadataStorage} metadataStorage
 * @param serializeEntity
 * @param {Constructible} model
 * @param {TModel} defaultValue
 */
export function instantiate<TModel extends Dictionary<TModel>>(
  instanceStorage: ClassInstanceStorage,
  metadataStorage: ClassMetadataStorage,
  serializeEntity: MikroInitializerOptions['serializeEntity'],
  model: Constructible<TModel>,
  defaultValue?: TModel
): [TModel, unknown[]?] {
  // get the metadata of the model
  const metadata = metadataStorage.getMetadata(model);

  // instantiate a model with/without defaultValue
  const instance = defaultValue ? getEntity(defaultValue) : {};

  // if metadata is empty, return the instance early
  if (isEmpty(metadata) || !metadata) {
    return [new model()];
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
    const valueAtKey = get(instance as Record<string, unknown>, key);

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

    // get depth and count of the current key on the current model
    // Eg: Foo {bar: Bar}, model here is Foo and key is bar
    const [depth, count = 0] = instanceStorage.getDepthAndCount(model, key);

    // if the value at key is an array
    if (Array.isArray(valueAtKey)) {
      if (depth === 0) {
        setMutate(
          instance as Record<string, unknown>,
          key,
          Utils.isCollection(valueAtKey) ? valueAtKey.getSnapshot() : valueAtKey
        );
        continue;
      }

      if (depth === count) {
        instanceStorage.resetCount(model, key);
        setMutate(
          instance as Record<string, unknown>,
          key,
          Utils.isCollection(valueAtKey) ? valueAtKey.getSnapshot() : valueAtKey
        );
        continue;
      }

      // loop through each value and recursively call instantiate with each value
      instanceStorage.setCount(model, key, count + 1);
      setMutate(
        instance as Record<string, unknown>,
        key,
        valueAtKey.map((val) => {
          return instantiate(
            instanceStorage,
            metadataStorage,
            serializeEntity,
            metaResult as Constructible,
            val
          )[0];
        })
      );
      continue;
    }

    // if value is not null/undefined
    if (isDefined(valueAtKey)) {
      if (depth === 0) {
        setMutate(
          instance as Record<string, unknown>,
          key,
          getEntity(valueAtKey)
        );
        continue;
      }

      if (depth === count) {
        instanceStorage.resetCount(model, key);
        setMutate(
          instance as Record<string, unknown>,
          key,
          getEntity(valueAtKey)
        );
        continue;
      }

      // instantiate with value at key
      instanceStorage.setCount(model, key, count + 1);
      setMutate(
        instance as Record<string, unknown>,
        key,
        instantiate(
          instanceStorage,
          metadataStorage,
          serializeEntity,
          metaResult as Constructible,
          valueAtKey as Dictionary<unknown>
        )[0]
      );
      continue;
    }

    // if value is null/undefined but defaultValue is not
    // should assign straightaway
    if (isDefined(defaultValue)) {
      setMutate(instance as Record<string, unknown>, key, valueAtKey);
      continue;
    }

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
    instanceStorage.setCount(model, key, count + 1);
    setMutate(
      instance as Record<string, unknown>,
      key,
      instantiate(
        instanceStorage,
        metadataStorage,
        serializeEntity,
        metaResult as Constructible
      )[0]
    );
  }

  // after all, resetAllCount on the current model
  instanceStorage.resetAllCount(model);
  // return instance and the nestedConstructible array
  return [
    (isDefined(defaultValue)
      ? instance
      : Object.assign(new model(), instance)) as TModel,
    nestedConstructible,
  ];
}
