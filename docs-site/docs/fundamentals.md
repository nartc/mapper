---
id: fundamentals
title: Fundamentals
sidebar_label: Fundamentals
---

We have looked at the [Basic example](getting-started/introduce-to-automapper) but in order to get into some more details of AutoMapper, we need to be aware of some of the definitions used in `@automapper/*`

## Mapper

`Mapper` is the first-class citizen in `@automapper/*`. All [Mapping Configuration](mapping-configuration/auto) and Map Operations are handled by `Mapper`.

`Mapper` is created by invoking `createMapper()` along with a [Plugin](plugins-system/introduce-to-plugins)

## Mapping

`Mapping` is a contract between a **Source** model and a **Destination** model. In our [Basic example](getting-started/introduce-to-automapper), our `User` is **Source** while `UserDto` is **Destination**.

`Mapping` contains metadata as well as some configurations about the **Source** and **Destination**: models, naming conventions, map callbacks, [mapping properties](#mappingproperty) etc... We know what **models** mean. We will explore the other definitions in other sections.

`Mapping` is created by invoking `mapper.createMap()`. Within a `Mapper`, a `Mapping` is **uni-directionally unique**. In other words, we can have both `Mapping<Source, Destination>` and `Mapping<Destination, Source>`.

## MappingProperty

`MappingProperty` is a record of information about a particular member on the **Destination** along with its [Mapping Transformation](#mappingtransformation).

## MappingTransformation

`MappingTransformation` is an instruction of how a `Mapper` should map a particular member on the **Destination**. `MappingTransformation` operates based on different types of [Transformation Type](#transformationtype).

## TransformationType

There are currently 9 `TransformationType` in `@automapper/core`.

`@automapper/core` exposes a collection of `MemberMapFunction`. Each function will return an appropriate `TransformationType`.

These functions are all separate and pure-functions which allows for **Tree-shaking**-enabled bundler to optimize the bundle-size of the consumers.

| Type             | MemberMapFunction          | Description                                                                                                                                                                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ignore           | `ignore()`                 | Ignore a member on the **Destination**                                                                                                                                                                       |
| MapFrom          | `mapFrom()`                | Customized instruction for a member                                                                                                                                                                          |
| Condition        | `condition()`              | If the member on the **Destination** matches with another member on the **Source**, this will conditionally map the member on the **Source** to **Destination** if some predicate is evaluated to **truthy** |
| FromValue        | `fromValue()`              | Map a raw value to the member                                                                                                                                                                                |
| MapWith          | `mapWith()`                | In some cases where nested models do not work automatically, this is to specify the nested **Destination** of the member as well as the nested **Source**                                                    |
| ConvertUsing     | `convertUsing()`           | Map a member using [Converters](mapping-configuration/convert-using)                                                                                                                                         |
| NullSubstitution | `nullSubstitution()`       | If the member on **Source** is `null`, this will substitute the `null` value with a different value for that member on **Destination**                                                                       |
| MapDefer         | `mapDefer()`               | This can be used to _defer_ a `TransformationType` with the **Source**. For example, if **Source** has data A, we want `MapFrom` but if **Source** has B, we want to `Ignore`                                |
| MapWithArguments | `mapWithArguments()`       | This can be used to _map_ with extra arguments where the arguments come in at runtime when `map()` is invoked                                                                                                |
| MapInitialize    | internal `mapInitialize()` | This is used **internally** to initialize the `MappingProperty` with the **Destination** metadata                                                                                                            |

## NamingConvention

As the name suggests, `NamingConvention` allows for `Mapper` to map models with different casing. `@automapper/core` provides 3 conventions:

- `CamelCaseNamingConvention`
- `PascalCaseNamingConvention`
- `SnakeCaseNamingConvention`

By default, `@automapper/*` does not set a default convention. [Flattening](mapping-configuration/auto/#flattening) can only be applied when `NamingConvention` is set on the models, even if they have the same casing.

`NamingConvention` can be applied to a **unique** `Mapping` with `mapper.createMap()`, or can be applied globally to all `Mapping` within a single `Mapper` with `createMapper()`.

```ts
const mapper = createMapper({
  name,
  pluginInitializer,
  namingConventions: new CamelCaseNamingConvention(), // global
});

// or

mapper.createMap(User, UserDto, {
  namingConventions: new CamelCaseNamingConvention(),
});
```
