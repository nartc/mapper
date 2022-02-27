---
id: null-substitution
title: NullSubstitution
sidebar_label: NullSubstitution
---

`nullSubstitution()` takes in a raw value to map to the member on **Destination**. If you pass in an object, `Mapper` will map the object as-is without any consideration for nested `Mapping`.

`nullSubstitution()` uses strict equality check `=== null` to make the comparison. Hence, `undefined` value will **not** be substituted.

```ts
import { nullSubstitution } from '@automapper/core';

mapper
  .createMap(User, UserDto)
  .forMember(
    (destination) => destination.fullName,
    nullSubstitution('full name')
  );

const user = { fullName: null };

mapper.map(user, UserDto, User); // { fullName: 'full name' }
```

`nullSubstitution()` will set the `TransformationType` to `TransformationType.NullSubstitution`
