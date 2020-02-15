---
id: basic
title: ForMember Basic
sidebar_label: Basic
---

Beside the **auto-configuration**, `@nartc/automapper` needs to provide a way to allow the consumers to **customize** the mapping configurations on as many things as possible.
Let's take a look at the following snippet:

```typescript
class User {
  @AutoMap() firstName: string;
  @AutoMap() lastName: string;
  @AutoMap() age: number;
  @AutoMap() bio: string;
}

class UserVm {
  @AutoMap() firstName: string;
  @AutoMap() lastName: string;
  @AutoMap() fullName: string;
  @AutoMap() age: number;
  @AutoMap() isAdult: boolean;
  @AutoMap() bio: string;
}
```

When you run `Mapper.createMap(User, UserVm)`, the following properties are **auto-configured** on `UserVm`

```typescript {2,3,5,7}
class UserVm {
  @AutoMap() firstName: string;
  @AutoMap() lastName: string;
  @AutoMap() fullName: string;
  @AutoMap() age: number;
  @AutoMap() isAdult: boolean;
  @AutoMap() bio: string;
}
```

Now when you invoke `map()` to map from an instance of `User` to `UserVm`, you will get an `Error` showing some **unmapped properties**. Namely, `fullName` and `isAdult` in this case.
`fullName` and `isAdult` are not in `User`, hence, `@nartc/automapper` cannot _automap_ them to `UserVm`. To customize the mapping configuration for a `member`, use `forMember()` on `CreateMapFluentFunctions`

> `CreateMapFluentFunctions` is the returned value of `createMap()`

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

`forMember()` takes in two arguments:

1. Destination Member Selector: This argument is a `selectorFn` that receives the `destination` and needs to return the `member` that you want to configure the mapping. Eg: `destination => destination.fullName`
2. ForMember Expression: This argument is a `function` that receives a `DestinationMemberExpressionOptions`. `DestinationMemberExpressionOptions` exposes numerous functions that return the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) accordingly based on which function you use.
   The most common function is `mapFrom()`

The **Selector** approach allows `@nartc/automapper` to provide an extensive typing definitions that greatly improve **Developer Experience**.
