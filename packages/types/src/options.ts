import type {
  ErrorHandler,
  MapAction,
  Mapping,
  NamingConvention,
} from './core';
import type { MapPluginInitializer } from './plugin';
import type { Dictionary } from './utils';

export interface MapOptions<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> {
  beforeMap?: MapAction<TSource, TDestination>;
  afterMap?: MapAction<TSource, TDestination>;
  extraArguments?: Record<string, any>;
}

export interface MapArrayOptions<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> extends MapOptions<TSource[], TDestination[]> {
  runPreMap?: boolean;
}

export interface CreateMapOptions<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> {
  namingConventions?:
    | NamingConvention
    | {
        source: NamingConvention;
        destination: NamingConvention;
      };
  extends?: (Mapping | undefined)[];
}

export interface CreateMapperOptions<TKey = unknown> {
  name: string;
  pluginInitializer: MapPluginInitializer<TKey>;
  namingConventions?:
    | NamingConvention
    | {
        source: NamingConvention;
        destination: NamingConvention;
      };
  errorHandler?: ErrorHandler;
}
