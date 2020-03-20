---
id: from-value
title: FromValue
sidebar_label: FromValue
---

`fromValue()` takes in a raw value to map to `destination.<some_member>`. Please take note that if you pass in an object to `fromValue()`, that object will be mapped without consideration for any `Mapping`

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.fullName,
  fromValue('Some raw value')
);
```

`fromValue()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `FromValue`.
