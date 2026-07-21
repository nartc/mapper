---
title: Configure the differences
description: Compute a member, convert a type, and enable convention-based flattening.
sidebar:
  label: Mapping configurations
---

## Compute `fullName`

Use `forMember()` to target one destination member and `mapFrom()` to select or compute its value.

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    mapFrom((source) => `${source.firstName} ${source.lastName}`),
  ),
);
```

## Convert `birthday`

A type converter applies to every matching source and destination member pair in that mapping.

```ts
createMap(
  mapper,
  Bio,
  BioDto,
  typeConverter(Date, String, (date) => date.toDateString()),
);
```

Use `forMember()` instead when only one destination member should use the conversion.

## Flatten `job`

Auto-flattening splits destination names according to a configured naming convention. With camel case enabled, `jobTitle` can match `job.title` and `jobSalary` can match `job.salary`.

```ts
createMap(
  mapper,
  Bio,
  BioDto,
  typeConverter(Date, String, (date) => date.toDateString()),
  namingConventions(new CamelCaseNamingConvention()),
);
```

The completed mapping returns a DTO with copied, computed, converted, nested, and flattened members while keeping the source and destination classes independent.

## Async values

In v9, `mapFrom()` may return a promise when you call `mapAsync()`:

```ts
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    mapFrom(async (source) => loadDisplayName(source.username)),
  ),
);

const dto = await mapper.mapAsync(user, User, UserDto);
```

Do not call synchronous `map()` for a mapping with asynchronous member resolvers.
