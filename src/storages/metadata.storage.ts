import { Constructible, Dict, MetadataMap, MetadataMapList } from '../types';

/**
 * Internal MetadataStorage class
 *
 * @private
 */
class MetadataStorage {
  private _metadataMap = new Map<Constructible, MetadataMapList>();

  getMetadata<TModel extends Dict<TModel> = any>(
    model: Constructible<TModel>
  ): MetadataMapList<TModel> {
    return this._metadataMap.get(model) as MetadataMapList<TModel>;
  }

  getMetadataForKey<TModel extends Dict<TModel> = any>(
    model: Constructible<TModel>,
    key: keyof TModel
  ): MetadataMap<TModel> | undefined {
    return this.getMetadata(model).find(([metaKey]) => metaKey === key);
  }

  addMetadata<TModel extends Dict<TModel> = any>(
    model: Constructible<TModel>,
    metadata: MetadataMapList<TModel>
  ) {
    const existingMetadata = this._metadataMap.get(model) || [];
    const proto = Object.getPrototypeOf(model);
    const existingProtoMetadata = proto
      ? this._metadataMap.get(proto) || []
      : [];

    const existingMeta = [...existingProtoMetadata, ...existingMetadata];

    for (let [existKey] of existingMeta) {
      const [key] = metadata[0];
      if (key === existKey) {
        return;
      }
    }

    this._metadataMap.set(model, [...existingMeta, ...metadata]);
  }
}

export const metadataStorage = new MetadataStorage();
