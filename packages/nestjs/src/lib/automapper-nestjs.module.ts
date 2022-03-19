import type {
    CreateMapperOptions,
    ErrorHandler,
    NamingConvention,
} from '@automapper/core';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { createProviders } from './create-providers';

@Module({})
export class AutomapperModule {
    private static readonly logger = new Logger('AutomapperModule');

    static forRoot(mapperOptions: CreateMapperOptions): DynamicModule;
    static forRoot(
        mapperOptions: Array<CreateMapperOptions & { name: string }>,
        globalOptions?: {
            globalErrorHandler?: ErrorHandler;
            globalNamingConventions?:
                | NamingConvention
                | {
                      source: NamingConvention;
                      destination: NamingConvention;
                  };
        }
    ): DynamicModule;
    static forRoot(
        mapperOptions:
            | CreateMapperOptions
            | Array<CreateMapperOptions & { name: string }>,
        globalOptions?: {
            globalErrorHandler?: ErrorHandler;
            globalNamingConventions?:
                | NamingConvention
                | {
                      source: NamingConvention;
                      destination: NamingConvention;
                  };
        }
    ): DynamicModule {
        const mappers = Array.isArray(mapperOptions)
            ? mapperOptions
            : [{ ...mapperOptions, name: 'default' }];

        const providers = createProviders(mappers, this.logger, globalOptions);

        return {
            module: AutomapperModule,
            global: true,
            providers,
            exports: providers,
        };
    }
}
