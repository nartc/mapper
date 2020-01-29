import { AutoMap } from './decorators';
import { Constructible, Dict } from './types';

export class MetadataExplorer {
  private static readonly metadataTrackMap = new Map();
  private static readonly AUTOMAPPER_METADATA_FACTORY =
    '__NARTC_AUTOMAPPER_METADATA_FACTORY';

  static explore<TModel extends Dict<TModel>>(
    model: Constructible<TModel>
  ): void {
    if (this.metadataTrackMap.has(model)) {
      return;
    }

    const factory = model[this.AUTOMAPPER_METADATA_FACTORY];
    if (!factory) {
      return;
    }

    const metadata = factory();
    const metadataEntries = Object.entries(metadata);

    if (!metadataEntries.length) {
      return;
    }

    for (const [key, value] of metadataEntries) {
      if (value == null) {
        AutoMap()(model, key);
      } else {
        AutoMap(() => value as Function)(model, key);
      }
    }

    this.metadataTrackMap.set(model, 1);
  }
}
