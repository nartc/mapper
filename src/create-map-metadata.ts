import {
  Constructible,
  CreateMapMetadataFunction,
  Dict,
  MetadataOptions,
} from './types';
import { storeMetadata } from './utils';

export const createMapMetadata: CreateMapMetadataFunction = <
  TModel extends Dict<TModel> = any
>(
  model: Constructible<TModel>,
  metadataOptions: MetadataOptions<TModel>
) => {
  const entries = Object.entries(metadataOptions);
  const len = entries.length;
  if (!len) {
    return;
  }

  for (let i = 0; i < len; i++) {
    const [key, metadata]: [string, any] = entries[i];
    const metadataName =
      metadata.prototype?.constructor.name || metadata.constructor.name;
    storeMetadata(model, metadataName, key, metadata);
  }
};
