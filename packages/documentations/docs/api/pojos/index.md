---
id: 'index'
title: '@jersmart/automapper-pojos'
slug: '/api/pojos/'
sidebar_label: 'README'
sidebar_position: 0
custom_edit_url: null
---

# @jersmart/automapper-pojos

This is the official strategy from `@automapper` to work with Interfaces/Types along with Plain Objects

## Installation

```sh
npm i @jersmart/automapper-pojos
```

or with `yarn`:

```sh
yarn add @jersmart/automapper-pojos
```

#### `peerDependencies`

`@jersmart/automapper-pojos` depends on `@jersmart/automapper-core`

```sh
npm i @jersmart/automapper-core
```

or with `yarn`:

```sh
yarn add @jersmart/automapper-core
```

## Usage

`@jersmart/automapper-pojos` provides `pojos` as a `MappingStrategyInitializer`. Pass `pojos()` to `createMapper` to create a `Mapper`
that uses `pojos` strategy.

```ts
import { pojos, PojosMetadataMap } from '@jersmart/automapper-pojos';
import { createMapper, createMap, forMember, mapFrom } from '@jersmart/automapper-core';

const mapper = createMapper({
  ...,
  strategyInitializer: pojos()
});

interface User {
    firstName: string;
    lastName: string;
}

interface UserDto {
    firstName: string;
    lastName: string;
    fullName: string;
}

PojosMetadataMap.create<User>('SomeTokenForUser', {
    firstName: String,
    lastName: String
});

PojosMetadataMap.create<UserDto>('SomeTokenForUserDto', {
  firstName: String,
  lastName: String,
  fullName: String
});

createMap<User, UserDto>(
    mapper,
    'SomeTokenForUser',
    'SomeTokenForUserDto',
    forMember(
        d => d.fullName,
        mapFrom(s => s.firstName + ' ' + s.lastName)
    )
);
mapper.map<User, UserDto>(
    {firstName: 'Auto', lastName: 'Mapper'},
    'SomeTokenForUser',
    'SomeTokenForUserDto'
);
// { firstName: 'Auto', lastName: 'Mapper', fullName: 'Auto Mapper' }
```

Read more about this strategy on [pojos documentation](https://automapperts.netlify.app/docs/plugins-system/introduce-to-pojos)
