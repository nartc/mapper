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

  for (const [key, meta] of metadata) {
    const metaResult = meta();
    if (!metaResult) {
      (instance as any)[key] = (defaultValue as any)?.[key] || undefined;
      continue;
    }

    if (Array.isArray(metaResult)) {
      (instance as any)[key] = (defaultValue as any)?.[key] || metaResult;
      continue;
    }

    if (
      metaResult.prototype.constructor.name === 'Date' ||
      metaResult.prototype.constructor.name === 'Moment'
    ) {
      (instance as any)[key] = (defaultValue as any)?.[key]
        ? new metaResult((defaultValue as any)?.[key])
        : new metaResult();
      continue;
    }

    (instance as any)[key] = instantiate(
      metaResult,
      (defaultValue as any)?.[key]
    );
  }

  return instance;
}
