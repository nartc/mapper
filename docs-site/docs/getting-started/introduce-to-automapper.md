---
id: introduce-to-automapper
title: Introduce to AutoMapper
sidebar_label: Introduce to AutoMapper
---

Welcome to AutoMapper TypeScript! This basic tutorial will try to show you the problems that AutoMapper tries to solve with some basic functions that are included with `@automapper/*`

## Before AutoMapper

Let's assume we have an application with a particular method to return some `User` information. Our application has the following models:

- `User`: the data of a user from the database
- `UserDto`: the shape of the user data that is exposed as the return type of this method

Each `User` will have a nested `Bio` which also contains a nested `Job`.

```ts
export class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: Bio;
}

export class Bio {
  job: Job;
  birthday: Date;
  avatarUrl: string;
}

export class Job {
  title: string;
  salary: number;
}
```

The DTOs contain almost identical shapes as the Entities. Let's also assume we have some mapping logic on the DTOs

```ts
export class UserDto {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  bio: BioDto;

  static fromUser(user: User) {
    const dto = new UserDto();
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.fullName = user.firstName + ' ' + user.lastName;
    dto.username = user.username;
    dto.bio = BioDto.fromBio(user.bio);

    return dto;
  }
}

export class BioDto {
  jobTitle: string;
  jobSalary: number;
  birthday: string;
  avatarUrl: string;

  static fromBio(bio: Bio) {
    const dto = new BioDto();
    dto.jobTitle = bio.job.title;
    dto.jobSalary = bio.job.salary;
    dto.birthday = bio.birthday.toDateString();
    dto.avatarUrl = bio.avatarUrl;

    return dto;
  }
}
```

```ts
function getUserDto(username: string): UserDto {
  const user = fetchUserByUsernameFromDb(username);
  return UserDto.fromUser(user);
}
```

Pretty straightforward, right? We fetch the user from the database then we call the static method on the `UserDto` to _transform_ a `User` to `UserDto` then return it. Short and sweet, the code looks clean too.

However, there are a couple of problems with the above approach:

