---
id: nested-model
title: Nested Model
sidebar_label: Nested Model
---

When you call `createMap()` for a pair of `Source` and `Destination`, **primitives** that have the same `propertyName` will be **auto-configured**.
**Nested model** will also be **auto-configured** by modifying the `@AutoMap()` decorator a little

```typescript {13,29}
class Profile {
  @AutoMap()
  bio: string;
  @AutoMap()
  age: number;
}

class User {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap(() => Profile)
  profile: Profile;
}

class ProfileVm {
  @AutoMap()
  bio: string;
  @AutoMap()
  isAdult: boolean;
}

class UserVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap(() => ProfileVm)
  profile: ProfileVm;
}
```

`@AutoMap()` can take in a `typeFunction` as an optional argument. This `typeFunction` will help `@nartc/automapper` to locate the correct `Model` to map for that `member`.
Now, when `createMap()` is called for `User` and `UserVm`, `User.profile` will be mapped to `UserVm.profile` with the correct `Mapping`. Please take note that you would also
need to call `createMap()` for `Profile` and `ProfileVm` as well.

> In **C# AutoMapper** version 9, nested `Mapping` is not created implicitly anymore and requires the consumers to `createMap()` for nested models explicitly.<br/><br/> `@nartc/automapper` also requires the consumers to do the same.

```typescript
Mapper.createMap(Profile, ProfileVm);
Mapper.createMap(User, UserVm);
```
