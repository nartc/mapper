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
        let source = sourceIdentifier.toString();
        let destination = destinationIdentifier.toString();

        if ((sourceIdentifier as Constructor)['name']) {
            source = (sourceIdentifier as Constructor)['name'];
        }

        if ((destinationIdentifier as Constructor)['name']) {
            destination = (destinationIdentifier as Constructor)['name'];
        }

        const parentInfo = `${source} -> ${destination}`;
        errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
    }
}
