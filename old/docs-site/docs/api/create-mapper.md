---
id: create-mapper
title: createMapper
sidebar_label: createMapper
---

`createMapper()` is used to create a `Mapper` object with a `CreateMapperOptions`.

```ts
createMapper(options: CreateMapperOptions): Mapper;
```

## `Mapper`

```ts
export interface Mapper<TKey = unknown> {
  name: string;

  // +2 overloads
  createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    source: TKey,
    destination: TKey,
    options?: CreateMapOptions
  ): CreateMapFluentFunction<TSource, TDestination>;

  // +2 overloads
  getMapping<TKey = unknown>(source: TKey, destination: TKey): Mapping;

  addProfile(profile): Mapper;

  // +1 overload
  map<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;

  // +1 overload
  mapAsync<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;

  // +1 overload
  mapArray<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];

  // +1 overload
  mapArrayAsync<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;

  dispose(): void;
}
```

## `CreateMapperOptions`

```ts
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
```

### Required fields

#### `name`

- Type: `string`

Name of the `Mapper`

#### `pluginInitializer`

- Type: `MapPluginInitializer` (See [`MapPluginInitializer`](#mapplugininitializer))

Plugin that the `Mapper` will be using

### Optional fields

#### `namingConventions`

- Type: `NamingConvention | { source: NamingConvention, destination: NamingConvention }`

Global naming conventions for all the `Mapping` in this `Mapper`

#### `errorHandler`

- Type: `ErrorHandler` (See [ErrorHandler](../misc/error-handler.md))

`ErrorHandler` that this `Mapper` uses

## `MapPluginInitializer`

```ts
export interface MapPluginInitializer<TKey = unknown> {
  (errorHandler: ErrorHandler): MapPlugin<TKey>;
}
```

See [`MapPlugin`](#mapplugin)

## `MapPlugin`

```ts
/**
 * How a plugin should provide
 */
export interface MapPlugin<TKey = unknown> {
  /**
   * Instruction on how a plugin should initialize a mapping for a pair of Source <> Destination
   * This method will make use of the plugin's internal storages to store information for this pair.
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   * @param options {CreateMapOptions} - options for when initialize a mapping (which is globally applied to this pair of Source <> Destination)
   */
  initializeMapping(
    source: TKey,
    destination: TKey,
    options?: CreateMapOptions
  ): Mapping;

  /**
   * Get the Mapping for a pair of Source <> Destination
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   */
  getMapping(source: TKey, destination: TKey): Mapping;

  /**
   * An optional pre-map function to prepare the source and destination before map
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   * @param sourceObj - a plain object that takes the shape of the source
   * @param destinationObj - a plain object that takes the shape of the destination
   */
  preMap?<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    source: TKey,
    destination: TKey,
    sourceObj?: TSource,
    destinationObj?: TDestination
  ): [sourceInstance: TSource, destinationInstance: TDestination];

  /**
   * Optional method to clean up the plugin's storages
   */
  dispose?(): void;
}
```
