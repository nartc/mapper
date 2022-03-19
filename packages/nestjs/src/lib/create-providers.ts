import type { CreateMapperOptions } from '@automapper/core';
import { createMapper, ErrorHandler, NamingConvention } from '@automapper/core';
import { Logger, Provider } from '@nestjs/common';
import { getMapperToken } from './di/get-mapper-token';

export function createProviders(
    mapperOptions: Array<CreateMapperOptions & { name: string }>,
    logger: Logger,
    globalOptions?: {
        globalErrorHandler?: ErrorHandler;
        globalNamingConventions?:
            | NamingConvention
            | {
                  source: NamingConvention;
                  destination: NamingConvention;
              };
    }
): Provider[] {
    if (mapperOptions.length === 1) {
        const { strategyInitializer, errorHandler, namingConventions } =
            mapperOptions[0];
        const mapper = createMapper({
            strategyInitializer,
            errorHandler: errorHandler || globalOptions?.globalErrorHandler,
            namingConventions:
                namingConventions || globalOptions?.globalNamingConventions,
        });

        return [{ provide: getMapperToken(), useValue: mapper }];
    }

    return mapperOptions.map(
        ({ name, namingConventions, strategyInitializer, errorHandler }) => {
            const mapper = createMapper({
                strategyInitializer,
                namingConventions:
                    namingConventions || globalOptions?.globalNamingConventions,
                errorHandler: errorHandler || globalOptions?.globalErrorHandler,
            });

            return { provide: getMapperToken(name), useValue: mapper };
        }
    );
}
