---
id: map-with-arguments
title: MapWithArguments
sidebar_label: MapWithArguments
---

Sometimes the consumers might need to pass in additional arguments to the map operations at runtime when invoking `mapper.map()`, `mapWithArguments()` is the map function that allows this behavior.

All `map()` operations (eg: `mapper.map()`, `mapper.mapArray()` ...) accepts an optional `MapOptions` in which there is a property called `extraArguments` that the consumers can use to pass in additional arguments for `mapWithArguments()`

```ts
import { mapWithArguments } from '@automapper/core';

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.foo,
  mapWithArguments((source, { argument1 }) => getFoo(source, argument1))
);

// when we want to run map from a User to a UserDto
const dto = mapper.map(someUser, UserDto, User, {
  extraArguments: { argument1: someValue },
});
```

## Value Resolver

[Resolver](./map-from.md) can also be used with `mapWithArguments`

```ts
export const taxResolver: Resolver<Item, { percentage: number }, number> = {
  resolve(source, { percentage }) {
    return source.price * percentage;
  },
};

mapper
  .createMap(Item, ItemDto)
  .forMember((destination) => destination.tax, mapWithArguments(taxResolver));

mapper.map(item, ItemDto, Item, { extraArguments: { percentage: 0.5 } };
```

`mapWithArguments()` will set the `TransformationType` to `TransformationType.MapWithArguments`
