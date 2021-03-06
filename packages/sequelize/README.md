# @automapper/sequelize

This is the official plugin from `@automapper` to work with `Sequelize` enabled projects

## Installation

```sh
npm i @automapper/sequelize
```

or with `yarn`:

```sh
yarn add @automapper/sequelize
```

#### `peerDependencies`

`@automapper/sequelize` depends on `sequelize`, `@automapper/classes`, and all of `@automapper/classes` `peerDependencies`

```sh
npm i sequelize @automapper/{core,classes} reflect-metadata
npm i --save-dev @types/sequelize @automapper/types
```

or with `yarn`:

```sh
yarn add sequelize @automapper/{core,classes} reflect-metadata
yarn add --dev @types/sequelize @automapper/types
```

## Usage

- `@automapper/sequelize` provides `sequelize` as a `(valueGetter) => MapPluginInitializer`. Pass `sequelize()` to `createMapper` to create
  a `Mapper` that uses `sequelize` plugin.

- `valueGetter` is an optional getter that, if passed in, will be used to extract the value of the model after instantiation. By default, it will use `sequelize#Model.get()` if it's available.

```ts
import { classes } from '@automapper/classes';

const mapper = createMapper({
  ...,
  pluginInitializer: sequelize() // or sequelize(model => model.get(getterOptions))
})

mapper.createMap(User, UserVm);
mapper.map(user, UserVm, User);
```

Read more about this plugin on [sequelize documentation](https://automapperts.netlify.app/docs/plugins-system/introduce-to-sequelize)
