---
id: map-from
title: MapFrom
sidebar_label: MapFrom
---

Let's take a look at the following snippet

```typescript
Mapper.createMap(User, UserVm)
  .forMember(
    dest => dest.fullName,
    opts => opts.mapFrom(src => src.firstName + ' ' + src.lastName)
  )
  .forMember(
    dest => dest.isAdult,
    opts => opts.mapFrom(src => src.age >= 18)
  );
```

`mapFrom()` takes in a callback that receives the `source` and needs to return a value with a `type` that matches `dest => dest.<some_member>`.
**TypeScript** will provide strong-typings for the consumers.

![Type Inference](https://p42.f3.n0.cdn.getcloudapp.com/items/WnuN17mb/Screen+Recording+2020-02-15+at+01.36+PM.gif?v=30cdc579dd34646b4e6c0b51129c2005)

`mapFrom()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `MapFrom`.

```typescript
const user = new User();
user.firstName = 'Chau';
user.lastName = 'Tran';
user.age = 28;
user.bio = 'Developer';

const vm = Mapper.map(user, UserVm);
/**
 * UserVm {
 *   firstName: 'Chau',
 *   lastName: 'Tran',
 *   fullName: 'Chau Tran',
 *   age: 28,
 *   isAdult: true,
 *   bio: 'Developer'
 * }
 */
```
