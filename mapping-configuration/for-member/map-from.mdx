---
title: mapFrom
description: Select, compute, or asynchronously resolve a destination member from the source object.
---

## Selector

```ts
forMember(
  (destination) => destination.fullName,
  mapFrom((source) => `${source.firstName} ${source.lastName}`),
);
```

## Reusable resolver

A resolver receives the source and current destination and may return a value or promise:

```ts
const taxResolver: Resolver<Item, ItemDto, number> = {
  resolve(source) {
    return source.type === 'A' ? source.price * 0.5 : source.price * 0.9;
  },
};

forMember((destination) => destination.tax, mapFrom(taxResolver));
```

## Async resolver

```ts
forMember(
  (destination) => destination.ownerName,
  mapFrom(async (source) => loadOwnerName(source.ownerId)),
);

const dto = await mapper.mapAsync(item, Item, ItemDto);
```

Synchronous `map()` and `mapArray()` reject promise-returning members. Use their async variants.
