---
title: beforeMap
description: Run synchronous or asynchronous work before object or array mapping begins.
---

Configure a callback on the mapping:

```ts
createMap(
  mapper,
  User,
  UserDto,
  beforeMap((source, destination) => {
    normalizeUser(source);
  }),
);
```

Or provide an invocation-specific callback through `MapOptions`:

```ts
mapper.map(user, User, UserDto, {
  beforeMap: (source, destination) => normalizeUser(source),
});
```

The invocation callback takes precedence over mapping configuration.

## Async callback

Callbacks may return promises when the async map API is used:

```ts
createMap(
  mapper,
  User,
  UserDto,
  beforeMap(async (source) => hydrateUser(source)),
);

const dto = await mapper.mapAsync(user, User, UserDto);
```

## Whole-array callback

`beforeMapArray()` runs once before array elements are mapped:

```ts
createMap(
  mapper,
  User,
  UserDto,
  beforeMapArray(async (users) => preloadUsers(users)),
);

const dtos = await mapper.mapArrayAsync(users, User, UserDto);
```

An invocation-level `beforeMap` passed to `mapArray()` or `mapArrayAsync()` also receives the source and destination arrays and overrides `beforeMapArray()`.
