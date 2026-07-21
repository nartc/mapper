---
title: Mappings and transformations
description: Learn how mappings relate source and destination identifiers and how destination members are transformed.
sidebar:
  label: Mapping
---

A `Mapping` is a unidirectional contract between source and destination identifiers. Create each direction explicitly:

```ts
createMap(mapper, User, UserDto);
createMap(mapper, UserDto, User);
```

Each source/destination pair is unique within a mapper. You can also create a [self mapping](/misc/self-mapping) by using one identifier.

## Destination-member transformations

Mapping configuration defines how each destination path receives its value. Public member functions include:

| Function | Purpose |
| --- | --- |
| `ignore()` | Leave a destination member unmapped |
| `mapFrom()` | Select or resolve a value from the source |
| `condition()` | Map only when a predicate succeeds |
| `fromValue()` | Assign a fixed value |
| `mapWith()` | Map a nested value with explicit model identifiers |
| `convertUsing()` | Convert a selected source value with a reusable converter |
| `nullSubstitution()` | Replace a `null` source value |
| `undefinedSubstitution()` | Replace an `undefined` source value |
| `mapWithArguments()` | Resolve a member using invocation-time arguments |
| `mapDefer()` | Choose a member function at mapping time |

`forMember()` associates one of these functions with a selected destination path:

```ts
forMember(
  (destination) => destination.displayName,
  mapFrom((source) => `${source.firstName} ${source.lastName}`),
);
```

Use [mapping profiles](/fundamentals/mapping-profiles) to organize related mapping declarations and share configuration across them.
