import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MetadataIdentifier,
} from '../types';

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
    const unmappedKeys = Object.keys(destinationMetadata).reduce(
        (result, key) => {
            const isOnDestination = key in destinationObject;
            const isAlreadyConfigured = configuredKeys.some(
                (configuredKey) => configuredKey === key
            );
            const isWritable =
                Object.getOwnPropertyDescriptor(destinationMetadata, key)
                    ?.writable === true;
            if (
                !isAlreadyConfigured &&
                !isOnDestination &&
                isWritable &&
                destinationObject[key as keyof typeof destinationObject] ===
                    undefined
            ) {
                result.push(key);
            }
            return result;
        },
        [] as string[]
    );

    if (unmappedKeys.length) {
        const parentInfo = `${
            (sourceIdentifier as Constructor)['name'] ?? sourceIdentifier
        } -> ${
            (destinationIdentifier as Constructor)['name'] ??
            destinationIdentifier
        }`;
        errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
    }
}
