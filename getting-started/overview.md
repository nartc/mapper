---
title: Overview
description: What AutoMapper TypeScript is, the problems it solves, and when conventions are a good fit.
---

## What AutoMapper does

AutoMapper maps one object shape to another by convention. When source and destination models use matching property names and compatible metadata, the mapper can copy values without per-property configuration.

Use mapping configuration only for the differences: computed values, renamed members, conversions, conditions, or nested types that cannot be inferred.

## When it fits

AutoMapper is most useful when:

- destination types are mostly subsets or projections of source types;
- property names follow consistent conventions;
- you repeatedly map domain, persistence, API, or view models;
- central mapping profiles are easier to maintain than scattered constructors and object literals.

If most destination members need custom business logic, explicit transformation code is usually clearer.

## How it is structured

Every mapper combines `@automapper/core` with one mapping strategy:

| Strategy      | Use it for                                                  |
| ------------- | ----------------------------------------------------------- |
| `classes()`   | TypeScript classes with `@AutoMap()` metadata               |
| `pojos()`     | Interfaces, types, and plain objects with explicit metadata |
| `mikro()`     | MikroORM entities; extends the classes strategy             |
| `sequelize()` | Sequelize models; extends the classes strategy              |

The `@automapper/nestjs` package integrates a mapper with NestJS dependency injection, profiles, interceptors, and pipes.

## The basic flow

```ts
import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

createMap(mapper, User, UserDto);

const dto = mapper.map(user, User, UserDto);
```

## Types follow the destination

The destination identifier drives the result type across single, array, and asynchronous mapping. These types come from the TypeScript compiler; hover an identifier to inspect it in place.

{/* prettier-ignore */}
```ts twoslash
import type { Mapper } from "@automapper/core";
import { createMap } from "@automapper/core";

class User {
  firstName!: string;
  lastName!: string;
}

class UserDto {
  firstName!: string;
  lastName!: string;
}

declare const mapper: Mapper;
declare const user: User;
declare const users: User[];
// ---cut---
createMap(mapper, User, UserDto);

const dto = mapper.map(user, User, UserDto);
//    ^?


const dtos = mapper.mapArray(users, User, UserDto);
//    ^?


const pending = mapper.mapAsync(user, User, UserDto);
//    ^?


```

Continue with [Installation](/getting-started/installation), or follow the [tutorial](/tutorial/preface) for a complete example.
