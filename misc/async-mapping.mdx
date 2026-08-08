---
title: Async mapping
description: Resolve asynchronous member selectors, callbacks, and array lifecycle work with AutoMapper 9.
sidebar:
  badge: v9
---

AutoMapper 9 provides genuine asynchronous mapping. Async APIs wait for promises returned by supported member resolvers and mapping callbacks before returning the destination.

## Async members

`mapFrom()` and `mapWithArguments()` selectors or resolvers may return promises:

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.displayName,
    mapFrom(async (source) => loadDisplayName(source.id)),
  ),
);

const dto = await mapper.mapAsync(user, User, UserDto);
```

Async nested work is collected in the active mapping context, so `afterMap()` sees resolved destination members.

## Async callbacks

```ts
createMap(
  mapper,
  User,
  UserDto,
  beforeMap(async (source) => hydrateUser(source)),
  afterMap(async (_, destination) => auditDestination(destination)),
);
```

For arrays, use `beforeMapArray()` and `afterMapArray()` for work that should run once around the collection. `mapArrayAsync()` waits for those callbacks and each element's async work.

## Choose the correct API

| Create destination | Mutate destination   |
| ------------------ | -------------------- |
| `mapAsync()`       | `mutateAsync()`      |
| `mapArrayAsync()`  | `mutateArrayAsync()` |

Synchronous `map()` or `mapArray()` throws if a member resolver returns a promise. This prevents unresolved promises from leaking into destination properties.

## NestJS integration

`MapInterceptor` and `MapPipe` from `@automapper/nestjs` support both synchronous and asynchronous mappings. They wait for asynchronous members and callbacks automatically, including array mappings configured with `isArray: true`.

Mapping errors are not replaced with the original response or request value. They propagate through Nest's normal exception handling.

## What async mapping does not do

Mapping still runs in the current JavaScript thread. Async APIs coordinate promise-returning application work; they do not move CPU-intensive mapping to a worker. Avoid using mapping callbacks for unrelated orchestration or heavy business logic.
