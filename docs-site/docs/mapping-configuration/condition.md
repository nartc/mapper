---
id: condition
title: Condition
sidebar_label: Condition
---

When configuring a member on the **Destination**, we can use `condition()` to *conditionally* map the member with the same name on the **Source** if some condition is met.

`condition()` accepts a `predicateFn` that has the **Source** as the first argument and returns a `boolean`. If `predicateFn` returns **truthy**, then **Destination#member** will be mapped with **Source#member**. Otherwise, **Destination#member** will be `undefined`.

```ts
import { condition } from '@automapper/core';

Mapper.createMap(User, UserDto)
  .forMember(
    destination => destination.fullName,
    condition(source => source.age > 10)
  );
```

Here, if `source.age > 10` is evaluated to `true`, then `destination.fullName` will be mapped with `source.fullName`. If `source.fullName` is **falsy** or `source.age > 10` is evaluated to `false`, then `destination.fullName` will be `undefined`.

### With `defaultValue`

`condition()` also accepts an optional second argument `defaultValue`. **Destination#member** will be mapped with `defaultValue` in the case that either **Source#member** or `predicateFn` is **falsy**. `defaultValue` must have the same type as **Destination#member**

```ts
import { condition } from '@automapper/core';

Mapper.createMap(User, UserDto)
  .forMember(
    destination => destination.fullName,
    condition(source => source.age > 10, "Some default value")
  );
```

`condition()` will set the `TransformationType` to `TransformationType.Condition`
