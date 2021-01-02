import { createMapper } from '@automapper/core';
import type { Provider } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { getMapperToken } from './di';
import type { AutomapperModuleOptions } from './interfaces';

export function createAutomapperProviders(
  forRootOptions: AutomapperModuleOptions,
  logger: Logger
): Provider[] {
  const {
    options,
    globalErrorHandler,
    globalNamingConventions,
    singular = false,
  } = forRootOptions;

  if (singular) {
    if (options.length > 1) {
      const error =
        'singular cannot be set to true when you have more than one plugin';
      logger.error(error);
      throw new Error(error);
    }

    const [
      { name, namingConventions, errorHandler, pluginInitializer },
    ] = options;
    const mapper = createMapper({
      name,
      pluginInitializer,
      errorHandler: errorHandler ||
        globalErrorHandler || { handle: logger.error.bind(logger) },
      namingConventions: namingConventions || globalNamingConventions,
    });

    return [
      {
        provide: getMapperToken(),
        useValue: mapper,
      },
    ];
  }

  return options.map(
    ({ name, errorHandler, namingConventions, pluginInitializer }) => {
      const mapper = createMapper({
        name,
        pluginInitializer,
        errorHandler: errorHandler ||
          globalErrorHandler || { handle: logger.error.bind(logger) },
        namingConventions: namingConventions || globalNamingConventions,
      });
      return {
        provide: getMapperToken(mapper.name),
        useValue: mapper,
      };
    }
  );
}
