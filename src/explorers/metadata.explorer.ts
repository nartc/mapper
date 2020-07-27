import { Constructible } from '../types';
import { storeMetadata } from '../utils';

export class MetadataExplorer {
  private static readonly metadataTrackMap = new Map();
  private static readonly AUTOMAPPER_METADATA_FACTORY =
    '__NARTC_AUTOMAPPER_METADATA_FACTORY';

  static explore(source: Constructible, destination: Constructible): void {
    this.exploreInternal(source);
    this.exploreInternal(destination);
  }

  private static exploreInternal(model: Constructible): void {
    if (!model.prototype || this.metadataTrackMap.has(model)) {
      return;
    }

    const factory = model[this.AUTOMAPPER_METADATA_FACTORY];
    if (!factory) {
      return;
    }

    const metadata = factory();
    const metadataEntries: [string, () => any][] = Object.entries(metadata);
    let i = metadataEntries.length;
    if (!i) {
      return;
    }

    while (i--) {
      const [key, value] = metadataEntries[i];
      if (!value) {
        storeMetadata(model, 'String', key);
        continue;
      }

      const meta = value();
      const metaName =
        meta.prototype?.constructor?.name || meta.constructor.name;
      storeMetadata(model, metaName, key, meta);
    }

    this.metadataTrackMap.set(model, 1);
  }
}
