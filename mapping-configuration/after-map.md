---
title: afterMap
description: Run synchronous or asynchronous work after members or an entire array have been mapped.
---

`afterMap()` runs after destination members have been assigned:

```ts
createMap(
  mapper,
  User,
  UserDto,
  afterMap((source, destination) => {
    destination.label = `${destination.fullName} (${source.id})`;
  }),
);
```

An invocation-specific callback overrides the mapping callback:

```ts
mapper.map(user, User, UserDto, {
  afterMap: (source, destination) => audit(source, destination),
});
```

## Async callback

In v9, `mapAsync()` waits for asynchronous members before `afterMap()` runs, then waits for the callback itself:

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    mapFrom(async (source) => loadDisplayName(source.id)),
  ),
  afterMap(async (_, destination) => {
    destination.permissions = await loadPermissions(destination.id);
  }),
);

const dto = await mapper.mapAsync(user, User, UserDto);
```

## Whole-array callback

`afterMapArray()` runs once after all array elements have been mapped:

```ts
createMap(
  mapper,
  User,
  UserDto,
  afterMapArray((_, destinations) => {
    destinations.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }),
);
```

Use `mapArrayAsync()` if the array callback returns a promise.
