---
title: forMember
description: Select a destination path and assign one member-mapping function, with an optional precondition.
sidebar:
  label: Overview
---

`forMember()` targets one destination member and assigns its transformation:

The callbacks are contextually typed from the source and destination passed to `createMap()`.

{/* prettier-ignore */}
```ts twoslash
import type { Mapper } from "@automapper/core";
import { createMap, forMember, mapFrom } from "@automapper/core";

declare const mapper: Mapper;

class User {
  firstName!: string;
  lastName!: string;
}

class UserDto {
  fullName!: string;
}
// ---cut---
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    //   ^?


    mapFrom((source) => `${source.firstName} ${source.lastName}`),
    //           ^?


  ),
);
```

The destination selector is strongly typed. The second argument determines how AutoMapper produces that value.

## Precondition

Add `preCondition()` before the member function to skip its work unless a source predicate succeeds. An optional default is assigned when the predicate fails.

```ts
forMember(
  (destination) => destination.fullName,
  preCondition((source) => source.visible, "Hidden user"),
  mapFrom((source) => `${source.firstName} ${source.lastName}`),
);
```

Use custom members for exceptions to convention. If almost every destination path needs one, an explicit transformation may be easier to understand.
