---
id: null-substitution
title: Null Substitution
sidebar_label: Null Substitution
---

`nullSubstitution()` takes in a **raw value** to map to `destination.<some_member>` when `source.<some_member>` is `null`. When you pass in an `object` to `nullSubstitution()`,
same rule for `fromValue()` applies meaning that `object` will be mapped **without** any `Mapping` consideration. The expected value is strong-typed to the `destination.<some_member>` type

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.shouldBeSubstituted,
  nullSubstitution('substituted')
);

const user = new User();
user.firstName = 'John';
user.lastName = 'Doe';

// Case 1: do not assign to user.shouldBeSubstituted

const vm = Mapper.map(user, UserVm);
assert(vm.shouldBeSubstituted === 'substituted');

// Case 2: Assign value to user.shouldBeSubstituted
user.shouldBeSubstituted = 'initial value';
const vm = Mapper.map(user, UserVm);
assert(vm.shouldBeSubstituted === 'initial value');
```

`nullSubstitution()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `NullSubstitution`.
