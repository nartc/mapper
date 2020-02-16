---
id: plugin
title: Transformer Plugin
sidebar_label: Plugin
---

As you have already noticed throughout the documentations, `@AutoMap()` decorator is used on every single property of every single class. This is not required for all properties
but it's only required to be put on the properties that are not going to be **custom-configured** by [ForMember](./usages/mapping-configuration/for-member/basic.md). Despite that,
it still introduces a lot of boilerplate code with all those `@AutoMap()`.

`@nartc/automapper` can be accompanied by a **Transformer Plugin** that is published on [NPM](https://www.npmjs.com/package/@nartc/automapper-transformer-plugin) under the name `@nartc/automapper-transformer-plugin`.
You can check out the [Github](https://github.com/nartc/automapper-transformer-plugin) repository.

[![Greenkeeper badge](https://badges.greenkeeper.io/nartc/automapper-transformer-plugin.svg)](https://greenkeeper.io/)
![travis](https://badgen.net/travis/nartc/automapper-transformer-plugin)
![bundlephobia](https://badgen.net/bundlephobia/minzip/@nartc/automapper-transformer-plugin)
![downloads](https://badgen.net/npm/dt/@nartc/automapper-transformer-plugin)
![npm](https://badgen.net/npm/v/@nartc/automapper-transformer-plugin)
![license](https://badgen.net/github/license/nartc/automapper-transformer-plugin)

## How it works

```typescript
class Profile {
  bio: string;
  age: number;
}

class User {
  firstName: string;
  lastName: string;
  profile: Profile;
}
```

The above TS code will be compiled to:

```javascript
class Profile {}
class User {}
```

We need to decorate the `field declarations` with `@AutoMap()` in order for `@nartc/automapper` to work properly.

```typescript
class Profile {
  @AutoMap()
  bio: string;
  @AutoMap()
  age: number;
}

class User {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap(() => Profile)
  profile: Profile;
}
```

That will get very verbose very soon. `@nartc/automapper-transformer-plugin` can help that.

This plugin utilizes **Abstract Syntax Tree** (**AST**) to run a `before` transformer.
The plugin will look at files that end with `*.model.ts` and `*.vm.ts` and keep the **metadata** of the `classes` in a form of a `static function`.
`@nartc/automapper-transformer-plugin` keeps the metadata as follow:

```javascript
class Profile {
  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return { bio: () => String, age: () => Number };
  }
}

class User {
  static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
    return {
      firstName: () => String,
      lastName: () => String,
      profile: () => Profile,
    };
  }
}
```

This allows `@nartc/automapper` to look at these models and run the `static function` to hold the metadata for each model, exactly like what `@AutoMap()` would do for you. In fact, internally, `@nartc/automapper` calls the static function and iterates over the result then calls `AutoMap()` directly.

## Limitations

**Transformers** bring great value to developers but they are an experimental feature in **TypeScript**. Hence, to use it, you'd need to modify your build steps directly and each build tool has different setup.

`@nartc/automapper-transformer-plugin` will only add the minimum amount of code relating to the `@AutoMap()` decorator. If you want to have extra options (options from `class-transformer` library), you'd want to still decorate the fields manually.

- **Union**: Currently, `@nartc/automapper-transformer-plugin` will handle most `Nullable` (`type | null`) and `Maybe` (`propKey?: type`) cases. However, for complex cases where you have unions with different types (`string | number | boolean` or `ClassA | ClassB`), please consider decorate the property (field) manually with `@AutoMap()` decorator.

## Installation

```shell script
npm install @nartc/automapper-transformer-plugin --save-dev
# or shorthand version
npm i -D @nartc/automapper-transformer-plugin
```

## Usage

`@nartc/automapper-transformer-plugin` only has one configuration option for now

```typescript
interface TsAutoMapperPluginOptions {
  modelFileNameSuffix?: string[];
}
```

`modelFileNameSuffix` is default to `['.model.ts', '.vm.ts']`

### Webpack

I hope you are using `ts-loader` or some form of `ts-loader forks`. Configure your `webpack.config.js` as follows to turn on the plugin

```javascript
...
const tsAutoMapperPlugin = require('@nartc/automapper-transformer-plugin');
const pluginOptions = {
  modelFileNameSuffix: [...]
};

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: program => ({
            before: [tsAutoMapperPlugin(program, pluginOptions).before]
          })
        }
      }
      ...
    ]
  }
  ...
};
```

### Rollup

Use `rollup-plugin-typescript2` as it has `tranformers` capability.

```javascript
import tsAutomapperPlugin from '@nartc/automapper-transformer-plugin';
import typescript from 'rollup-plugin-typescript2';
const pluginOptions = {
  modelFileNameSuffix: [...]
};

export default {
  ...
  preserveModules: true, // <-- turn on preserveModules
  plugins: [
    ...
    typescript({
      transformers: [service => ({
        before: [tsAutomapperPlugin(service.getProgram(), pluginOptions).before]
      })]
    }),
    ...
  ]
}
```

### ttypescript

`ttypescript` patches `typescript` in order to use `transformers` in `tsconfig.json`. See [ttypescript's README](https://github.com/cevek/ttypescript) for how to use this with module bundlers such as `webpack` or `Rollup`.

```json
{
  "compilerOptions": {
    ...,
    "plugins": [
        {
            "transform": "@nartc/automapper-transformer-plugin",
            "modelFileNameSuffix": [...]
        }
    ],
    ...
  }
}
```

Check out this [Examples Repo](https://github.com/nartc/automapper-transformer-plugin-examples) out.

### NestJS CLI

`nestjs/cli` can enable **Transformers** by default. To use this plugin with `nestjs/cli`, modify your `nest-cli.json`

```json {5-7,16-23}
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      "@nartc/automapper-transformer-plugin"
    ]
  }
}

// or with options
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nartc/automapper-transformer-plugin",
        "options": {
          "modelFileNameSuffix": [".dto.ts", ".vm.ts"]
        }
      }
    ]
  }
}

```
