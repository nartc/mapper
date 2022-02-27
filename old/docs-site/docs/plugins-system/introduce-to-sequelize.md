---
id: introduce-to-sequelize
title: Introduction
sidebar_label: Introduction
---

`@automapper/sequelize` is one of the official plugins of `@automapper/*` monorepo. This plugin works with [`Sequelize`](https://github.com/sequelize/sequelize) by extending `@automapper/classes` and modifying instantiation process to accommodate `Sequelize#Model` type.

## Installation

```bash
npm i @automapper/sequelize
# or with yarn
yarn add @automapper/sequelize
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
