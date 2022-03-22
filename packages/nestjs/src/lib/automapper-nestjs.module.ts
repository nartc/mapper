import type { CreateMapperOptions, Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import type { DynamicModule, Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { getMapperToken } from './di/get-mapper-token';
import type {
    AutomapperAsyncOptions,
    AutomapperGlobalOptions,
    AutomapperOptions,
    AutomapperOptionsFactory,
} from './options';

@Module({})
export class AutomapperModule {
    static forRoot(mapperOptions: CreateMapperOptions): DynamicModule;
    static forRoot(
        mapperOptions: Array<CreateMapperOptions & { name: string }>,
        globalOptions?: AutomapperGlobalOptions
    ): DynamicModule;
    static forRoot(
        mapperOptions: AutomapperOptions,
        globalOptions?: AutomapperGlobalOptions
    ): DynamicModule {
        const mappers = Array.isArray(mapperOptions)
            ? mapperOptions
            : [{ ...mapperOptions, name: 'default' }];

        const providers = this.createProviders(mappers, globalOptions);

        return {
            module: AutomapperModule,
            global: true,
            providers,
            exports: providers,
        };
    }

    static forRootAsync(
        asyncMapperOptions: AutomapperAsyncOptions
    ): DynamicModule;
    static forRootAsync(
        asyncMapperOptions: Array<AutomapperAsyncOptions & { name: string }>,
        globalOptions?: AutomapperGlobalOptions
    ): DynamicModule;
    static forRootAsync(
        asyncMapperOptions:
            | AutomapperAsyncOptions
            | Array<AutomapperAsyncOptions & { name: string }>,
        globalOptions?: AutomapperGlobalOptions
    ): DynamicModule {
        if (!Array.isArray(asyncMapperOptions)) {
            asyncMapperOptions = [{ ...asyncMapperOptions, name: 'default' }];
        }

        const providers = asyncMapperOptions.flatMap((option) =>
            this.createProvider(option, globalOptions)
        );

        return {
            module: AutomapperModule,
            global: true,
            providers,
            exports: providers,
            imports:
                asyncMapperOptions.flatMap((option) => option.imports || []) ||
                [],
        };
    }

    private static createProviders(
        mapperOptions: Array<CreateMapperOptions & { name: string }>,
        globalOptions?: AutomapperGlobalOptions
    ): Provider[] {
        return mapperOptions.map(
            ({
                name,
                namingConventions,
                strategyInitializer,
                errorHandler,
            }) => {
                const mapper = createMapper({
                    strategyInitializer,
                    namingConventions:
                        namingConventions ||
                        globalOptions?.globalNamingConventions,
                    errorHandler:
                        errorHandler || globalOptions?.globalErrorHandler,
                });

                return {
                    provide:
                        name === 'default'
                            ? getMapperToken()
                            : getMapperToken(name),
                    useValue: mapper,
                };
            }
        );
    }

    private static createProvider(
        asyncMapperOptions: AutomapperAsyncOptions & { name: string },
        globalOptions?: AutomapperGlobalOptions
    ): Provider[] {
        if (asyncMapperOptions.useExisting || asyncMapperOptions.useFactory) {
            return [
                this.createMapperProvider(asyncMapperOptions, globalOptions),
            ];
        }

        return [
            this.createMapperProvider(asyncMapperOptions, globalOptions),
            {
                provide: asyncMapperOptions.useClass!,
                useClass: asyncMapperOptions.useClass!,
            },
        ];
    }

    private static createMapperProvider(
        asyncMapperOptions: AutomapperAsyncOptions & { name: string },
        globalOptions?: AutomapperGlobalOptions
    ): Provider {
        const mapperToken =
            asyncMapperOptions.name === 'default'
                ? getMapperToken()
                : getMapperToken(asyncMapperOptions.name);

        if (asyncMapperOptions.useFactory) {
            return {
                provide: mapperToken,
                useFactory: async (...args) => {
                    const mapperOptions = await asyncMapperOptions.useFactory!(
                        ...args
                    );

                    return this.createMapper(mapperOptions, globalOptions);
                },
                inject: asyncMapperOptions.inject || [],
            };
        }

        return {
            provide: mapperToken,
            useFactory: async (factory: AutomapperOptionsFactory) => {
                const mapperOptions = await factory.createAutomapperOptions();
                return this.createMapper(mapperOptions, globalOptions);
            },
            inject: [
                asyncMapperOptions.useExisting! || asyncMapperOptions.useClass!,
            ],
        };
    }

    private static createMapper(
        mapperOptions: CreateMapperOptions,
        globalOptions?: AutomapperGlobalOptions
    ): Mapper {
        return createMapper({
            strategyInitializer: mapperOptions.strategyInitializer,
            errorHandler:
                mapperOptions.errorHandler || globalOptions?.globalErrorHandler,
            namingConventions:
                mapperOptions.namingConventions ||
                globalOptions?.globalNamingConventions,
        });
    }
}
