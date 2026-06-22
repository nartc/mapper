import { getMetadataMap, getRecursiveDepth } from '../symbols';
import type { Mapper, MetadataIdentifier, MetadataList } from '../types';
import { isDefined } from './is-defined';
import { setRecursiveValue } from './recursion';

export function storeMetadata(
    mapper: Mapper,
    model: MetadataIdentifier,
    metadataList: MetadataList
) {
    if (!isDefined(metadataList)) return;
    const metadataMap = getMetadataMap(mapper);
    if (metadataMap.has(model)) return;

    // Build the stored list once (push in place) instead of spreading the whole
    // accumulated array per property — that was O(P^2) per createMap. The
    // `has(model)` guard above guarantees there is no existing entry to seed.
    const list: NonNullable<ReturnType<typeof metadataMap.get>> = [];
    for (const [
        propertyKey,
        { isGetterOnly, type, depth, isArray },
    ] of metadataList) {
        list.push([[propertyKey], type, isArray, isGetterOnly]);

        if (depth != null) {
            setRecursiveValue(
                getRecursiveDepth(mapper),
                model,
                [propertyKey],
                depth
            );
        }
    }
    metadataMap.set(model, list);
}
