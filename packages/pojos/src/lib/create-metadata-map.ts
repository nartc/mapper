import { pojosSymbolStorage } from './storages';

/**
 *
 * createMetadataMap('Bar', {
 *   baz: String
 * })
 *
 * createMetadataMap('Foo', {
 *   foo: String,
 *   bar: 'Bar'
 * })
 */

export function createMetadataMap(
  key: string,
  metadataOrMetadataMap,
  metadata?
) {
  const toMergeSymbol =
    typeof metadataOrMetadataMap === 'string'
      ? Symbol.for(metadataOrMetadataMap)
      : '';

  metadata =
    typeof metadataOrMetadataMap === 'string'
      ? metadata || {}
      : metadataOrMetadataMap;

  const toMergeMetadata = toMergeSymbol
    ? pojosSymbolStorage.get(toMergeSymbol)
    : [];

  const symbol = Symbol.for(key);

  const entries = Object.entries(metadata);
  if (!entries.length) {
    pojosSymbolStorage.set(symbol, toMergeMetadata);
    return;
  }

  const result = [];
  for (const [existProp, existMeta] of toMergeMetadata) {
    if (entries.some(([entryProp]) => existProp === entryProp)) {
      continue;
    }

    result.push([existProp, existMeta]);
  }

  result.push(...entries);
  pojosSymbolStorage.set(
    symbol,
    result.filter(([, meta]) => meta !== null)
  );
}
