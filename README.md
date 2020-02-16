# AutoMapper

An object-to-object mapper by convention for TypeScript.

![travis](https://badgen.net/travis/nartc/mapper)
![bundlephobia](https://badgen.net/bundlephobia/minzip/@nartc/automapper)
![downloads](https://badgen.net/npm/dt/@nartc/automapper)
![npm](https://badgen.net/npm/v/@nartc/automapper)
![license](https://badgen.net/github/license/nartc/mapper)
[![Coverage Status](https://coveralls.io/repos/github/nartc/mapper/badge.svg?branch=master)](https://coveralls.io/github/nartc/mapper?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/nartc/mapper.svg)](https://greenkeeper.io/)

#### Migrations from `automapper-nartc`

The only migration step you need is to modify `forMember()` method.

In `automapper-nartc`, `forMember()` takes in a `property string` as the first argument. Now, `forMember()` in `@nartc/automapper` takes in a `selector` instead. This wil allow `reverseMap()` to work better.

```typescript
// Before
Mapper.createMap(User, UserVm)
  .forMember('fullName', opts => opts.mapFrom(...));

// Now
Mapper.createMap(User, UserVm)
  .forMember(dest => dest.fullName, opts => opts.mapFrom(...));
```

#### Migrations to v3

- Change `@Expose()` and `@ExposedType()` to `@AutoMap()`

```typescript
// Before
class User {
  @Expose()
  firstName: string;
  @ExposedType(() => Profile)
  profile: Profile;
}

// v3
class User {
  @AutoMap()
  firstName: string;
  @AutoMap(() => Profile)
  profile: Profile;
}
```

## Features

So far, the following is supported:

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

#### Unsupported features:

- [ ] Type Converters - Help needed
- [ ] Value Transformers

## Documentations

Check out the [AutoMapper TypeScript Documentations](https://automapper.netlify.com)

## Demo

[Codesandbox Demo](https://codesandbox.io/s/automapper-demo-ntc2d)

## Contribution

Contribution of any kind is always welcomed.

#### MIT License
