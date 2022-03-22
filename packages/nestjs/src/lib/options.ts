import type {
    CreateMapperOptions,
    ErrorHandler,
    NamingConvention,
} from '@automapper/core';
import type { ModuleMetadata, Type } from '@nestjs/common';

export type AutomapperOptions =
    | CreateMapperOptions
    | Array<CreateMapperOptions & { name: string }>;

export interface AutomapperGlobalOptions {
    globalErrorHandler?: ErrorHandler;
    globalNamingConventions?:
        | NamingConvention
        | {
              source: NamingConvention;
              destination: NamingConvention;
          };
}

export interface AutomapperOptionsFactory {
    createAutomapperOptions():
        | Promise<CreateMapperOptions>
        | CreateMapperOptions;
}

export interface AutomapperAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useExisting?: Type<AutomapperOptionsFactory>;
    useClass?: Type<AutomapperOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<CreateMapperOptions> | CreateMapperOptions;
}
