# @automapper/classes

This is the official plugin from `@automapper` to work with TS/ES5 Class

## Installation

```shell
npm i @automapper/classes
```

or with `yarn`:

```shell
yarn add @automapper/classes
```

#### `peerDependencies`

`@automapper/classes` depends on `@automapper/core`, `@automapper/types`, and `reflect-metadata`.

```shell
npm i @automapper/core reflect-metadata
npm i --save-dev @automapper/types
```

or with `yarn`:

```shell
yarn add @automapper/core reflect-metadata
yarn add --dev @automapper/types
```

## Usage

`@automapper/classes` provides `classes` as a `MapPluginInitializer`. Pass `classes` to `createMapper` to create
a `Mapper` that uses `classes` plugin.

```ts
import { classes } from '@automapper/classes';

const mapper = createMapper({
  ...,
  pluginInitializer: classes
})

mapper.createMap(User, UserVm);
mapper.map(user, UserVm, User);
```

[comment]: <> (TODO: update docs site)
Read more about this plugin on [classes documentation]()
