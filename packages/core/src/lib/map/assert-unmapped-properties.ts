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
  const unmappedKeys = Object.keys(destination).filter((destinationKey) => {
    const isAlreadyConfigured = configuredKeys.some(
      (configuredKey) => configuredKey === destinationKey
    );
    const isWritable =
      Object.getOwnPropertyDescriptor(destination, destinationKey).writable ===
      true;
    return !isAlreadyConfigured && isWritable;
  });

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
