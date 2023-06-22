# @automapper/classes/transformer-plugin

`@automapper/classes/transformer-plugin` is part of the public API of `@automapper/classes`.

## Problem

Decorating Classes' members with `@AutoMap()` is verbose, even when you're being meticulous about what members are being **auto-configured** vs **custom-configured**. In some other cases, the Classes themselves are being **generated**, and/or from **external libraries** that the consumers **cannot** touch.

`@automapper/classes/transformer-plugin` is to ease this pain point when using `@automapper/classes`

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

The requirement for `@automapper/classes` to work is to decorate all the members of both classes with `@AutoMap` in order for `@automapper/classes` to keep track of the metadata of each property on each class.

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
    @AutoMap(() => Profile)
    profile: Profile;
}
```

This will get very verbose very soon.

`@automapper/classes/transformer-plugin` runs a `before` transformer that affects the **AST** directly before the Compilation step.

The transformer will

-   Look at files that end with `.entity`, `.model.ts`, `.vm.ts`, and `.dto.ts` (this can be changed via transformer plugin options)
-   Iterate through all the members (`PropertyDeclaration` and `GetAccessorDeclaration`) of each class (`ClassDeclaration`) that it finds
-   Store the members in a metadata list that `@automapper/classes` can understand
-   Add to each class a `static method` and return the metadata list that is later retrieved and stored on the Mapper.

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
            ['bio', { type: () => String, depth: 1 }],
            ['age', { type: () => Number, depth: 1 }],
        ];
    }
}
class User {
    firstName: string;
    lastName: string;
    profile: Profile;

    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ['firstName', { type: () => String, depth: 1 }],
            ['lastName', { type: () => String, depth: 1 }],
            ['profile', { type: () => Profile, depth: 1 }],
        ];
    }
}
```

After compilation, the members will be gone, but the static function will stay making it available to be called at runtime. Hence, the metadata will be available. `@automapper/classes/transformer-plugin` only adds the minimum amount of code needed to keep track of the metadata.

## Experimental?

`@automapper/classes/transformer-plugin` utilizes [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to traverse and manipulate the **Abstract Syntax Tree (AST)** to automate the process of decorating the Classes. The Compiler API, while having been around for quite some time, is still marked as [not yet stable](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#disclaimer).

## Limitations

Currently, `@automapper/classes/transformer-plugin` will handle most `Nullable` (`type | null`) and `Maybe` (`propKey?: type`) cases. However, for complex cases where you have unions with different types (`string | number | boolean` or `ClassA | ClassB`), please consider decorate the property (field) manually with `@AutoMap()` decorator or use `forMember()` to provide a more comprehensive mapping configuration.

Matrices (Array of Array type. Eg: `string[][]`) should also be handled manually.

## Usage

As mentioned above, this is utilizing an experimental feature of TypeScript. Hence, you need to modify the build step of your project to use `@automapper/classes/transformer-plugin`

### Options

```ts
export interface AutomapperTransformerPluginOptions {
    modelFileNameSuffix?: string[];
}
```

`modelFileNameSuffix` is default to `['.entity.ts', '.model.ts', '.vm.ts', '.dto.ts']`

### Webpack

If you use `ts-loader` or some fork of `ts-loader`, you can configure Webpack config to turn on Transformers

```ts
// snip
const automapperTransformerPlugin = require('@automapper/classes/transformer-plugin');
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
                            automapperTransformerPlugin(program, pluginOptions)
                                .before,
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
import automapperTransformerPlugin from '@automapper/classes/transformer-plugin';
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
                        automapperTransformerPlugin(
                            service.getProgram(),
                            pluginOptions
                        ).before,
                    ],
                }),
            ],
        }),
        // snip
    ],
};
```

### ts-patch

ts-patch patches typescript in order to use transformers in tsconfig.json. See [ts-patch's README](https://github.com/nonara/ts-patch) for how to use this with module bundlers such as webpack or Rollup.

```
{
  "compilerOptions": {
    ...,
    "plugins": [
        {
            "transform": "@automapper/classes/transformer-plugin",
            "import": "tspBefore",
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
        "plugins": ["@automapper/classes/transformer-plugin"]
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
                "name": "@automapper/classes/transformer-plugin",
                "options": {
                    "modelFileNameSuffix": [".dto.ts", ".vm.ts"]
                }
            }
        ]
    }
}
```

### NestJS with Nx

In Nx workspaces, NestJS applications and buildable libraries are handled with `nrwl/node:webpack` and `nrwl/js:tsc` executors respectively. Both of these executors have an option called `transformers` that you can utilize to provide the plugin.

```json
{
    "app": {
        "targets": {
            "build": {
                "executor": "@nrwl/node:webpack",
                "options": {
                    "transformers": [
                        {
                            "name": "@automapper/classes/transformer-plugin",
                            "options": {
                                "modelFileNameSuffix": [".dto.ts"]
                            }
                        }
                    ]
                }
            }
        }
    },
    "lib": {
        "targets": {
            "build": {
                "executor": "@nrwl/js:tsc",
                "options": {
                    "transformers": [
                        {
                            "name": "@automapper/classes/transformer-plugin",
                            "options": {
                                "modelFileNameSuffix": [".dto.ts"]
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

### Angular

Angular CLI has sophisticated build process so please take a look at [this article](https://indepth.dev/posts/1045/having-fun-with-angular-and-typescript-transformers) and related articles mentioned to come up with your approach of turning on Transformers for Angular projects
