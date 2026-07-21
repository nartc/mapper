---
title: forSelf
description: Map unprefixed destination members from a selected nested source model.
---

Auto-flattening maps `item.name` to `itemName`. Use `forSelf()` when the destination intentionally omits that prefix:

```ts
class CartItemDto {
  @AutoMap()
  name!: string;

  @AutoMap()
  price!: number;

  @AutoMap()
  quantity!: number;
}

createMap(
  mapper,
  CartItem,
  CartItemDto,
  forSelf(Item, (source) => source.item),
);
```

`forSelf()` creates or reuses mapping information from the nested `Item` model to the destination, then selects the nested source value at runtime.

You can provide an existing mapping instead of the nested source identifier:

```ts
const itemMapping = createMap(mapper, Item, CartItemDto);

createMap(
  mapper,
  CartItem,
  CartItemDto,
  forSelf(itemMapping, (source) => source.item),
);
```
