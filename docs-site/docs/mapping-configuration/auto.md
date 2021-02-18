---
id: auto
title: Auto in AutoMapper
sidebar_label: Auto in AutoMapper
---

## Matching properties

We have already seen that matching properties are mapped automatically with the help of `@AutoMap()` decorator (with `classes` plugin)

> For `@automapper/pojos`, there is a different approach.

```ts
class Foo {
  @AutoMap()
  foo: string;
}

class FooDto {
  @AutoMap()
  foo: string;
}
```

## Flattening

Flattening is only applied when `namingConventions` is set either on the `Mapping` or globally.

```ts
class Bar {
  @AutoMap()
  baz: string;
}

class Foo {
  @AutoMap()
  foo: string;
  @AutoMap(() => Bar)
  bar: Bar;
}

class FooDto {
  @AutoMap()
  foo: string;
  @AutoMap()
  barBaz: string;
}
```

**Matching Properties** and **Flattening** are to encourage the consumers to structure their data models in a coherent way, so they can get the most out of an AutoMapper.

## Extends other `Mapping`

When invoking `mapper.createMap()`, we've already seen how we can pass `namingConventions` to the 3rd argument, `CreateMapOptions`. `CreateMapOptions` also accepts a property called `extends: Mapping[]`.

This is typed very loosely so make sure to align the models properly when utilizing this feature. `extends` will instruct `Mapper` to merge the existing configurations of the other `Mapping` with the mapping configuration it's trying to create upon initialization.

```ts
class Base {
  @AutoMap()
  base: string;
}

class BaseDto {
  @AutoMap()
  base: string;
}

class Foo extends Base {
  @AutoMap()
  foo: string;
}

class FooDto extends BaseDto {
  @AutoMap()
  foo: string;
}

mapper.createMap(Base, BaseDto);
mapper.createMap(Foo, FooDto, { extends: [mapper.getMapping(Base, BaseDto)] });
```

When `Mapper` executes the mapping operation from `Foo` to `FooDto`, the `base` property will also be mapped correctly based on `Mapping<Base, BaseDto>`

Custom configuration can still override the merged configuration from `extends`

```ts
import { mapFrom } from '@automapper/core';

mapper
  .createMap(Foo, FooDto, { extends: [mapper.getMapping(Base, BaseDto)] })
  .forMember(
    (destination) => destination.base,
    mapFrom((source) => source.foo)
  );
```

Now, `Mapper` will map `base` with `source.foo` instead of `source.base` when it executes the mapping operation from `Foo` to `FooDto`.

## Arrays of objects

Arrays of objects are **auto-mapped** if they also follow convention. Assume the following case:

```ts
export class Address {
  @AutoMap()
  street: string;
  @AutoMap()
  city: string;
  @AutoMap()
  state: string;
}

export class User {
  @AutoMap(() => Address)
  addresses: Address[];
}

export class AddressDto {
  @AutoMap()
  formattedAddress: string;
}

export class UserDto {
  @AutoMap(() => AddressDto)
  addresses: AddressDto[];
}
```

Notice that `User#addresses` and `UserDto#addresses` are **conventionally matching**. If we provide the metadata (with `AutoMap` like above) and create the respective `Mapping`, `@automapper/*` should be able to **automatically** map `User#addresses` as `Address[]` to `UserDto#addresses` as `AddressDto[]`

```ts
mapper.createMap(Address, AddressDto).forMember(
  (d) => d.formattedAddress,
  mapFrom((s) => s.street + ' ' + s.city + ' ' + s.state)
);

mapper.createMap(User, UserDto);
```

Check out this [Stackblitz](https://stackblitz.com/edit/typescript-automapper-jlxuv8) for usage with `pojos`

## Enums

`@automapper/*` does not care about Enum type because ultimately the value type of these enum properties are either `string` or `number`. To work with enums, please provide `String` or `Number` to your enum properties. This applies to both `classes` and `pojos` plugins

```ts
// classes

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class User {
  @AutoMap(() => String) // because UserRole is a string enum
  role: UserRole;
}

// pojos

export interface User {
  role: UserRole;
}

createMetadataMap<User>('User', {
  role: String, // because UserRole is a string enum
});
```
