---
id: pre-condition
title: PreCondition
sidebar_label: PreCondition
---

`preCondition()` works in the same manner as `condition()`. The difference is `preCondition()` is just a pre-check for subsequent `MemberMapFunction`.

`preCondition()` has the same signature as `condition()`: `predicateFn` and an optional `defaultValue`.

```ts
import { preCondition, convertUsing } from '@automapper/core';

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.fullName,
  preCondition((source) => source.age > 10, 'default full name'),
  convertUsing(fullNameConverter)
);
```

Without `defaultValue`, `destination.fullName` will be `undefined` if `preCondition` check fails.
