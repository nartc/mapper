import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { createAutomapperProviders } from './create-automapper-providers.util';
import type { AutomapperModuleOptions } from './interfaces';

@Global()
@Module({})
export class AutomapperModule {
  private static readonly logger = new Logger(AutomapperModule.name);

  /**
   *
   * @param {AutomapperModuleOptions} forRootOptions
   */
  static forRoot(forRootOptions: AutomapperModuleOptions): DynamicModule {
    const providers = createAutomapperProviders(forRootOptions, this.logger);

    return {
      module: AutomapperModule,
      providers,
      exports: providers,
    };
  }
}
