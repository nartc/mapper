import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import type { AutomapperModuleOptions } from './interfaces';
import { createAutomapperProviders } from './utils';

@Global()
@Module({})
export class AutomapperModule {
  private static readonly logger = new Logger(AutomapperModule.name);

  static forRoot(forRootOptions: AutomapperModuleOptions): DynamicModule {
    const providers = createAutomapperProviders(forRootOptions, this.logger);

    return {
      module: AutomapperModule,
      providers,
      exports: providers,
    };
  }
}
