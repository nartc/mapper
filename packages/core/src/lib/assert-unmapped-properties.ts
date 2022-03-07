import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MetadataIdentifier,
} from './types';

/**
 * Depends on implementation of plugin.initializeMapping
 */
export function assertUnmappedProperties<
    TDestination extends Dictionary<TDestination>
>(
    destinationObject: TDestination,
    configuredKeys: string[],
    sourceIdentifier: MetadataIdentifier,
    destinationIdentifier: MetadataIdentifier,
    errorHandler: ErrorHandler
) {
    const unmappedKeys = Object.entries(destinationObject).reduce(
        (result, [key, value]) => {
            const isAlreadyConfigured = configuredKeys.some(
                (configuredKey) => configuredKey === key
            );
            const isWritable =
                Object.getOwnPropertyDescriptor(destinationObject, key)
                    ?.writable === true;
            if (!isAlreadyConfigured && isWritable && value === undefined) {
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
