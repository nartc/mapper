import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MetadataIdentifier,
} from '../types';

// The writable keys of a destinationMetadata are fixed per mapping. Cache the
// Object.keys + getOwnPropertyDescriptor work per metadata object (shared across
// mappings that target the same destination).
const writableKeysCache = new WeakMap<object, string[]>();

export function getWritableKeys(destinationMetadata: object): string[] {
    let keys = writableKeysCache.get(destinationMetadata);
    if (keys === undefined) {
        keys = Object.keys(destinationMetadata).filter(
            (key) =>
                Object.getOwnPropertyDescriptor(destinationMetadata, key)
                    ?.writable === true
        );
        writableKeysCache.set(destinationMetadata, keys);
    }
    return keys;
}

// Compile-time half: the writable destination keys this mapping does NOT
// configure. Computed once per mapping at createMap (buildMapPlan) and hung on
// the compiled plan, so map() never rebuilds a `new Set(configuredKeys)` nor
// re-scans the full writable-key list on every call / every mapArray element.
// Per-mapping, NOT cached on the metadata alone: two mappings can share a
// destination-metadata object yet configure different keys.
export function computeUnmappedCandidateKeys(
    destinationMetadata: object,
    configuredKeys: string[]
): string[] {
    const writableKeys = getWritableKeys(destinationMetadata);
    const configured = new Set(configuredKeys);

    const candidates: string[] = [];
    for (let i = 0, len = writableKeys.length; i < len; i++) {
        const key = writableKeys[i];
        if (!configured.has(key)) {
            candidates.push(key);
        }
    }
    return candidates;
}

/**
 * Runtime half: of the precomputed unmapped-candidate keys, report those the
 * mapping left unpopulated (absent from the destination AND undefined). Runs on
 * every map() (per element in mapArray); the candidate list is precomputed at
 * createMap so this is only a per-key presence check.
 *
 * Depends on implementation of strategy.createMapping
 */
export function assertUnmappedProperties<
    TDestination extends Dictionary<TDestination>
>(
    destinationObject: TDestination,
    unmappedCandidateKeys: string[],
    sourceIdentifier: MetadataIdentifier,
    destinationIdentifier: MetadataIdentifier,
    errorHandler: ErrorHandler
) {
    if (unmappedCandidateKeys.length === 0) {
        return;
    }

    const unmappedKeys: string[] = [];
    for (let i = 0, len = unmappedCandidateKeys.length; i < len; i++) {
        const key = unmappedCandidateKeys[i];
        if (
            !(key in destinationObject) &&
            destinationObject[key as keyof typeof destinationObject] ===
                undefined
        ) {
            unmappedKeys.push(key);
        }
    }

    if (unmappedKeys.length) {
        const parentInfo = `${getTextFromIdentifier(
            sourceIdentifier
        )} -> ${getTextFromIdentifier(destinationIdentifier)}`;
        errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
    }
}

function getTextFromIdentifier(identifier: MetadataIdentifier): string {
    let text = identifier.toString();

    if ((identifier as Constructor).name) {
        text = (identifier as Constructor).name;
    }

    return text;
}
