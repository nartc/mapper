---
id: create-plugin
title: Create plugin
sidebar_label: Create plugin
---

## Responsibilities

In AutoMapper TypeScript, a plugin will have the following responsibilities:

- Provide metadata storing mechanism. In order for AutoMapper to work _automatically_ in some manner, metadata of the models need to be stored before any `Mapping` is initialized.
- Since the metadata is stored on the plugin, the plugin also needs to provide a way to instantiate a model with the stored metadata.

  - To explain this further, think of a TS/ES6 Class.

  ```ts
  class Class {
    foo: string;
    bar: number;
  }
  ```

  When we invoke `new Class()`, this is called instantiation. For this case, we'd get an empty `Class {}` without either `foo` or `bar`. AutoMapper won't work with this. Plugin's instantiation needs to instantiate the model with the metadata so we'd get: `Class { foo: undefined, bar: undefined }`

- Provide mapping storing mechanism.
- Since mapping is stored on the plugin side, plugin needs to provide a way to retrieve the mapping for a particular pair of models.

## AutoMapper Plugin

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

An AutoMapper plugin is just a `MapPluginInitilizer` which is just a function that accepts an `ErrorHandler` and returns a `MapPlugin`.

```ts
/**
 * Plugin initializer
 */
export interface MapPluginInitializer<TKey = unknown> {
  (errorHandler: ErrorHandler): MapPlugin<TKey>;
}
```
