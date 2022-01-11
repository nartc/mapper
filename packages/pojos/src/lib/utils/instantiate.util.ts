import type { Dictionary } from '@automapper/core';
import {
  get,
  isDateConstructor,
  isDefined,
  isEmpty,
  isFileConstructor,
  isPrimitiveConstructor,
  setMutate,
} from '@automapper/core';
import { PojosMetadataStorage } from '../storages';

export function instantiate<TModel extends Dictionary<TModel>>(
  metadataStorage: PojosMetadataStorage,
  model: string,
  defaultValue?: TModel
): [TModel, unknown[]?] {
  const metadata = metadataStorage.getMetadata(model);
  const obj = Object.assign({}, defaultValue || {}) as TModel;

  if (isEmpty(metadata) || !metadata) {
    return [obj];
  }

  const nestedMetadataMap: unknown[] = [];
  for (let i = 0, metadataLen = metadata.length; i < metadataLen; i++) {
    const [key, meta] = metadata[i];
    const valueAtKey = get(obj as Record<string, unknown>, key);
    const metaResult = meta();

    nestedMetadataMap.push([key, metaResult]);

    if (
      isPrimitiveConstructor(metaResult) ||
      isFileConstructor(metaResult) ||
      metaResult === null
    ) {
      const value = isDefined(valueAtKey) ? valueAtKey : undefined;
      setMutate(obj as Record<string, unknown>, key, value);
      continue;
    }

    if (isDateConstructor(metaResult)) {
      const value = isDefined(valueAtKey)
        ? Array.isArray(valueAtKey)
          ? [...valueAtKey]
          : new Date(valueAtKey as number)
        : undefined;
      setMutate(obj as Record<string, unknown>, key, value);
      continue;
    }

    if (typeof metaResult !== 'string') {
      continue;
    }

    if (Array.isArray(valueAtKey)) {
      const value = valueAtKey.map((val) => {
        const [childObj] = instantiate(metadataStorage, metaResult, val);
        return childObj;
      });
      setMutate(obj as Record<string, unknown>, key, value);
      continue;
    }

    if (isDefined(valueAtKey)) {
      const [instantiateResult] = instantiate(
        metadataStorage,
        metaResult,
        valueAtKey as Dictionary<unknown>
      );
      setMutate(obj as Record<string, unknown>, key, instantiateResult);
      continue;
    }

    if (isDefined(defaultValue)) {
      setMutate(obj as Record<string, unknown>, key, valueAtKey);
      continue;
    }

    const [result] = instantiate(metadataStorage, metaResult);
    setMutate(obj as Record<string, unknown>, key, result);
  }

  return [obj, nestedMetadataMap];
}
