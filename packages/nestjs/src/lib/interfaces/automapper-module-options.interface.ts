import type {
  CreateMapperOptions,
  ErrorHandler,
  NamingConvention,
} from '@automapper/types';

export interface AutomapperModuleOptions {
  options: CreateMapperOptions[];
  globalErrorHandler?: ErrorHandler;
  globalNamingConventions?: {
    source: NamingConvention;
    destination: NamingConvention;
  };
  singular?: boolean;
}
