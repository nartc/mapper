import type {
    CreateMapperOptions,
    ErrorHandler,
    NamingConventionInput,
} from '@automapper/core';
import type { ModuleMetadata, Type } from '@nestjs/common';

export type AutomapperOptions =
    | CreateMapperOptions
    | Array<CreateMapperOptions & { name: string }>;

export interface AutomapperGlobalOptions {
    globalErrorHandler?: ErrorHandler;
    globalNamingConventions?: NamingConventionInput;
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
