import type {
  ErrorHandler,
  MapAction,
  Mapping,
  NamingConvention,
} from './core';
import type { MapPluginInitializer } from './plugin';
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
  pluginInitializer: MapPluginInitializer<TKey>;
  errorHandler?: ErrorHandler;
}
