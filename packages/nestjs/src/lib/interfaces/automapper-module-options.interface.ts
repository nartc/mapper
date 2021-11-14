import type {
  CreateMapperOptions,
  ErrorHandler,
  NamingConvention,
} from '@automapper/types';

/**
 * Options for AutomapperModule.forRoot()
 */
export interface AutomapperModuleOptions {
  /**
   * An array of CreateMapperOptions to create multiple mappers
   */
  options: CreateMapperOptions | CreateMapperOptions[];
  /**
   * Global ErrorHandler to pass to all mappers
   */
  globalErrorHandler?: ErrorHandler;
  /**
   * Global NamingConventions to pass to all mappers
   */
  globalNamingConventions?:
    | NamingConvention
    | {
        source: NamingConvention;
        destination: NamingConvention;
      };
  /**
   * Set to true if you want to use the default Mapper token for when only one mapper is setup with forRoot
   * @deprecated
   * @default false
   */
  singular?: boolean;
}
