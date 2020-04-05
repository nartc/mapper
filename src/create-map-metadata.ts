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

  let i = entries.length;
  if (!i) {
    return;
  }
  while (i--) {
    const [key, metadata]: [string, any] = entries[i];
    const metadataName =
      metadata.prototype?.constructor.name || metadata.constructor.name;
    storeMetadata(model, metadataName, key, metadata);
  }
};
