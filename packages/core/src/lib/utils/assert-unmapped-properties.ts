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

    const sourceText = getTextFromIdentifier(sourceIdentifier);
    const destinationText = getTextFromIdentifier(destinationIdentifier);

    if (unmappedKeys.length) {
        const parentInfo = `${sourceText} -> ${destinationText}`;
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
