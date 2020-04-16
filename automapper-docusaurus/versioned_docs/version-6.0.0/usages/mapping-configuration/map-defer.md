---
id: map-defer
title: MapDefer
sidebar_label: MapDefer
---

`mapDefer()` is a special type of `MemberMapFunction`. As the name suggests, you can use `mapDefer()` if you want to have
additional logic before you return an actual `MemberMapFunction` in `forMember()` or `forPath()`

`mapDefer()` takes in a `deferFunction` and this `deferFunction` will be executed with the `Source` object and the `SourceMemberPath`
that are being mapped.

```typescript
Mapper.createMap(Source, Destination).forMember(
  dest => dest.foo,
  mapDefer((source, sourceMemberPath) => {
    // sourceMemberPath is a computed value from `dest.foo` selector. In this case, it is "foo"
    if (source.someFlag) {
      return fromValue('value for foo');
    }

    return mapFrom(src => src.fooValue);
  }
);
```

The above snippet shows that you can "defer" the `MemberMapFunction` to be `fromValue()` if a flag returns truthy, else it will be `mapFrom()`.
This is to help with complex mapping configurations that might need to return different `MemberMapFunction` based on different situations.

Using `mapDefer` will set the [TransformationType](../../guides/basic-concept.md#mappingtransformation) to `MapDefer`
