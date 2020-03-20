import { metadataStorage } from '../storages';
import { Constructible } from '../types';

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
        metadataStorage.addMetadata(model, [[key, () => false]]);
        continue;
      }

      const meta = value();
      const metaName =
        meta.prototype?.constructor?.name || meta.constructor.name;
      switch (metaName) {
        case 'String':
        case 'Number':
        case 'Boolean':
          metadataStorage.addMetadata(model, [[key, () => false]]);
          break;
        case 'Array':
          metadataStorage.addMetadata(model, [[key, () => []]]);
          break;
        default:
          metadataStorage.addMetadata(model, [[key, value]]);
      }
    }

    this.metadataTrackMap.set(model, 1);
  }
}
