import { metadataStorage } from '../storages';
import { Constructible, Dict } from '../types';
import { isEmpty } from '../utils';

export function instantiate<TModel extends Dict<TModel>>(
  model: Constructible<TModel>,
  defaultValue: TModel = new model()
): TModel {
  const metadata = metadataStorage.getMetadata(model);

  if (isEmpty(metadata) || !metadata) {
    return defaultValue;
  }

  const instance = new model();

  for (let i = 0, len = metadata.length; i < len; i++) {
    const [key, meta] = metadata[i];
    const value = (defaultValue as any)?.[key];
    const metaResult = meta();
    if (!metaResult) {
      (instance as any)[key] = value || undefined;
      continue;
    }

    if (Array.isArray(metaResult)) {
      (instance as any)[key] = value || metaResult;
      continue;
    }

    if (
      metaResult.prototype.constructor.name === 'Date' ||
      metaResult.prototype.constructor.name === 'Moment'
    ) {
      (instance as any)[key] = value ? new metaResult(value) : new metaResult();
      continue;
    }

    if (Array.isArray(value)) {
      (instance as any)[key] = value.map(v => instantiate(metaResult, v));
      return instance;
    }

    (instance as any)[key] = instantiate(metaResult, value);
  }

  return instance;
}
