# @automapper/sequelize

This is the official plugin from `@automapper` to work with `Sequelize` enabled projects. `sequelize` is essentially extending from `classes` with some modification to work with `Sequelize#Model` type.

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

- `@automapper/sequelize` provides `sequelize` as a `(options: SequelizeInitializerOptions) => MapPluginInitializer`. Pass `sequelize()` to `createMapper` to create
  a `Mapper` that uses `sequelize` plugin.

```ts
export interface SequelizeInitializerOptions {
  valueGetter?: <
    TGetterResult extends Record<string, unknown> = any,
    TModel extends Model<TGetterResult> = Model<TGetterResult>
  >(
    model: TModel
  ) => TGetterResult;
  init?: <
    TDestination extends Dictionary<TDestination> = any,
    TModel extends Model<TDestination> = Model<TDestination>
  >(
    destination: TModel,
    destinationObj: TDestination
  ) => TDestination;
}
```

- `valueGetter` is an optional getter that, if passed in, will be used to extract the value of the model after instantiation. By default, it will use `sequelize#Model.get()` if it's available.
- `init` is an optional init function that, if passed in, will be used to instantiate a `Sequelize#Model` after map. By default, it will use `new Model(mapResult)`

```ts
import { sequelize } from '@automapper/sequelize';
import { Model } from 'sequelize-typescript';

const mapper = createMapper({
  ...,
  pluginInitializer: sequelize()
  /**
   * or
   * sequelize({
   *   valueGetter: model => model.get(getterOptions),
   *   init: (model, mapResult) => model.init(mapResult, initOptions)
   * })
   */
})

class User extends Model {}

mapper.createMap(UserVm, User);
mapper.map(userVm, User, UserVm);
```

Read more about this plugin on [sequelize documentation](https://automapperts.netlify.app/docs/plugins-system/introduce-to-sequelize)
