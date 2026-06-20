import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MetadataIdentifier,
} from '../types';

// The writable keys of a destinationMetadata are fixed per mapping, but
// assertUnmappedProperties runs on every map() (per element in mapArray).
// Cache the Object.keys + getOwnPropertyDescriptor work per metadata object.
const writableKeysCache = new WeakMap<object, string[]>();

function getWritableKeys(destinationMetadata: object): string[] {
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

/**
 * Depends on implementation of strategy.createMapping
 */
export function assertUnmappedProperties<
    TDestination extends Dictionary<TDestination>
>(
    destinationObject: TDestination,
    destinationMetadata: TDestination,
    configuredKeys: string[],
    sourceIdentifier: MetadataIdentifier,
    destinationIdentifier: MetadataIdentifier,
    errorHandler: ErrorHandler
) {
    const writableKeys = getWritableKeys(destinationMetadata as object);
    const configured = new Set(configuredKeys);

    const unmappedKeys: string[] = [];
    for (let i = 0, len = writableKeys.length; i < len; i++) {
        const key = writableKeys[i];
        if (
            !configured.has(key) &&
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
