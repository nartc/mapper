---
id: plain-object
title: Handle plain JavaScript object
sidebar_label: Plain Object
---

`@nartc/automapper` works on real **instances** of models. However, there are cases where **TypeScript** is _tricked_ to see
a `plain object` as an `instance`. `Mapper.map()` (and all other `map()` variations) has an overload where you can also pass
in a `Source` model so you can help `@nartc/automapper` which model the `plain object` belongs to

```typescript
class User2 {
  // some properties
}

Mapper.createMap(User2, UserVm); // assumed you already have a Mapping created between User and UserVm.
const userVm = Mapper.map(user, UserVm);

/**
 * If "user" is truly an instance of User2, then it's fine. But if "user" is just a Plain JS object
 * and TS is tricked to see "user" as User2, then AutoMapper will have trouble looking for
 * the correct Mapping (User2 and UserVm).
 *
 * In that case, the "Source" argument will help AutoMapper to look for the correct Mapping
 */
const userVm = Mapper.map(user, UserVm, User2);
```
