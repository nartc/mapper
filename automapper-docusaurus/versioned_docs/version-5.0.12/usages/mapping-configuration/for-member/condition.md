---
id: condition
title: Condition
sidebar_label: Condition
---

`condition()` takes in a `predicateFn` that receives `source` and needs to return a `boolean` value. If the `predicateFn` returns
_truthy_, then `@nartc/automapper` will try to map `source.<some_member>` to `destination.<some_member>` with `<some_member>` is the `member`
being configured with `forMember()`

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.fullName,
  opts => opts.condition(src => src.age > 10)
);
```

If `src.age > 10` returns _truthy_, then `src.fullName` will be mapped to `dest.fullName`. `dest.fullName` will receive a `null` value if `src.fullName` is `undefined/null` OR `src.age <= 10`.

`condition()` also takes in an optional second argument which is the `defaultValue` that will be used to map to `destination.<some_member>` for when the `src.<some_member>` is _falsy_ OR the `predicateFn` returns _falsy_

```typescript
const user = new User();
user.firstName = 'John';
user.lastName = 'Doe';
user.age = 9;
user.bio = 'Developer';

const vm = Mapper.map(user, UserVm);
/**
 * UserVm { firstName: 'John', lastName: 'Doe', ..., fullName: null, ... }
 */

Mapper.createMap(User, UserVm).forMember(
  dest => dest.fullname,
  opts => opts.condition(src => src.age > 10, 'default value')
);
const vm2 = Mapper.map(user, UserVm);
/**
 * UserVm { firstName: 'John', lastName: 'Doe', ..., fullName: 'default value', ... }
 */
```

`condition()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `Condition`.
