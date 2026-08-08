---
title: mapWith
description: Explicitly select and map a nested source value with registered model identifiers.
---

Use `mapWith()` when nested metadata cannot identify the mapping automatically or the source and destination member names differ.

```ts
forMember(
  (destination) => destination.profile,
  mapWith(ProfileDto, Profile, (source) => source.originalProfile),
);
```

Its arguments are:

1. the nested destination identifier;
2. the nested source identifier;
3. a selector for the nested source value.

The corresponding `Profile` to `ProfileDto` mapping must already be registered.
