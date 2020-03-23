---
id: basic
title: Reverse Map
sidebar_label: Basic
---

`@nartc/automapper` supports **Reverse Mapping** by chaining `reverseMap()` after `createMap()`. This will create a reversed `Mapping` for the two models that were passed in `createMap()`

```typescript
Mapper.createMap(Source, Destination) // <-- create `Mapping<Source, Destination>`
  .reverseMap(); // <-- create `Mapping<Destination, Source>`
```

`reverseMap()` returns a `CreateReversedMapFluentFunctions` which will allow you to chain [Callbacks](../../features/callbacks.md) and [ForPath](for-path).
