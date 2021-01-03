# @automapper/core

This is the core package that will handle mapping configurations and mapping operations.

## Installation

```sh
npm i @automapper/core
```

or with `yarn`

```sh
yarn add @automapper/core
```

#### `peerDependencies`

`@automapper/core` depends on `@automapper/types`

```sh
npm i --save-dev @automapper/types
```

or with `yarn`

```sh
yarn add --dev @automapper/types
```

## Usage

`@automapper/core` exposes `createMapper()` method to create a `Mapper` object with a accompany `MapPlugin` (read more
about [Plugins](#Plugins))

`createMapper` accepts a `CreateMapperOptions` object with the following shape:

```ts
export interface CreateMapperOptions<TKey = unknown> {
  name: string;
  namingConventions?: {
    source: NamingConvention;
    destination: NamingConvention;
  };
  pluginInitializer: MapPluginInitializer<TKey>;
  errorHandler?: ErrorHandler;
}
```

> `TKey` is an optional type to determine what type of MetaKey that the plugin is providing. For example: `classes` plugin uses `Constructible` while `pojos` plugin uses `string` as MetaKey

Read more about usage on [documentation site](https://automapperts.netlify.app/docs/api/create-mapper)

## Plugins

Different from previous version `@nartc/automapper`, `@automapper/core` uses plugin-based approach. Core only concerns
with providing the consumers with `MemberMap` methods to configure the transformation as well as the `map()`
/`mapArray()` methods on the `Mapper` object to execute the mapping operations.

Metadata Storing mechanism and how to initialize a `Mapping` will be the plugins' responsibility. Core also provides
some utilities functions for plugins to use for initializing mappings etc...

`@automapper` provides two official plugins:

- `@automapper/classes`: Work with TS/ES6 classes. This is exactly how the previous `@nartc/automapper` works, but a bit
  lighter.
- `@automapper/pojos`: Work with Interfaces/Types along with POJOs. In projects that do not make use of Class, `pojos`
  can be used instead.

Read more about plugins on [documentation site](https://automapperts.netlify.app/docs/plugins-system/introduce-to-plugins)
