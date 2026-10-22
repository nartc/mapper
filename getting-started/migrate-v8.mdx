---
title: Migrating to AutoMapper 8
description: A concise reference for the functional API introduced in AutoMapper TypeScript 8.
sidebar:
  badge: Historical
---

Version 8 replaced the fluent API with standalone mapping-configuration functions and renamed mapping plugins to strategies. If you are upgrading from v7 or earlier, make these changes before applying the [v9 migration](/getting-started/migrate-v9).

## Mapper and strategy

```ts
// v7
const mapper = createMapper({
  name: 'default',
  pluginInitializer: classes,
});

// v8+
const mapper = createMapper({
  strategyInitializer: classes(),
});
```

All official strategy initializers are invoked: `classes()`, `pojos()`, `mikro()`, and `sequelize()`.

## Mapping declarations

`createMap()` and configuration methods became standalone functions:

```ts
// v7
mapper
  .createMap(User, UserDto)
  .forMember((destination) => destination.name, mapFrom((source) => source.fullName));

// v8+
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.name,
    mapFrom((source) => source.fullName),
  ),
);
```

The model identifier order is source then destination:

```ts
mapper.map(user, User, UserDto);
```

## Profiles and mutation

Use standalone `addProfile()` and the dedicated mutation methods:

```ts
addProfile(mapper, userProfile);

mapper.mutate(user, existingDto, User, UserDto);
mapper.mutateArray(users, existingDtos, User, UserDto);
```

## Metadata changes

- `@AutoMap({ typeFn: () => User })` became `@AutoMap(() => User)`.
- Arrays must identify their element type with `@AutoMap(() => [User])`.
- POJO metadata is registered through `PojosMetadataMap.create()`.
- `PojosMetadataMap.reset()` clears registered POJO metadata for tests.

See the current [classes strategy](/strategies/classes) and [POJOs strategy](/strategies/pojos) guides for supported syntax.
