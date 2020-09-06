---
id: pre-condition
title: PreCondition
sidebar_label: PreCondition
---

`PreCondition` works in a similar manner as [Condition](for-member/condition). However, `PreCondition` is just a pre-check on some expression
to determine whether the following mapping operation should be able to proceed or not. `PreCondition` can be turned on by calling `preCondition()`

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.foo,
  preCondition(source => source.age >= 10),
  mapFrom(source => source.bar)
);
```

The above mapping operation will only be proceeded if `source.age >= 10`. If `source.age < 10` (or the expression is _falsy_), then `dest.foo` will receive a `null` value.

Same as [Condition](./for-member/condition.md), `preCondition()` also takes in an optional second argument for `defaultValue` which will be used to map to `destination.<some_member>` instead of `null`.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.foo,
  preCondition(source => source.age >= 10, 'default value'),
  mapFrom(source => source.bar)
);
```

If `source.age < 10`, `dest.foo` will receive `'default value'` instead of `null`. Please take note that `defaultValue` respects the `type` of `destination.<some_member>`. In this case, `dest.foo` is a `string` so you can only pass in a `string` for `defaultValue`.
