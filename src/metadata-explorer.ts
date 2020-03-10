import { Constructible, Dict, MetadataMapList } from './types';
import { _getProto, _isEmpty } from './utils';

export class MetadataExplorer {
  private static readonly metadataTrackMap = new Map();
  private static readonly AUTOMAPPER_METADATA_FACTORY =
    '__NARTC_AUTOMAPPER_METADATA_FACTORY';

  static explore(source: Constructible, destination: Constructible): void {
    this.exploreInternal(source);
    this.exploreInternal(destination);
  }

  static exploreMany(...models: Constructible[]): void {
    for (const model of models) {
      this.exploreInternal(model);
    }
  }

  private static exploreInternal(model: Constructible): void {
    const modelProto = model.prototype || null;

    if (!modelProto) {
      return;
    }

    if (this.metadataTrackMap.has(model)) {
      return;
    }

    const factory = model[this.AUTOMAPPER_METADATA_FACTORY];
    if (!factory) {
      return;
    }

    const metadata = factory();
    const metadataEntries: [string, () => any][] = Object.entries(metadata);

    if (!metadataEntries.length) {
      return;
    }

    for (const [key, value] of metadataEntries) {
      if (!value) {
        metadataManager.addMetadata(model.prototype, [[key, () => false]]);
        continue;
      }

      const meta = value();
      const metaName =
        meta.prototype?.constructor?.name || meta.constructor.name;
      switch (metaName) {
        case 'String':
        case 'Number':
        case 'Boolean':
          metadataManager.addMetadata(model.prototype, [[key, () => false]]);
          break;
        case 'Array':
          metadataManager.addMetadata(model.prototype, [[key, () => []]]);
          break;
        default:
          metadataManager.addMetadata(model.prototype, [[key, value]]);
      }
    }

    this.metadataTrackMap.set(model, 1);
  }
}

class MetadataManager {
  private _metadataMap = new Map<any, MetadataMapList>();

  getMetadata<TModel extends Dict<TModel> = any>(
    model: TModel
  ): MetadataMapList<TModel> {
    return this._metadataMap.get(model) as MetadataMapList<TModel>;
  }

  addMetadata<TModel extends Dict<TModel> = any>(
    model: TModel,
    metadata: MetadataMapList<TModel>
  ) {
    const existingMetadata = this._metadataMap.get(model) || [];
    const proto = _getProto(model);
    const existingProtoMetadata = proto
      ? this._metadataMap.get(proto) || []
      : [];

    this._metadataMap.set(model, [
      ...existingProtoMetadata,
      ...existingMetadata,
      ...metadata,
    ]);
  }

  dispose() {
    this._metadataMap.clear();
  }
}

const metadataManager = new MetadataManager();
export { metadataManager };

export function instantiate<TModel extends Dict<TModel>>(
  model: Constructible<TModel>,
  defaultValue: TModel = new model()
): TModel {
  const metadata = metadataManager.getMetadata(model.prototype as TModel);

  if (_isEmpty(metadata) || !metadata) {
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