- It is not **scalable**. For each of the transformations from some models (let's call these **Source**) to `UserDto`, we're going to have to write a static method `static from*()`. The properties with the same name as the **Source** will have to be repeated over and over in each `static from*()` method. Granted, we can create some reusable function but what if we add more properties to the models?
- It is not **maintainable**. We introduce some tight-coupling. Now `UserDto` needs to know about `User`. Same thing applies to `BioDto` and `Bio`. What if we have our models `extends` some other models? The complexity will increase.

Let's see how AutoMapper can help

## Installing AutoMapper

Start by installing the dependencies

```bash
npm i @automapper/{core,classes}
npm i -D @automapper/types

# or with yarn
yarn add @automapper/{core,classes}
yarn add -D @automapper/types
```


## Enable decorators metadata

Make sure the following decorator switches are on in your `tsconfig`:

```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
```

## Create a `Mapper`

In some separate file called `mapper.ts`, we will start initializing our `Mapper`

```ts
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

export const mapper = createMapper({
  name: 'someName',
  pluginInitializer: classes,
});
```

## Decorating properties with `@AutoMap()` (for `classes` plugin only)

Let's bring our models here once again

```ts
import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  username: string;

  password: string;

  @AutoMap({ typeFn: () => Bio })
  bio: Bio;
}

export class Bio {
  @AutoMap({ typeFn: () => Job })
  job: Job;

  birthday: Date;

  @AutoMap()
  avatarUrl: string;
}

export class Job {
  @AutoMap()
  title: string;

  @AutoMap()
  salary: number;
}
```

```ts
import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  fullName: string; // <- we purposely left this one out

  @AutoMap()
  username: string;

  @AutoMap({ typeFn: () => BioDto })
  bio: BioDto;
}

export class BioDto {
  @AutoMap()
  jobTitle: string;

  @AutoMap()
  jobSalary: number;

  birthday: string; // <- we purposely left this one out

  @AutoMap()
  avatarUrl: string;
}
```

We did the following:

- Removed the mapping logic in the DTOs
- Decorated all the properties with the same name with `@AutoMap()`. For nested model like `BioDto`, we provide a `typeFn` to `@AutoMap()`

## Create a `Mapping<User, UserDto>`

We've prepped our models with `@AutoMap()`, it is time to create the mappings. The mappings are created once and can be separated from the rest of other business logic code.

```ts
mapper.createMap(Bio, BioDto);
mapper.createMap(User, UserDto);
```

## Use the `Mapper`

Now our `getUserDto()` method will look like the following

```ts
function getUserDto(username: string): UserDto {
  const user = fetchUserByUsernameFromDb(username);
  return mapper.map(user, UserDto, User);
}
```

Unfortunately, our `UserDto` is missing some information

```js
const dto = {
  firstName: 'Chau',
  lastName: 'Tran',
  username: 'ctran',
  bio: {
    jobTitle: undefined,
    jobSalary: undefined,
    avatarUrl: 'url.com',
  },
};
```

`fullName` and `bio.birthday` are nowhere to be found. `jobTitle` and `jobSalary` are `undefined`. There is also a `console.error`

```text
Unmapped properties:
-------------------
jobTitle,
jobSalary
```

On the bright side, we can see that the properties, that are matching, are "auto-mapped" correctly. The nested model `bio` is also mapped which is a good sign.

## Explanation of what happened

### `fullName` is missing

On our `UserDto`, we have a property called `fullName` and we did not decorate it with `@AutoMap()`. Without `@AutoMap()`, AutoMapper does not have any information about this `fullName` property on the `UserDto`. If we were to put `@AutoMap()` on `fullName` and re-execute our `getUserDto()` method, we would then get `fullName: undefined`.

The reason is our `User` does not have a `fullName` property. In other words, we can think of `UserDto.fullName` as a computed property. AutoMap cannot _auto_ configure computed properties.

### `birthday` is missing

Same reason as `fullName`. We did not decorate `birthday` with `@AutoMap()`. The difference here is that on `Bio`, we also have `birthday` field. The problem is `Bio.birthday` and `BioDto.birthday` have different data types (`Date` vs `string`).

AutoMapper isn't smart enough to read the consumers' mind on how they want to map from a `Date` to a `string` (even though AutoMapper does have information about each field's data type in most cases).

### `jobTitle` and `jobSalary` are `undefined`

Same reason as above, we decorated `jobTitle` and `jobSalary` so they will be added to the metadata list of `BioDto` but on the `Bio`, we do not have `jobTitle` and `jobSalary`.

The difference between `fullName` and `jobTitle` (or `jobSalary`) is that `jobTitle` and `jobSalary` are flatten properties of `job: Job`

- `jobTitle` vs `job.title`
- `jobSalary` vs `job.salary`

## How to fix

To fix `fullName` and `birthday`, we are going to tap into the Mapping Configuration portion of AutoMapper, which is quite powerful. For `jobTitle` and `jobSalary`, we will utilize **Flattening** capability with [NamingConvention](../fundamentals.md#namingconvention)

Let's remind every one of our Mapping creation

```ts
mapper.createMap(Bio, BioDto);
mapper.createMap(User, UserDto);
```

### Fixing `fullName`

```ts
mapper.createMap(User, UserDto).forMember(
  (destination) => destination.fullName,
  mapFrom((source) => source.firstName + ' ' + source.lastName)
);
```

We call `forMember()` after `createMap()`.

- `forMember()` knows what two models it is being called upon. In this case, those are `User` and `UserDto`
- We pass in a Property Selector for `forMember()` first argument. Because `forMember()` knows about the models, it will have intellisense of what `destination` is
- We pass in a `MemberMapFunction` for `forMember()` second argument. Here, we provide an instruction of how we want to map `destination.fullName`. We said: "For `destination.fullName`, please `mapFrom` `source.firstName` and `source.lastName`"

### Fixing `birthday`

```ts
mapper.createMap(Bio, BioDto).forMember(
  (destination) => destination.birthday,
  mapFrom((source) => source.birthday.toDateString())
);
```

Same concept as above. We said: "For `destination.birthday`, please `mapFrom` `source.birthday.toDateString()`"

### Fixing `jobTitle` and `jobSalary`

`jobTitle` and `jobSalary` are on `BioDto` so we're going to reuse the mapping configuration from the above

```ts
import { CamelCaseNamingConvention } from '@automapper/core';

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
```

`mapper.createMap` accepts an optional third argument `CreateMapOptions` where we can provide a `namingConventions` object with `source` convention and `destination` convention. Here, we provide `CamelCaseNamingConvention` for both. With [NamingConvention](../fundamentals.md#namingconvention), AutoMapper has enough information to apply basic **Flattening** to the mapping.

> `namingConventions` can also take in a single `NamingConvention` if both models use the same `NamingConvention`.
>
> ```ts
> mapper.createMap(Bio, BioDto, {
>   namingConventions: new CamelCaseNamingConvention(),
> });
> ```

Let's re-execute `getUserDto()` and we will now see a complete `UserDto`

```json
{
  "firstName": "Chau",
  "lastName": "Tran",
  "username": "ctran",
  "bio": {
    "jobTitle": "Developer",
    "jobSalary": 123456,
    "avatarUrl": "url.com",
    "birthday": "Sat Jan 02 2021"
  },
  "fullName": "Chau Tran"
}
```

## Summary

- Without AutoMapper, our mapping logic is not maintainable and scalable. We have tight coupling between DTOs and Entities.
- AutoMapper brings **Separation of Concern** and **Conventions over Configuration** to our mapping logic.
  - `firstName`, `lastName`, `username`, and `bio` are _auto-mapped_ correctly
  - `jobTitle` and `jobSalary` are _flatten_ and _auto-mapped_ correctly with [NamingConvention](../fundamentals.md#namingconvention)
- Mapping Configuration is powerful and highly customizable. `fullName` and `birthday` are some of the simplest examples of what Mapping Configuration can provide.
- There are some gotchas:
  - Order of Mapping matters. Because `Bio` and `BioDto` are nested models of `User` and `UserDto`, we create their Mapping first.
  - Verbosity with `@AutoMap()` decorator. This is required although for properties that are manually configured with Mapping Configuration, `@AutoMap()` isn't required.
- Here's the full code:

```ts
import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  username: string;

  password: string;

  @AutoMap({ typeFn: () => Bio })
  bio: Bio;
}

export class Bio {
  @AutoMap({ typeFn: () => Job })
  job: Job;

  birthday: Date;

  @AutoMap()
  avatarUrl: string;
}

export class Job {
  @AutoMap()
  title: string;

  @AutoMap()
  salary: number;
}

export class UserDto {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  fullName: string;

  @AutoMap()
  username: string;

  @AutoMap({ typeFn: () => BioDto })
  bio: BioDto;
}

export class BioDto {
  @AutoMap()
  jobTitle: string;

  @AutoMap()
  jobSalary: number;

  birthday: string;

  @AutoMap()
  avatarUrl: string;
}

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

function getUserDto(username: string): UserDto {
  const user = fetchUserByUsernameFromDb(username);
  return mapper.map(user, UserDto, User);
}
```
