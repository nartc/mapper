---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

![travis](https://badgen.net/travis/nartc/mapper)
![bundlephobia](https://badgen.net/bundlephobia/minzip/@nartc/automapper)
![downloads](https://badgen.net/npm/dt/@nartc/automapper)
![npm](https://badgen.net/npm/v/@nartc/automapper)
![license](https://badgen.net/github/license/nartc/mapper)
[![Coverage Status](https://coveralls.io/repos/github/nartc/mapper/badge.svg?branch=master)](https://coveralls.io/github/nartc/mapper?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/nartc/mapper.svg)](https://greenkeeper.io/)

- NPM

```bash
npm install @nartc/automapper
```

```bash
npm i @nartc/automapper
```

- Yarn:

```bash
yarn add @nartc/automapper
```

`@nartc/automapper` utilizes `reflect-metadata` for the **Reflection** capabilities as a `peerDependency` so you will also need to install `reflect-metadata`

```bash
npm i reflect-metadata
```

In `tsconfig.json`, you need to make sure to turn on `emitDecoratorMetadata` and `experimentalDecorators` flags as `@nartc/automapper` makes use of **Decorators**.

```json
// sample tsconfig.json

{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### Lodash Note

`@nartc/automapper` uses `lodash.set` from `lodash`. Since `set` is the only method that `@nartc/automapper` needs from `lodash`, I only have `lodash.set` installed as a single-method library to minimize the bundle size as much as possible.
`lodash.set` is a `dependency` so it will be installed automatically with `@nartc/automapper`.

### Support

- [x] Basic Mapping between two classes
- [x] Basic Mapping for nested classes
- [x] Mapping Inheritance - with caveats regarding typings.
- [x] Array/List Mapping
- [x] Flattening
- [x] ReverseMap
- [x] Value Converters
- [x] Value Resolvers
- [x] Async
- [x] Before/After Callback
- [x] Naming Conventions
- [x] Null Substitution - [@lqmanh](https://github.com/lqmanh) pointed out the difference in `fromValue()` and `nullSubstitution()` use-case, and that difference is totally valid. Hence, `nullSubstitution` is now supported.


### Example

Now you can start decorating your class's properties with `AutoMap`

```typescript
class User {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  age: number;
  @AutoMap()
  bio: string;
}

class UserVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  age: number;
  @AutoMap()
  bio: string;
}

Mapper.createMap(User, UserVm);

// A User instance. Can also be fetched from the database
const user = new User();
user.firstName = 'Chau';
user.lastName = 'Tran';
user.age = 28;
user.bio = 'Developer';

/**
 * User { firstName: 'Chau', lastName: 'Tran', age: 28, bio: 'Developer' }
 */

const vm = Mapper.map(user, UserVm);
/**
 * UserVm { firstName: 'Chau', lastName: 'Tran', age: 28, bio: 'Developer' }
 */

 // Pseudo code to get a list of Users
 const users = this.db.User.findAll();
 const vms = Mapper.mapArray(users, UserVm);
 /**
  * [UserVm, UserVm, UserVm ...]
  */
```

> More complex mapping examples will be addressed in later sections. And you probably already notice the verbose issue with `@AutoMap()`, check out the [Plugin]() section to learn how to address this. Throughout the documentations, I will keep the `@AutoMap()` decorator in the sample snippets to make the documentations clear.
