---
title: mapWithArguments
description: Resolve a destination member with source data and arguments supplied for one map invocation.
---

Define the member resolver:

```ts
forMember(
  (destination) => destination.tax,
  mapWithArguments((source, extraArguments) => {
    const percentage = extraArguments.percentage as number;
    return source.price * percentage;
  }),
);
```

Supply arguments through `MapOptions.extraArgs`:

```ts
const dto = mapper.map(item, Item, ItemDto, {
  extraArgs: () => ({ percentage: 0.5 }),
});
```

The resolver may also be an object implementing `Resolver<TSource, TExtraArguments, TReturnValue>`.

In v9, selectors and resolvers may return promises when you call `mapAsync()` or `mapArrayAsync()`:

```ts
const dto = await mapper.mapAsync(item, Item, ItemDto, {
  extraArgs: () => ({ region: 'us-east' }),
});
```
