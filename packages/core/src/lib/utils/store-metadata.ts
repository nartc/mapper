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
    for (const [
        propertyKey,
        { isGetterOnly, type, depth, isArray },
    ] of metadataList) {
        metadataMap.set(model, [
            ...(metadataMap.get(model) || []),
            [[propertyKey], type, isArray, isGetterOnly],
        ]);

        if (depth != null) {
            setRecursiveValue(
                getRecursiveDepth(mapper),
                model,
                [propertyKey],
                depth
            );
        }
    }
}
