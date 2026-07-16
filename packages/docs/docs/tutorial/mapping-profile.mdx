---
title: Group mappings with profiles
description: Organize related mapping declarations and share configuration across them.
sidebar:
  label: Mapping profiles
---

A `MappingProfile` is a function that receives a mapper and registers a related set of mappings.

For the underlying concept and profile-level configuration, see [Mapping profiles](/fundamentals/mapping-profiles).

```ts
import type { MappingProfile } from '@automapper/core';

export const bioProfile: MappingProfile = (mapper) => {
  createMap(
    mapper,
    Bio,
    BioDto,
    typeConverter(Date, String, (date) => date.toDateString()),
  );
};

export const userProfile: MappingProfile = (mapper) => {
  createMap(
    mapper,
    User,
    UserDto,
    forMember(
      (destination) => destination.fullName,
      mapFrom((source) => `${source.firstName} ${source.lastName}`),
    ),
  );
};
```

Register profiles during startup. Dependency order still matters when one mapping contains another.

```ts
addProfile(mapper, bioProfile);
addProfile(mapper, userProfile);
```

## Share configuration

Additional `addProfile()` arguments apply to every `createMap()` called by that profile:

```ts
const productProfile: MappingProfile = (mapper) => {
  createMap(mapper, Product, ProductDto);
  createMap(mapper, Product, ProductSummaryDto);
};

addProfile(
  mapper,
  productProfile,
  namingConventions(new CamelCaseNamingConvention()),
  extend(BaseEntity, BaseDto),
);
```

NestJS applications usually express the same organization by extending `AutomapperProfile`; see the [NestJS integration](/nestjs).
