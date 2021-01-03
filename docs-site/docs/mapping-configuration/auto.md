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
mapper.createMap(Foo, FooDto, { extends: [mapper.getMapping(Base, BaseDto)] })
```

When `Mapper` executes the mapping operation from `Foo` to `FooDto`, the `base` property will also be mapped correctly based on `Mapping<Base, BaseDto>`

Custom configuration can still override the merged configuration from `extends`

```ts
import { mapFrom } from '@automapper/core';

mapper.createMap(Foo, FooDto, { extends: [mapper.getMapping(Base, BaseDto)] })
  .forMember(
    destination => destination.base,
    mapFrom(source => source.foo)
  )
```

Now, `Mapper` will map `base` with `source.foo` instead of `source.base` when it executes the mapping operation from `Foo` to `FooDto`.
