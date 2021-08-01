# @automapper/classes/experimental/transformer-plugin

`@automapper/classes/experimental/transformer-plugin` is part of the public API of `@automapper/classes`.

## Problem

Decorating Classes' members with `@AutoMap()` is verbose, even when you're being meticulous about what members are being **auto-configured** vs **custom-configured**. In some other cases, the Classes themselves are being **generated**, and/or from **external libraries** that the consumers **cannot** touch.

`@automapper/classes/experimental/transformer-plugin` is to ease this pain point when using `@automapper/classes`

## How it works

Let's look at the following classes

```ts
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

Throughout the documentation, we all know that the above code will be compiled to

```js
class Profile {}
class User {}
```

The requirement for `@automapper/classes` to work is to decorate all the members of both classes with `@AutoMap` in order for `@automapper/classes` to keep track of the metadata of each class.

```ts
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
  @AutoMap({ typeFn: () => Profile })
  profile: Profile;
}
```

This will get very verbose very soon.

`@automapper/classes/experimental/transformer-plugin` runs a `before` transformer that affects the **AST** directly before the Compilation step.

The transformer will

- Look at files that end with `.model.ts`, `.vm.ts`, and `.dto.ts` (this can be changed via transformer plugin options)
- Iterate through all the members (`PropertyDeclaration`) of each class (`ClassDeclaration`) that it finds
- Store the members in a list that `@automapper/classes` can understand
- Add to each class a `static method` and return the list.

Let's look at the above snippet again

```ts
// your code
class Profile {
  bio: string;
  age: number;
}
class User {
  firstName: string;
  lastName: string;
  profile: Profile;
}

// after "before" transformer runs through your code

class Profile {
  bio: string;
  age: number;

  static __AUTOMAPPER_METADATA_FACTORY__() {
    return [
      ['bio', { typeFn: () => String }],
      ['age', { typeFn: () => Number }],
    ];
  }
}
class User {
  firstName: string;
  lastName: string;
  profile: Profile;

  static __AUTOMAPPER_METADATA_FACTORY__() {
    return [
      ['firstName', { typeFn: () => String }],
      ['lastName', { typeFn: () => String }],
      ['profile', { typeFn: () => Profile, depth: 0 }],
    ];
  }
}
```

After compilation, the members will be gone, but the static function will stay making it available to be called at runtime. Hence, the metadata will be available. `@automapper/classes/experimental/transformer-plugin` only adds the minimum amount of code needed to keep track of the metadata.

## Why experimental?

`@automapper/classes/experimental/transformer-plugin` utilizes [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to traverse and manipulate the **Abstract Syntax Tree (AST)** to automate the process of decorating the Classes.

## Limitations

Currently, `@automapper/classes/experimental/transformer-plugin` will handle most `Nullable` (`type | null`) and `Maybe` (`propKey?: type`) cases. However, for complex cases where you have unions with different types (`string | number | boolean` or `ClassA | ClassB`), please consider decorate the property (field) manually with @AutoMap() decorator.

## Usage

As mentioned above, this is utilizing an experimental feature of TypeScript. Hence, you need to modify the build step of your project to use `@automapper/classes/experimental/transformer-plugin`

### Options

```ts
export interface AutomapperTransformerPluginOptions {
  modelFileNameSuffix?: string[];
}
```

`modelFileNameSuffix` is default to `['.model.ts', '.vm.ts', '.dto.ts']`

### Webpack

If you use `ts-loader` or some fork of `ts-loader`, you can configure Webpack config to turn on Transformers

```ts
// snip
const automapperTransformerPlugin = require('@automapper/classes/experimental/transformer-plugin');
const pluginOptions = {
  modelFileNameSuffix: [
    /*...*/
  ],
};
module.exports = {
  // snip
  module: {
    rules: [
      // snip
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: (program) => ({
            before: [
              automapperTransformerPlugin(program, pluginOptions).before,
            ],
          }),
        },
      },
      // snip
    ],
  },
  // snip
};
```

### Rollup

Use `rollup-plugin-typescript2` as it has `transformers` capability

```ts
import automapperTransformerPlugin from '@automapper/classes/experimental/transformer-plugin';
import typescript from 'rollup-plugin-typescript2';
const pluginOptions = {
  modelFileNameSuffix: [
    /*...*/
  ],
};
export default {
  // snip
  preserveModules: true, // <-- turn on preserveModules
  plugins: [
    // snip
    typescript({
      transformers: [
        (service) => ({
          before: [
            automapperTransformerPlugin(service.getProgram(), pluginOptions)
              .before,
          ],
        }),
      ],
    }),
    // snip
  ],
};
```

### ttypescript

ttypescript patches typescript in order to use transformers in tsconfig.json. See [ttypescript's README](https://github.com/cevek/ttypescript) for how to use this with module bundlers such as webpack or Rollup.

```
{
  "compilerOptions": {
    ...,
    "plugins": [
        {
            "transform": "@automapper/classes/experimental/transformer-plugin",
            "modelFileNameSuffix": [...]
        }
    ],
    ...
  }
}
```

### NestJS CLI

`nestjs/cli` can enable Transformers by default. To use this plugin with `nestjs/cli`, modify your `nest-cli.json`

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@automapper/classes/experimental/transformer-plugin"]
  }
}
```

or with options

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@automapper/classes/experimental/transformer-plugin",
        "options": {
          "modelFileNameSuffix": [".dto.ts", ".vm.ts"]
        }
      }
    ]
  }
}
```

### NestJS with Nx

**NestJS** in Nx workspace utilizes `nrwl/node:build` executor (formerly, builder) which allows you to pass in a custom Webpack config. However, to turn on Transformer, there's still this [open issue](https://github.com/nrwl/nx/issues/2147) in which you can find multiple solutions/workarounds as of the moment.

### Angular

Angular CLI has sophisticated build process so please take a look at [this article](https://indepth.dev/posts/1045/having-fun-with-angular-and-typescript-transformers) and related articles mentioned to come up with your approach of turning on Transformers for Angular projects
