---
title: Mapping configuration
description: Customize only the destination members and lifecycle behavior that convention cannot map automatically.
sidebar:
  label: Overview
---

Matching metadata maps by convention. Nested values also map automatically when their source and destination mapping is registered.

```ts
createMap(mapper, Address, AddressDto);
createMap(mapper, User, UserDto);
```

Pass configuration functions after the destination identifier when a mapping differs from convention:

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    mapFrom((source) => `${source.firstName} ${source.lastName}`),
  ),
  namingConventions(new CamelCaseNamingConvention()),
);
```

## Available configuration

| Function | Purpose |
| --- | --- |
| `autoMap()` | Explicitly map a same-name property without decorator metadata |
| `beforeMap()` / `afterMap()` | Run a callback around each object mapping |
| `beforeMapArray()` / `afterMapArray()` | Run a callback around a whole array mapping |
| `constructUsing()` | Construct the destination with a mapping-specific factory |
| `extend()` | Reuse member configuration from another mapping |
| `forMember()` | Configure one destination path |
| `forSelf()` | Map matching destination members from a nested source object |
| `namingConventions()` | Override naming conventions for this mapping |
| `typeConverter()` | Convert every matching pair of source and destination metadata types |

:::tip
Convention should still do most of the work. A mapping dominated by custom configuration is often clearer as explicit transformation code.
:::
