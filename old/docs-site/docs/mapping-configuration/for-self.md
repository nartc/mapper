---
id: for-self
title: For Self
sidebar_label: For Self (Flattening)
---

We know that we can have [Flattening](./auto.md#flattening) with [NamingConvention](../fundamentals.md#namingconvention). Let's remind ourselves how that works

```ts
class Item {
  @AutoMap()
  name: string;
  @AutoMap()
  price: number;
  @AutoMap()
  stock: number;
}

class CartItem {
  @AutoMap({ typeFn: () => Item })
  item: Item;
  @AutoMap()
  quantity: number;
}

class CartItemDto {
  @AutoMap()
  itemName: string;
  @AutoMap()
  itemPrice: number;
  @AutoMap()
  quantity: number;

  get total() {
    return this.price * this.quantity;
  }
}
```

When we `createMap(CartItem, CartItemDto)` with a `CamelCaseNamingConvention`, we get the following result when map from `CartItem` to `CartItemDto`:

```ts
mapper.createMap(CartItem, CartItemDto, {
  namingConventions: new CamelCaseNamingConvention(),
});

const dto = mapper.map(cartItem, CartItemDto, CartItem);

// dto.itemName will be mapped from cartItem.item.name automatically
// dto.itemPrice will be mapped from cartItem.item.price automatically
```

However, sometimes we want to keep our DTOs cleaner with **NOT** having to prefix some fields just to achieve automatic Flattening, let's adjust our models a little:

```ts
class Item {
  @AutoMap()
  name: string;
  @AutoMap()
  price: number;
  @AutoMap()
  stock: number;
}

class CartItem {
  @AutoMap({ typeFn: () => Item })
  item: Item;
  @AutoMap()
  quantity: number;
}

class CartItemDto {
  @AutoMap()
  name: string;
  @AutoMap()
  price: number;
  @AutoMap()
  quantity: number;

  get total() {
    return this.price * this.quantity;
  }
}
```

There are two approaches to go about this:

1. Use `forMember()` explicitly

```ts
mapper
  .createMap(CartItem, CartItemDto, {
    namingConventions: new CamelCaseNamingConvention(),
  })
  .forMember(
    (d) => d.name,
    mapFrom((s) => s.item.name)
  )
  .forMember(
    (d) => d.price,
    mapFrom((s) => s.item.price)
  );
```

2. Use `forSelf()`

```ts
mapper.createMap(Item, CartItemDto);
mapper
  .createMap(CartItem, CartItemDto, {
    namingConventions: new CamelCaseNamingConvention(),
  })
  .forSelf(Item, (s) => s.item);
```

With `forSelf(Item, (s) => s.item)`, we're saying: \_"For everything that is matching between `CartItemDto` and `Item`, please flatten those using `s.item` from `CartItem`".
