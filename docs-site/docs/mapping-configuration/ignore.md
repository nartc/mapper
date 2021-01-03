---
id: ignore
title: Ignore
sidebar_label: Ignore
---

When we want to completely ignore a member on the **Destination** or to avoid **Unmapped Properties** error, we can utilize `ignore()` which does nothing on the member. This ultimately makes the member `undefined`

```ts
import { ignore } from '@automapper/core';

mapper
  .createMap(User, UserDto)
  .forMember((destination) => destination.fullName, ignore());
```

`ignore()` will set the `TransformationType` to `TransformationType.Ignore`
