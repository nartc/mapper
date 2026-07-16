---
title: Mapper and strategies
description: Understand the mapper, mapping strategies, error handling, and global logger configuration.
sidebar:
  label: Mapper
---

`Mapper` owns registered mappings and executes map and mutation operations. Create it with one mapping strategy:

```ts
const mapper = createMapper({
  strategyInitializer: classes(),
});
```

## Mapping strategies

A strategy discovers, retrieves, and applies model metadata. It also constructs destination objects and can preprocess source or postprocess destination values.

| Package | Initializer | Metadata source |
| --- | --- | --- |
| `@automapper/classes` | `classes()` | `@AutoMap()` and reflected class metadata |
| `@automapper/pojos` | `pojos()` | `PojosMetadataMap` registrations |
| `@automapper/mikro` | `mikro()` | Class metadata adapted for MikroORM entities |
| `@automapper/sequelize` | `sequelize()` | Class metadata adapted for Sequelize models |

`mikro()` and `sequelize()` extend the classes strategy with integration-specific defaults.

## Mapper lifetime

Register mappings once and reuse the mapper. Call `mapper.dispose()` when its mapping registry is no longer needed, such as during application or test teardown.

## Error handling

Without a custom `errorHandler`, mapper failures are forwarded to `AutoMapperLogger.error`. Supply an `ErrorHandler` when your application needs different behavior:

```ts
const mapper = createMapper({
  strategyInitializer: classes(),
  errorHandler: {
    handle(error: unknown) {
      throw error;
    },
  },
});
```

Failures use `AutoMapperError`, `MappingNotFoundError`, and `MapMemberError`, allowing consumers to narrow mapping failures with `instanceof`.

## Logger

AutoMapper's default logger delegates to `console` with an `[AutoMapper]:` prefix. It supports `log`, `info`, `warn`, `error`, `debug`, `verbose`, `fatal`, and optional `trace` methods.

```ts
const restore = AutoMapperLogger.configure({
  error: (message, ...details) => appLogger.error({ message, details }),
  warn: () => undefined,
});

restore(); // restore the previously active configuration
AutoMapperLogger.reset(); // restore console-backed defaults
```

Configure logging as early as possible when you need to capture warnings emitted while decorators are evaluated.
