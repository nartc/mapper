---
id: map-with
title: MapWith
sidebar_label: MapWith
---

By default, `@automapper/core` will be able to map nested models for matching properties. In some rare cases where we have different properties name with related models, we can utilize `mapWith()`

`mapWith()` accepts three arguments:

- `withDestination`: the nested model to map **to**
- `withSource`: the nested model to map **with**
- `withSourceValue()`: a function that accepts the **Source** and returns a value from a member of the **Source**

```ts
import { mapWith } from '@automapper/core';

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.someProfile,
  mapWith(ProfileDto, Profile, (source) => source.originalProfile)
);
```

Though this might look confusing, you can use the following narrative to make it easier to understand: "For `destination.someProfile`, I want to map with `ProfileDto` and `Profile`, with the value of `source.originalProfile`"

`mapWith()` will set the `TransformationType` to `TransformationType.MapWith`

### Author note on `mapWith()`

As much as I hate to admit it, `mapWith()` is pretty useful. When you work with Server-side NodeJS, the database will, most of the time, return raw objects when you query for your data. Even with TypeScript, these are just Plain Objects.

`mapWith()` will actually help in these cases because we provide the required information for `Mapper` to look up the `Mapping` for the data.
