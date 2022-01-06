import type { Dictionary, ErrorHandler } from '../types';

/**
 * Depends on implementation of plugin.initializeMapping
 */
export function assertUnmappedProperties<
  TDestination extends Dictionary<TDestination> = any
>(
  destination: TDestination,
  configuredKeys: string[],
  sourceKey: unknown,
  destinationKey: unknown,
  errorHandler: ErrorHandler
) {
  const unmappedKeys = Object.entries(destination).reduce(
    (result, [destinationKey, destinationValue]) => {
      const isAlreadyConfigured = configuredKeys.some(
        (configuredKey) => configuredKey === destinationKey
      );
      const isWritable =
        Object.getOwnPropertyDescriptor(destination, destinationKey)
          .writable === true;
      if (
        !isAlreadyConfigured &&
        isWritable &&
        destinationValue === undefined
      ) {
        result.push(destinationKey);
      }
      return result;
    },
    []
  );

  if (unmappedKeys.length) {
    const parentInfo = `${sourceKey['name'] ?? sourceKey} -> ${
      destinationKey['name'] ?? destinationKey
    }`;
    errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
  }
}
