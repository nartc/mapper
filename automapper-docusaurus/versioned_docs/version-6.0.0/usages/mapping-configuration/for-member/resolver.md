---
id: resolver
title: Value Resolver
sidebar_label: Value Resolver
---

Very similar concept to [Value Converter](converter). However, a `Resolver` has access to the whole `source` object as well as the current `destination` being mapped. You can use a `Resolver` to handle more complex business mapping logic for a specific `destination` that you don't want to pollute the construction of a `Mapping`.

A `ValueResolver` is a class that implements `Resolver` interface. `Resolver` takes in 3 `type arguments`: `TSource`, `TDestination` and the `type` of `destination.<some_member>` that you want to apply this `Resolver` on.
Implementing a `Resolver` requires a `resolve()` function.

```typescript
interface Resolver<TSource, TDestination, TDestinationMember> {
  resolve(source: TSource, destination: TDestination): TDestinationMember;
}
```

Let's take a look at the following `TaxResolver`

```typescript
class TaxResolver implements Resolver<Item, ItemVm, number> {
  resolve(source: Item, destination: ItemVm): number {
    if (source.type === 'A') {
      return item.price * 0.5;
    }

    return item.price * 0.9;
  }
}
```

Once you have the `ValueResolver` ready, you can pass an instance of the `ValueResolver` to `mapFrom()`

```typescript
Mapper.createMap(Item, ItemVm).forMember(
  dest => dest.tax,
  mapFrom(new TaxResolver())
);
```

Using a `ValueResolver` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `MapFrom`
