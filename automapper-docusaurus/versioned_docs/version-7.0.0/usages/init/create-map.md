---
id: create-map
title: CreateMap
sidebar_label: CreateMap
---

First of all, let's take a look at how you can create a `Mapping` between two classes. `AutoMapper` exposes an `instance method` named `createMap()` for this purpose.

```typescript
import { Mapper } from '@nartc/automapper'

class Source { ... } //  can also be imported from other file
class Destination { ... } // can also be imported from other file

Mapper.createMap(Source, Destination);
```

`createMap()` will create a `Mapping` between `Source` and `Destination` (`Mapping<Source, Destination>` as its type-definition)

```typescript
class Source {
  @AutoMap()
  foo: string;
  @AutoMap()
  bar: number;
}

class Destination {
  @AutoMap()
  foo: string;
  @AutoMap()
  bar: number;
}
```

`createMap()` **auto-configures** some **conventionally matching** members between `Source` and `Destination`. Here, `Destination.foo` will be configured to be mapped from `Source.foo`
and `Destination.bar` will be configured to be mapped from `Source.bar`.

> `@nartc/automapper` works based on **convention** so you need to make sure that the `type` of **matching** members match as well as their `name`.

`createMap()` can be called multiple times to create as many `Mapping` as needed.

```typescript
class Source { ... }
class DestinationOne { ... }
class DestinationTwo { ... }

class OtherSource { ... }
class OtherDestination { ... }

Mapper.createMap(Source, DestinationOne);
Mapper.createMap(Source, DestinationTwo);
Mapper.createMap(OtherSource, OtherDestination);
```

> A `Mapping` for each pair of classes is **unique**. `@nartc/automapper` will throw an `Error` if you're trying to create a `Mapping` for the same pair twice.

Take note here that `Source` and `OtherSource` usually represent **Domain Models** (data that go in the database). While `createMap()` works well as intended, sometimes you want to separate the concern for each
of the **Domain Model**. To help achieve that, `@nartc/automapper` has a concept of `Profile` to organize your `Mappings` (Read more about it from [C# AutoMapper](https://docs.automapper.org/en/stable/Configuration.html#profile-instances))
