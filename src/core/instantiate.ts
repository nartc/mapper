import { metadataStorage } from '../storages';
import { instantiateDepthStorage } from '../storages/instantiate-depth.storage';
import { Constructible, Dict } from '../types';
import { isEmpty } from '../utils';

export function instantiate<TModel extends Dict<TModel>>(
  model: Constructible<TModel>,
  defaultValue?: TModel,
  parent?: Constructible
): TModel {
  const metadata = metadataStorage.getMetadata(model);

  const instance = defaultValue
    ? Object.assign(new model(), defaultValue)
    : new model();
  if (isEmpty(metadata) || !metadata) {
    return instance;
  }

  for (let i = 0, len = metadata.length; i < len; i++) {
    const [key, meta] = metadata[i];
    const value = (defaultValue as any)?.[key];
    const metaResult = meta();
    if (!metaResult) {
      (instance as any)[key] = value != null ? value : undefined;
      continue;
    }

    if (Array.isArray(metaResult)) {
      (instance as any)[key] = value != null ? value : metaResult;
      continue;
    }

    if (
      metaResult.prototype.constructor.name === 'Date' ||
      metaResult.prototype.constructor.name === 'Moment'
    ) {
      (instance as any)[key] =
        value != null ? new metaResult(value) : new metaResult();
      continue;
    }

    if (Array.isArray(value)) {
      (instance as any)[key] = value.map(v => instantiate(metaResult, v));
      continue;
    }

    if (parent == null || metaResult !== parent || value != null) {
      instance[key as keyof TModel] = instantiate(metaResult, value, model);
      continue;
    }

    const [depth, count] = instantiateDepthStorage.getDepthAndCount(model, key);

    if (depth != null && !!count) {
      if (depth === count) {
        instantiateDepthStorage.resetCount(model, key);
        continue;
      }
    }

    if (depth === 0) {
      continue;
    }

    instantiateDepthStorage.setCount(model, key, count != null ? count + 1 : 1);
    instance[key as keyof TModel] = instantiate(metaResult, value, model);
  }

  return instance;
}
