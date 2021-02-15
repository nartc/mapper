---
id: introduce-to-pojos
title: Introduction
sidebar_label: Introduction
---

`@automapper/pojos` is one of the official plugins of `@automapper/*` monorepo. `@automapper/pojos` works with plain objects along with their Interfaces/Types.

## Installation

```bash
npm i @automapper/pojos
# or with yarn
yarn add @automapper/pojos
```

## Usage

The only differences between `@automapper/pojos` and `@automapper/classes` are:

- `createMetadataMap` to store metadata instead of `@AutoMap()` decorator. See [createMetadataMap](pojos-metadata.md)
- Use unique `string` as `metaKey` instead of class constructor (eg: `"User"` vs `User`)

```ts
import { createMetadataMap } from '@automapper/pojos';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  bio: Bio;
}

export interface Bio {
  job: Job;
  birthday: Date;
  avatarUrl: string;
}

export interface Job {
  title: string;
  salary: number;
}

export interface UserDto {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  bio: BioDto;
}

export interface BioDto {
  jobTitle: string;
  jobSalary: number;
  birthday: string;
  avatarUrl: string;
}

createMetadataMap<Job>('Job', {
  title: String,
  salary: Number,
});

createMetadataMap<Bio>('Bio', {
  job: 'Job',
  avatarUrl: String,
});

createMetadataMap<User>('User', {
  firstName: String,
  lastName: String,
  username: String,
  bio: 'Bio',
});

createMetadataMap<BioDto>('BioDto', {
  jobTitle: String,
  jobSalary: String,
  avatarUrl: String,
});

createMetadataMap<UserDto>('UserDto', 'User', {
  fullName: String,
  bio: 'BioDto',
});

mapper
  .createMap<Bio, BioDto>('Bio', 'BioDto', {
    namingConventions: {
      source: new CamelCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    },
  })
  .forMember(
    (destination) => destination.birthday,
    mapFrom((source) => source.birthday.toDateString())
  );

mapper.createMap<User, UserDto>('User', 'UserDto').forMember(
  (destination) => destination.fullName,
  mapFrom((source) => source.firstName + ' ' + source.lastName)
);

function getUserDto(username: string): UserDto {
  const user = fetchUserByUsernameFromDb(username);
  return mapper.map<User, UserDto>(user, 'UserDto', 'User');
}
```
