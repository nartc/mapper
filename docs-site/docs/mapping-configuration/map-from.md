---
id: map-from
title: MapFrom
sidebar_label: MapFrom
---

We've already seen `mapFrom()` throughout some early sections of the documentations.

## Custom value from **Source**

`mapFrom()` accepts a **Selector** that we will select a member from **Source** to map to the member we're configuring on **Destination** 

```ts
import { mapFrom } from '@automapper/core';

mapper.createMap(User, UserDto)
  .forMember(
    destination => destination.fullName,
    mapFrom(source => source.firstName + ' ' + source.lastName)
  )
  .forMember(
    destination => destination.isAdult,
    mapFrom(source => source.age >= 18)
  )
```

## Value Resolver

A less-common use-case of `mapFrom()` is to utilize Value Resolver which is an object with the shape of `Resolver` interface.

```ts
export interface Resolver<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TResolvedType = SelectorReturn<TDestination>
> {
  resolve(source: TSource, destination?: TDestination): TResolvedType;
}
```

`resolve()` method accepts the whole **Source** object being mapped, an optional **Destination** object being mapped, and returns a value that ultimately will be mapped to the member on **Destination** that we are configuring.

Value Resolver is to help with complex logic where you need to determine what to return for the member on **Destination** without having to pollute your `Profile`. You can have `Resolver` in separate files.

```ts
import { mapFrom } from '@automapper/core';
import type { Resolver } from '@automapper/types';

export const taxResolver: Resolver<Item, ItemDto, number> = {
  resolve(source) {
    return source.type === 'A' ? source.price * 0.5 : source.price * 0.9
  }
}

mapper.createMap(Item, ItemDto)
  .forMember(
    destination => destination.tax,
    mapFrom(taxResolver)
  )
```

`mapFrom()` will set the `TransformationType` to `TransformationType.MapFrom`
