import type { DynamicModule } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
import { createAutomapperProviders } from './create-automapper-providers.util';
import type { AutomapperModuleOptions } from './interfaces';

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
      global: true,
      providers,
      exports: providers,
    };
  }
}
