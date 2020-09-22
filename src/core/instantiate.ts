import { instanceStorage, metadataStorage } from '../storages';
import { Constructible, Dict } from '../types';
import { isEmpty } from '../utils';

export function instantiate<TModel extends Dict<TModel>>(
  model: Constructible<TModel>,
  defaultValue?: TModel
): TModel {
  const metadata = metadataStorage.getMetadata(model);

  const instance = (defaultValue
    ? Object.assign(new model(), defaultValue)
    : new model()) as any;
  if (isEmpty(metadata) || !metadata) {
    return instance;
  }

  let i = metadata.length;
  while (i--) {
    const [key, meta] = metadata[i];
    const value = instance[key];
    const metaResult = meta();
    if (!metaResult) {
      instance[key] = value != null ? value : undefined;
      continue;
    }

    if (Array.isArray(metaResult)) {
      instance[key] = value != null ? value : metaResult;
      continue;
    }

    if (
      metaResult.prototype.constructor.name === 'Date' ||
      metaResult.prototype.constructor.name === 'Moment'
    ) {
      instance[key] = value != null ? new metaResult(value) : new metaResult();
      continue;
    }

    if (Array.isArray(value)) {
      instance[key] = value.map(v => instantiate(metaResult, v));
      continue;
    }

    if (value == null && defaultValue != null) {
      instance[key] = value;
      continue;
    }

    if (value != null) {
      instance[key] = instantiate(metaResult, value);
      continue;
    }

    const [depth, count = 0] = instanceStorage.getDepthAndCount(model, key);

    if (depth === 0) {
      instance[key] = new metaResult();
      continue;
    }

    if (depth === count) {
      instanceStorage.resetCount(model, key);
      instance[key] = undefined;
      continue;
    }

    instanceStorage.setCount(model, key, count != null ? count + 1 : 1);
    instance[key] = instantiate(metaResult, value);
  }

  instanceStorage.resetAllCount(model);
  return instance;
}
