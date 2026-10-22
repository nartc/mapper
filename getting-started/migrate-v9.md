---
title: Migrating to AutoMapper 9
description: Upgrade requirements and consumer-facing behavior changes in AutoMapper TypeScript 9.
sidebar:
  badge: v9
---

AutoMapper 9 modernizes the runtime and makes asynchronous mapping real. Most mapping declarations remain source-compatible, but the environment, async behavior, and several public contracts changed.

## Upgrade checklist

1. Upgrade the application to Node.js 20 or later.
2. Ensure the application can consume ESM-only packages.
3. Upgrade all `@automapper/*` packages together.
4. For NestJS, use version 10 or 11.
5. For MikroORM, use version 6.
6. Replace workarounds built around the old "fake async" behavior.
7. Update error and logger integrations to use the new typed contracts.

## Node.js and modules

Every published package now declares Node.js `>=20.0.0` and uses explicit ESM exports. CommonJS-only consumers must migrate their runtime or add an ESM-compatible build boundary.

```json title="package.json"
{
  "type": "module"
}
```

## Asynchronous mapping

In v8, `mapAsync()` deferred a synchronous map operation. It did not resolve promises returned by member selectors or mapping callbacks.

In v9, these APIs collect and await asynchronous work:

- `mapAsync()` and `mapArrayAsync()`;
- `mutateAsync()` and `mutateArrayAsync()`;
- `mapFrom()` selectors and resolvers;
- `mapWithArguments()` selectors and resolvers;
- `beforeMap()` and `afterMap()` callbacks.

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.displayName,
    mapFrom(async (source) => loadDisplayName(source.id)),
  ),
  afterMap(async (_, destination) => {
    destination.permissions = await loadPermissions(destination.id);
  }),
);

const dto = await mapper.mapAsync(user, User, UserDto);
```

Calling synchronous `map()` or `mapArray()` when a member returns a promise now throws and tells you to use the async API. This prevents promises from being assigned silently to destination members.

`MapInterceptor` and `MapPipe` from `@automapper/nestjs` now support both synchronous and asynchronous mappings. NestJS applications can use asynchronous members and callbacks with either helper without mapping explicitly in a controller or service.

## Array-wide callbacks

Version 9 adds `beforeMapArray()` and `afterMapArray()` for work that belongs to a whole collection rather than an individual mapped object:

```ts
createMap(
  mapper,
  User,
  UserDto,
  beforeMapArray(async (users) => {
    await preloadUsers(users.map((user) => user.id));
  }),
  afterMapArray((_, destinations) => {
    destinations.sort((a, b) => a.name.localeCompare(b.name));
  }),
);

const dtos = await mapper.mapArrayAsync(users, User, UserDto);
```

The callbacks may be synchronous. Use `mapArrayAsync()` when either callback or an element mapping returns a promise.

## Typed errors

Mapper failures now use exported error classes:

- `AutoMapperError` is the base class;
- `MappingNotFoundError` includes `sourceName` and `destinationName`;
- `MapMemberError` includes `memberPath`, `destinationName`, and `originalError`.

```ts
import { AutoMapperError, MapMemberError } from "@automapper/core";

try {
  await mapper.mapAsync(user, User, UserDto);
} catch (error) {
  if (error instanceof MapMemberError) {
    reportMemberFailure(error.memberPath, error.originalError);
  } else if (error instanceof AutoMapperError) {
    reportMappingFailure(error);
  }
}
```

Custom `ErrorHandler.handle` implementations now receive `unknown`, so narrow the value before reading error-specific fields.

## Logger configuration

`AutoMapperLogger` now supports `log`, `info`, `warn`, `error`, `debug`, `verbose`, `fatal`, and optional `trace` methods. `configure()` can be called more than once and returns a restore function.

```ts
const restore = AutoMapperLogger.configure({
  warn: (message, ...details) => appLogger.warn({ message, details }),
  trace: (message, ...details) => appLogger.trace({ message, details }),
});

// Restore the logger that was active before this configuration.
restore();

// Or restore AutoMapper's console-backed defaults.
AutoMapperLogger.reset();
```

Unspecified methods retain their default implementations. To silence a level, provide a no-op function.

```ts
AutoMapperLogger.configure({ warn: () => undefined });
```

Configure the logger before decorators and mapping profiles are evaluated if you need to capture metadata warnings.

## Broader class identifiers

Class metadata can now use abstract classes and classes with non-public constructors as runtime identifiers. This mainly improves compatibility with framework and domain-model patterns; existing public constructors continue to work.

## Integration versions

| Integration        | v9 support            |
| ------------------ | --------------------- |
| Node.js            | 20 and later          |
| NestJS             | 10 or 11              |
| MikroORM           | 6                     |
| Sequelize          | 6                     |
| `reflect-metadata` | `^0.1.14` or `^0.2.0` |

## What did not change

The central workflow is unchanged: create a mapper with a strategy, register mappings with `createMap()`, then call `map()`, `mapArray()`, or their async variants. Existing mapping configurations remain available.
