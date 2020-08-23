---
id: for-path
title: ForPath
sidebar_label: ForPath
---

`forPath()` acts exactly the same as `forMember()` except for `forPath()` will operate on the `Source` properties while `forMember()` operates on the `Destination` properties.

```typescript
Mapper.createMap(Source, Destination)
  .forMember(dest => dest.destMember, ...)
  .reverseMap()
  .forPath(src => src.srcMember, ...);
```
