---
id: map-defer
title: MapDefer
sidebar_label: MapDefer
---

`mapDefer()` is a special type of `MemberMapFunction` that can be used to _defer_ another `MemberMapFunction` based on some logic in `forMember()`

`mapDefer()` accepts a `deferFunction` that will be invoked with the **Source** object.

```ts
import { mapDefer, convertUsing, fromValue } from '@automapper/core';

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.fullName,
  mapDefer((source) => {
    if (source.someFlag) return fromValue('raw');
    return convertUsing(fullNameConverter);
  })
);
```

`mapDefer()` will set the `TransformationType` to `TransformationType.MapDefer`

If you have `strict` mode turned on, you might need to annotate the generics of the `MemberMapFunction` like `convertUsing<User, string>()`
