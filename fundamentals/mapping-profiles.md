---
title: Mapping profiles
description: Organize related mapping declarations and share configuration across them.
---

A `MappingProfile` groups mappings that belong to the same feature or domain. It is a function that receives a mapper and registers mappings with `createMap()`.

```ts
const userProfile: MappingProfile = (mapper) => {
  createMap(mapper, Address, AddressDto);
  createMap(mapper, User, UserDto);
  createMap(mapper, User, UserSummaryDto);
};
```

Register the profile once during application startup:

```ts
addProfile(mapper, userProfile);
```

## Shared configuration

Additional `addProfile()` arguments apply to every mapping created inside that profile:

```ts
addProfile(
  mapper,
  userProfile,
  namingConventions(new CamelCaseNamingConvention()),
  extend(BaseEntity, BaseDto),
);
```

Keep profiles focused. Separate unrelated domains, and register profiles in dependency order when one profile relies on a nested mapping from another.

NestJS applications can express profiles as injectable classes by extending [`AutomapperProfile`](/nestjs#profiles).
