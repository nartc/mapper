import { createMapper } from '@automapper/core';
import type { Provider } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { getMapperToken } from './di';
import type { AutomapperModuleOptions } from './interfaces';

export function createAutomapperProviders(
  forRootOptions: AutomapperModuleOptions,
  logger: Logger
): Provider[] {
  const { options, globalErrorHandler, globalNamingConventions } =
    forRootOptions;

  const singular = Array.isArray(options);
  const mapperOptions = Array.isArray(options) ? options : [options];

  return mapperOptions.map(
    ({ name, errorHandler, namingConventions, pluginInitializer }) => {
      const mapper = createMapper({
        name,
        pluginInitializer,
        errorHandler: errorHandler ||
          globalErrorHandler || { handle: logger.error.bind(logger) },
        namingConventions: namingConventions || globalNamingConventions,
      });
      return {
        provide: singular ? getMapperToken() : getMapperToken(mapper.name),
        useValue: mapper,
      };
    }
  );
}
