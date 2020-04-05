---
id: callbacks
title: Map Callbacks
sidebar_label: Map Callbacks
---

`@nartc/automapper` provides `beforeMap` and `afterMap` callbacks which will be executed **before** and/or **after** a mapping operation occurs, if said callbacks are provided.
You can provide `callbacks` at two different levels: **Map** and **Mapping**.

> Refer to [Basic concepts](../../guides/basic-concept.md)

### Map level

All `map()` methods have an optional argument (usually the last argument) which is a `MapActionOptions: { beforeMap: Function, afterMap: Function }`. If any of the callbacks is provided, it will be called in correct chronological order.

```typescript
const userVm = Mapper.map(user, UserVm, {
  beforeMap: (source, destination, mapping) => {},
  afterMap: (source, destination, mapping) => {},
});
```

### Mapping level

Callbacks on **Mapping** will be called for **ALL** map operations that occur between the two models unless you provide **Map level** callbacks when you invoke a certain `map()` operation.

```typescript
Mapper.createMap(Source, Destination)
  .beforeMap((source, destination, mapping) => {})
  .afterMap((source, destination, mapping) => {});
```

### Notes

- The `callbacks` are called with `source`, `destination`, and `mapping` values. **ANYTHING** you do to the `source` and `destination` will be carried over to the `source` and `destination`
  being mapped (**mutation**) so please be cautious. Mutability in this case might be handy and dangerous at the same time given the dynamic characteristic of **JavaScript**.
- **Map level** callbacks will override **Mapping level** callbacks if both are provided.
- `mapArray()` will ignore **Mapping level** callbacks because it would be a performance issue if callbacks were to be called on every single item in an array. Provide **Map level** callbacks instead.
