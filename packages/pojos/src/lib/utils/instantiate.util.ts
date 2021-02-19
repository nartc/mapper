import {
  isDateConstructor,
  isDefined,
  isEmpty,
  isPrimitiveConstructor,
} from '@automapper/core';
import type { Dictionary } from '@automapper/types';
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
  let i = metadata.length;
  while (i--) {
    const [key, meta] = metadata[i];
    const valueAtKey = (obj as Record<string, unknown>)[key];
    const metaResult = meta();

    if (isPrimitiveConstructor(metaResult) || metaResult === null) {
      (obj as Record<string, unknown>)[key] = isDefined(valueAtKey)
        ? valueAtKey
        : undefined;
      continue;
    }
    if (isDateConstructor(metaResult)) {
      (obj as Record<string, unknown>)[key] = isDefined(valueAtKey)
        ? new Date(valueAtKey as number)
        : undefined;
      continue;
    }

    if (typeof metaResult !== 'string') {
      continue;
    }

    nestedMetadataMap.push([key, metaResult]);
    if (Array.isArray(valueAtKey)) {
      (obj as Record<string, unknown>)[key] = valueAtKey.map((val) => {
        const [childObj] = instantiate(metadataStorage, metaResult, val);
        return childObj;
      });
      continue;
    }

    if (isDefined(valueAtKey)) {
      const [instantiateResult] = instantiate(
        metadataStorage,
        metaResult,
        valueAtKey as Dictionary<unknown>
      );
      (obj as Record<string, unknown>)[key] = instantiateResult;
      continue;
    }

    if (isDefined(defaultValue)) {
      (obj as Record<string, unknown>)[key] = valueAtKey;
      continue;
    }

    const [result] = instantiate(metadataStorage, metaResult);
    (obj as Record<string, unknown>)[key] = result;
  }

  return [obj, nestedMetadataMap];
}
