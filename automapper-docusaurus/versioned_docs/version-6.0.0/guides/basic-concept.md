---
id: basic-concept
title: Basic concepts
sidebar_label: Basic concepts
---

As mentioned in [Problems with TypeScript](introduction/problems-with-typescript.md) section, `@nartc/automapper` needs to do a little extra work to be able to function properly.
In other words, `@nartc/automapper` utilizes `PropertyDecorator` to have some **Reflection** for a class's properties. Here, you'll learn about some basic concepts that are in `@nartc/automapper`.
These are all `internal` to `@nartc/automapper` except for the `AutoMap` decorator but it helps to understand the terminology that the library is using.

### AutoMap

The `PropertyDecorator` is applied on each properties of a class like the following:

```typescript
class User {
  @AutoMap() firstName: string;
  @AutoMap() lastName: string;
  @AutoMap() age: number;
}

class UserVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  fullName: string;
  @AutoMap()
  isAdult: number;
}
```

`@AutoMap()` is a `PropertyDecorator` and will be executed first when **TypeScript** runs. This `decorator`'s job is to keep track of the `properties` on a class as `metadata` so these `metadata` will be available at runtime.
A `metadata` will include: `propertyName` and its `type` so `@nartc/automapper` knows how to map properly for each data type.

### Constructible

A `Constructible` is a model. It is, in fact, an `internal type` that `@nartc/automapper` makes use of to support its type-definitions. From the snippet above, `User` (the class itself) would be a `Constructible` and `new User()` would be an **instance** of `User`.

### AutoMapper

`AutoMapper` is the first-class citizen in `@nartc/automapper`. It is, along with its **instance methods**, exposed as **public API** by `@nartc/automapper`

### `const` Mapper

`@nartc/automapper` exposes a **singleton** as a variable named `Mapper` which is an instance of `AutoMapper`. However, you can always create your own instance of `AutoMapper` if you so desire.
Each instance of `AutoMapper` will have their own set of _non-shared_ `Mappings` and `Profiles`. The documentations will use the **singleton** `Mapper` from start to end.

```typescript
import { Mapper } from '@nartc/automapper';
```

### Mapping

A `Mapping` is a record that acts as a configuration between a `Source` model (`User`) and a `Destination` model (`UserVm`) which holds many different information relating to the `Source` and the `Destination`.
The **three** most important information are: `source`, `destination` and `properties`. The other information is also important but we will learn about those in the [Usages](../usages/init/create-map.md) section.

- `source`: a `Constructible` of `Source` model.
- `destination`: a `Constructible` of `Destination` model.
- `properties`: a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that holds information about all **auto-configured** and **custom-configured** properties and their individual `MappingProperty`.

Not to be confused with `Map operation`, sometimes you will see `Map operation` in the documentations, that is referring to the actual `mapping operation` that will happen by invoking `.map()` method on the **AutoMapper** instance.

### MappingProperty

A `MappingProperty` is an instruction to show `@nartc/automapper` how to map a particular `member` (`property`) of the `Destination` based on some `member` from the `Source`.
`MappingProperty` has information about the `destinationMemberPath` (eg: `user.company.name`, this is a `path`) and its `MappingTransformation` instruction.

### MappingTransformation

For each `MappingProperty`, `@nartc/automapper` will try to apply the `MappingTransformation` on that `MappingProperty` with its `destinationMemberPath`. A `MappingTransformation` contains
all information that is needed to determine how a `member` should be mapped. When consuming `@nartc/automapper`, you will actually configure the `MappingTransformation`. There are currently 9 `TransformationType`:

| TransformationType | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Ignore             | Ignore a `member` on the `Destination`                                                              |
| MapFrom            | Custom mapping instruction for a `member`                                                           |
| Condition          | Conditionally mapping a _conventionally matching_ `member`                                          |
| FromValue          | Map a raw value to a `member`                                                                       |
| MapWith            | Map nested `model` for a `member` where **auto-configuration** does not work                        |
| ConvertUsing       | Map a `member` using a `Converter`                                                                  |
| MapInitialize      | **auto-configured** mapping instruction for a `member` that is added by `@nartc/automapper`         |
| NullSubstitution   | Substitute a null value on the `Source.member` for `Destination.member`                             |
| MapDefer           | Defer a `MapFunction` with a function that takes in the `Source` and the current `SourceMemberPath` |

There is **one** other type which is `PreCondition` that can be combined with any of the other `TransformationType` except for `MapInitialize`. We will explore each of the `TransformationType` in more details later.
