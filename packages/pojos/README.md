# @automapper/pojos

This is the official plugin from `@automapper` to work with Interfaces/Types along with Plain Objects

## Installation

```sh
npm i @automapper/pojos
```

or with `yarn`:

```sh
yarn add @automapper/pojos
```

#### `peerDependencies`

`@automapper/pojos` depends on `@automapper/core` and `@automapper/types`

```sh
npm i @automapper/core
npm i --save-dev @automapper/types
```

or with `yarn`:

```sh
yarn add @automapper/core
yarn add --dev @automapper/types
```

## Usage

`@automapper/pojos` provides `pojos` as a `MapPluginInitializer`. Pass `pojos` to `createMapper` to create a `Mapper`
that uses `pojos` plugin.

```ts
import { pojos } from '@automapper/pojos';

const mapper = createMapper({
  ...,
  pluginInitializer: pojos
})

mapper.createMap<User, UserVm>('SomeTokenForUser', 'SomeTokenForUserVm');
mapper.map<User, UserVm>(user, 'SomeTokenForUserVm', 'SomeTokenForUser');
```

[comment]: <> (TODO: update docs site)
Read more about this plugin on [pojos documentation]()
