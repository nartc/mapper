import type { ErrorHandler, Mapping } from '@automapper/types';

export function mappingNullCheck(
  mapping: Mapping | undefined,
  errorHandler: ErrorHandler,
  source: unknown,
  destination: unknown
): void {
  if (mapping == null) {
    const errorMessage = `Mapping is not found for ${source} and ${destination}`;
    errorHandler.handle(errorMessage);
    throw new Error(errorMessage);
  }
}
