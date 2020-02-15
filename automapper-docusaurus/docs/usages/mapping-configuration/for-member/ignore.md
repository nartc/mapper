---
id: ignore
title: Ignore
sidebar_label: Ignore
---

When you want to completely ignore a `destination.<some_member>` and to avoid the `Unampped Error`, you can call `ignore()`

```typescript
Mapper.createMap(Source, Destination).forMember(
  dest => dest.someMember,
  opts => opts.ignore()
);
```

`Destination.someMember` will be set to `null` and `ignored` by the `Unmapped Error`. `ignore()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `Ignore`
