---
title: Create a mapper
description: Configure the classes strategy and describe class metadata with AutoMap decorators.
---

## Install the packages

**npm**

```shell
npm install @automapper/core @automapper/classes reflect-metadata
```

**pnpm**

```shell
pnpm add @automapper/core @automapper/classes reflect-metadata
```

**Bun**

```shell
bun add @automapper/core @automapper/classes reflect-metadata
```

Enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`, then import `reflect-metadata` before decorated classes are evaluated.

## Create one mapper

```ts title="src/mappings/mapper.ts"
import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';

export const mapper = createMapper({
  strategyInitializer: classes(),
});
```

A typical application keeps one mapper per strategy. Mappings registered on that mapper are reused by every map operation.

## Describe class metadata

Decorate properties that participate in mapping. Give nested classes an explicit type callback and omit sensitive properties that should not be mapped by convention.

**user.ts**

```ts
import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  firstName!: string;

  @AutoMap()
  lastName!: string;

  @AutoMap()
  username!: string;

  password!: string;

  @AutoMap(() => Bio)
  bio!: Bio;
}

export class Bio {
  @AutoMap(() => Job)
  job!: Job;

  @AutoMap()
  birthday!: Date;

  @AutoMap()
  avatarUrl!: string;
}

export class Job {
  @AutoMap()
  title!: string;

  @AutoMap()
  salary!: number;
}
```

**user.dto.ts**

```ts
import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  firstName!: string;

  @AutoMap()
  lastName!: string;

  @AutoMap()
  fullName!: string;

  @AutoMap()
  username!: string;

  @AutoMap(() => BioDto)
  bio!: BioDto;
}

export class BioDto {
  @AutoMap()
  jobTitle!: string;

  @AutoMap()
  jobSalary!: number;

  @AutoMap()
  birthday!: string;

  @AutoMap()
  avatarUrl!: string;
}
```

The classes strategy can infer primitive design types. Nested models and arrays should use explicit callbacks such as `@AutoMap(() => Bio)` and `@AutoMap(() => [User])`.
