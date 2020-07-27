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
    const metadataMapList = this._metadataMap.get(model) as MetadataMapList<
      TModel
    >;
    let i = metadataMapList?.length || 0;

    if (!i) {
      const proto = Object.getPrototypeOf(model);
      return proto ? this.getMetadata(proto) : metadataMapList;
    }

    const result: MetadataMapList<TModel> = [];
    while (i--) {
      const [key] = metadataMapList[i];
      if (result.some(([metaKey]) => metaKey === key)) {
        continue;
      }
      result.push(metadataMapList[i]);
    }
    return result;
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
    const existingProtoMetadata =
      proto && !!proto.name ? this._metadataMap.get(proto) || [] : [];

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
