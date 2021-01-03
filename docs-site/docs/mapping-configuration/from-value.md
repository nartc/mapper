---
id: from-value
title: FromValue
sidebar_label: FromValue
---

`fromValue()` accepts a raw value to map to the member on **Destination**. If you pass in an object, this object will be mapped as-is without any consideration for a nested `Mapping`.

```ts
import { fromValue } from '@automapper/core';

mapper.createMap(User, UserDto)
  .forMember(
    destination => destination.fullName,
    fromValue('some raw value')
  )
```

`fromValue()` will set the `TransformationType` to `TransformationType.FromValue`
