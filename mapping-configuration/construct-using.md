---
title: constructUsing
description: Override destination construction for one mapping.
---

Every strategy provides a default destination constructor. Use `constructUsing()` when one mapping needs a factory, dependency, or non-default constructor.

```ts
createMap(
  mapper,
  User,
  UserDto,
  constructUsing((source, destinationIdentifier) => {
    return new UserDto(source.id);
  }),
);
```

The callback receives the source object and destination identifier. It must return the destination instance that AutoMapper will populate.

For a one-off invocation, `MapOptions.destinationConstructor` can override destination construction without changing the registered mapping.
