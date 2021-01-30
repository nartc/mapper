import { isDefined, isEmpty } from '@automapper/core';
import type { Dictionary } from '@automapper/types';
import { PojosMetadataStorage } from '../storages';
import { isDateConstructor } from './is-date-constructor.util';
import { isPrimitiveConstructor } from './is-primitive-constructor.util';

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

  const nestedMetadataMap = [];
  let i = metadata.length;
  while (i--) {
    const [key, meta] = metadata[i];
    const valueAtKey = obj[key];
    const metaResult = meta();

    if (isPrimitiveConstructor(metaResult)) {
      obj[key] = isDefined(valueAtKey) ? valueAtKey : undefined;
      continue;
    }
    if (isDateConstructor(metaResult)) {
      obj[key] = isDefined(valueAtKey) ? new Date(valueAtKey) : new Date();
      continue;
    }

    if (typeof metaResult !== 'string') {
      continue;
    }

    nestedMetadataMap.push([key, metaResult]);
    if (Array.isArray(valueAtKey)) {
      obj[key] = valueAtKey.map((val) => {
        const [childObj] = instantiate(metadataStorage, metaResult, val);
        return childObj;
      });
      continue;
    }

    if (isDefined(valueAtKey)) {
      const [instantiateResult] = instantiate(
        metadataStorage,
        metaResult,
        valueAtKey
      );
      obj[key] = instantiateResult;
      continue;
    }

    if (isDefined(defaultValue)) {
      obj[key] = valueAtKey;
      continue;
    }

    const [result] = instantiate(metadataStorage, metaResult);
    obj[key] = result;
  }

  return [obj, nestedMetadataMap];
}
