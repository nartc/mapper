import type {
  ErrorHandler,
  MapAction,
  Mapping,
  NamingConvention,
} from './core';
import type { MapPlugin } from './plugin';
import type { Dictionary } from './utils';

export interface MapOptions<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  beforeMap?: MapAction<TSource, TDestination>;
  afterMap?: MapAction<TSource, TDestination>;
}

export interface CreateMapOptions<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  namingConventions?: {
    source: NamingConvention;
    destination: NamingConvention;
  };
  extends?: Mapping[];
}

export interface CreateMapperOptions<TKey = unknown> {
  name: string;
  namingConventions?: {
    source: NamingConvention;
    destination: NamingConvention;
  };
  pluginInitializer: (errorHandler: ErrorHandler) => MapPlugin<TKey>;
  errorHandle?: ErrorHandler;
}
