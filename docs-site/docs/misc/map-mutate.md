---
id: map-mutate
title: Map Mutation
sidebar_label: Map Mutation
---

`@automapper/core` provides a way to _map mutate_ a **Destination**.

```ts
const sourceObj = getSourceFromSomewhere();
const destinationObj = getDestinationFromSomewhere();

mapper.map(sourceObj, Destination, Source, destinationObj);
```

The above snippet shows an overload of `map()` that would allow for mapping `destinationObj` mutably. This overload of `map()` is a `void` function because it will not return anything.
