import { AutoMap } from './decorators';
import { Constructible } from './types';

export class MetadataExplorer {
  private static readonly metadataTrackMap = new Map();
  private static readonly AUTOMAPPER_METADATA_FACTORY =
    '__NARTC_AUTOMAPPER_METADATA_FACTORY';

  static explore(source: Constructible, destination: Constructible): void {
    this.exploreInternal(source);
    this.exploreInternal(destination);
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
    const metadataEntries: [string, Constructible][] = Object.entries(metadata);

    if (!metadataEntries.length) {
      return;
    }

    for (const [key, value] of metadataEntries) {
      if (value == null) {
        AutoMap()(modelProto, key);
      } else {
        AutoMap(() => value)(modelProto, key);
      }
    }

    this.metadataTrackMap.set(model, 1);
  }
}
