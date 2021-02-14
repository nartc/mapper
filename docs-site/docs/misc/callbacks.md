---
id: callbacks
title: Callbacks
sidebar_label: Callbacks
---

`@automapper/core` allows for passing in `beforeMap` and `afterMap` which will be executed **before** and/or **after** a mapping operation. In AutoMapper, these are called `MapAction`

`MapAction` can be provided at two different levels: `Mapping` level and `Map` level.

## `Map` actions

All `map()` variations accept optional `MapOptions` which is an object with the following interface:

```ts
export interface MapOptions<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  beforeMap?: MapAction<TSource, TDestination>;
  afterMap?: MapAction<TSource, TDestination>;
  extraArguments?: Record<string, unknown>; // <-- to be used with mapWithArguments()
}
```

If any of the `MapAction` is provided, it will be called in correct chronological order

```ts
mapper.map(user, UserDto, User, {
  beforeMap: (source, destination) => {},
  afterMap: (source, destination) => {},
});
```

## `Mapping` actions

When we call `mapper.createMap()`, we can chain `beforeMap` and `afterMap` to provide `Mapping` actions. These actions will be called for **ALL** mapping operations between a **Source** and a **Destination**.

```ts
mapper
  .createMap(User, UserDto)
  .beforeMap((source, destination) => {})
  .afterMap((source, destination) => {});
```

`Map` actions will **override** `Mapping` actions.

## Async actions

`MapAction` is useful when we're dealing with Asynchronous values. If we want to map an async **Source#member** to a sync **Destination#member**, the appropriate way to do so is:

- `ignore()` **Destination#member**
- Use `afterMap(async () => {})` syntax to await for **Source#member** then either assign the resolved value to **Destination#member** directly or call `mapper.map()` with the resolved value.

## Author note

- The arguments passed to `MapAction` are mutable. **Do not** mutate anything unless you're sure what you are doing.
- `mapArray()` will **ignore** `Mapping` actions due to performance issue. It would not be performant if we have a `MapAction` on `User <> UserDto` and we run the `MapAction` for every single item when we `mapArray()` from `Array<UserDto>` to `Array<User>`
