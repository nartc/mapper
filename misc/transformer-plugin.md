---
title: Transformer plugin
description: Generate classes-strategy metadata at compile time instead of decorating every model property.
---

`@automapper/classes/transformer-plugin` is a public subpath of `@automapper/classes`. It uses a TypeScript `before` transformer to add `__AUTOMAPPER_METADATA_FACTORY__()` methods to model classes.

The default model suffixes are `.entity.ts`, `.model.ts`, `.vm.ts`, and `.dto.ts`. Override them with `modelFileNameSuffix`.

```ts
export interface AutomapperTransformerPluginOptions {
  modelFileNameSuffix?: string[];
}
```

## Ignore one property

The plugin generates metadata for matching model properties unless they already use `@AutoMap()`. Add `@autoMapIgnore` when a property should have no generated metadata:

```ts
class UserDto {
  firstName!: string;

  /** @autoMapIgnore */
  internalState!: string;
}
```

## NestJS CLI

```json title="nest-cli.json"
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@automapper/classes/transformer-plugin",
        "options": {
          "modelFileNameSuffix": [".entity.ts", ".dto.ts"]
        }
      }
    ]
  }
}
```

## Nx executors

Nx TypeScript and webpack executors that expose a `transformers` option can load the same plugin:

```json
{
  "transformers": [
    {
      "name": "@automapper/classes/transformer-plugin",
      "options": { "modelFileNameSuffix": [".dto.ts"] }
    }
  ]
}
```

## Direct compiler integrations

Webpack `ts-loader`, Rollup TypeScript integrations, and `ts-patch` can install the exported transformer directly. With `ts-patch`, use its `tspBefore` export:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@automapper/classes/transformer-plugin",
        "import": "tspBefore"
      }
    ]
  }
}
```

:::warning
TypeScript's transformer API is not stable across compiler releases. Verify generated metadata after TypeScript or build-tool upgrades. Complex unions and multidimensional arrays should use explicit `@AutoMap()` metadata or `forMember()` configuration.
:::
