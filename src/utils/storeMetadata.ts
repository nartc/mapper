import { metadataStorage } from '../storages';
import { Constructible, Dict } from '../types';

export function storeMetadata<TModel extends Dict<TModel> = any>(
  model: Constructible<TModel>,
  metaName: string,
  metaKey: string,
  metaValue?: any
) {
  switch (metaName) {
    case 'String':
    case 'Number':
    case 'Boolean':
      metadataStorage.addMetadata(model, [[metaKey, () => false]]);
      break;
    case 'Date':
      metadataStorage.addMetadata(model, [[metaKey, () => Date]]);
      break;
    case 'Array':
      metadataStorage.addMetadata(model, [[metaKey, () => []]]);
      break;
    default:
      metaValue != null
        ? metadataStorage.addMetadata(model, [[metaKey, metaValue]])
        : metadataStorage.addMetadata(model, [[metaKey, () => false]]);
      break;
  }
}
