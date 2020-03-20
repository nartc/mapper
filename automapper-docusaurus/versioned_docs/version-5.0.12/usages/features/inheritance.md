---
id: inheritance
title: Inheritance
sidebar_label: Inheritance
---

`@nartc/automapper` supports mapping inheritance with some caveat around `Generics Typing`

```typescript
class Base {
  @AutoMap()
  createdDate?: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  id?: string;
}

class BaseVm {
  @AutoMap()
  created?: Date;
  @AutoMap()
  updated?: Date;
  @AutoMap()
  recordId?: string;
}

class User extends Base {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  about: string;
}

class UserVm extends BaseVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  fullName: string;
  @AutoMap()
  about: string;
}

Mapper.createMap(User, UserVm).forMember(
  d => d.fullName,
  opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
);
```

When you run `Mapper.map(user, UserVm)`, you will get an `Error` showing 3 **unmapped properties** on `UserVm`: `created`, `updated`, and `recordId`.
`UserVm` is a subclass of `BaseVm` so `UserVm` inherits all _non-private_ properties from `BaseVm` which are `created`, `updated`, and `recordId`.
`@nartc/automapper`, by default, cannot _see_ and _automap_ `createdDate -> created`, `updatedDate -> updated`, `id -> recordId`.

> If `Base` and `BaseVm` share the same properties names, then everything will work without additional work

To fix this issue, you need to `createMap()` for `Base` and `BaseVm` then include `Mapping<Base, BaseVm>` when you `createMap()` for `User` and `UserVm`

```typescript
Mapper.createMap(Base, BaseVm)
  .forMember(
    d => d.created,
    opts => opts.mapFrom(s => s.createdAt)
  )
  .forMember(
    d => d.updated,
    opts => opts.mapFrom(s => s.updatedAt)
  )
  .forMember(
    d => d.recordId,
    opts => opts.mapFrom(s => s.id)
  );

Mapper.createMap(User, UserVm, { includeBase: [Base, BaseVm] }) // <-- include base mapping
  .forMember(
    d => d.fullName,
    opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
  );
```

Now when you run `Mapper.map(user, UserVm)`, the **unampped error** will be gone.

### Notes

- `Generics` for `includeBase` is a little tricky. You need to provide the **base mapping** in that shape and in that order.
- Custom `forMember()` for a inherited member on the **subclass mapping** will override the **base mapping**
