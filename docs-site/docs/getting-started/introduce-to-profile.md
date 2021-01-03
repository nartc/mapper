---
id: introduce-to-profile
title: Introduce to Profile
sidebar_label: Introduce to Profile
---

In the previous section, we've created our first mapping and some mapping configurations.

```ts
mapper
  .createMap(Bio, BioDto, {
    namingConventions: {
      source: new CamelCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    },
  })
  .forMember(
    (destination) => destination.birthday,
    mapFrom((source) => source.birthday.toDateString())
  );

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.fullName,
  mapFrom((source) => source.firstName + ' ' + source.lastName)
);
```

This approach works completely fine but when our application starts growing with more models, these configurations will also start growing. A `Profile` is to help with this.

## What is `Profile`?

In the context of AutoMapper, `Profile` is a container of a collection of mappings between models that are highly related to each other (eg: a pair of `User` and `UserDto` is highly related).

The purpose is to _separate the concern_ more. In terms of Folder Structure, we tend to group our models together in one place, or we separate them out into different modules (aka Feature). For the latter, `Profile` is a great solution to keep Mappings of related models of a single Feature in one place and close to the models of that Feature.

## Create our first `Profile`

In `@automapper/*`, `Profile` is a `MappingProfile` function that has the `Mapper` as the argument and returns nothing (aka `void`). With this in mind, we will start with our `bioProfile`

```ts
import type { MappingProfile } from '@automapper/types';

export const bioProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(Bio, BioDto, {
      namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
      },
    })
    .forMember(
      (destination) => destination.birthday,
      mapFrom((source) => source.birthday.toDateString())
    );
};
```

When we have more models related to `Bio` entity, we can place them all in this profile without polluting other business logic in some other area.

> We repeat the same process for `userProfile`

## Using `Profile`

In the area where we call `createMap()` before creating our `Profile`, we can now call `addProfile()` instead

```ts
mapper.addProfile(bioProfile).addProfile(userProfile);
```

`mapper.addProfile()` returns the `Mapper` object, so we can chain `addProfile()` to add multiple `Profile` in one place.

> Note: We add `bioProfile` first because order still matters here

## Summary

- `Profile` helps with **Separation of Concern** more by keeping our models, and their mappings close together.
- `Profile` is a `MappingProfile` function that has `Mapper` object as the first argument and returns `void`.
- Call `mapper.addProfile()` to use the `MappingProfile` function. `addProfile()` can be chained to add multiple `Profile`.
- Order of `Profile` still matters.
