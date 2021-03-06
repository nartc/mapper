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

```ts
import { sequelize } from '@automapper/sequelize';

const mapper = createMapper({
  ...,
  pluginInitializer: sequelize() // or sequelize(model => model.get(getterOptions))
})

mapper.createMap(User, UserVm);
mapper.map(user, UserVm, User);
```
