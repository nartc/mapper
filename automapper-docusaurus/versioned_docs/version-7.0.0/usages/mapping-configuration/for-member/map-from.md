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
    mapFrom(src => src.firstName + ' ' + src.lastName)
  )
  .forMember(
    dest => dest.isAdult,
    mapFrom(src => src.age >= 18)
  );
```

`mapFrom()` takes in a callback that receives the `source` and needs to return a value with a `type` that matches `dest => dest.<some_member>`.
**TypeScript** will provide strong-typings for the consumers.

![Type Inference](https://p42.f3.n0.cdn.getcloudapp.com/items/2NuBpGo7/Screen%20Recording%202020-03-20%20at%2003.08%20PM.gif?v=827421e292a75bf9fc33c511f4336abc)

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
