# AutoMapper

An object-to-object mapper by convention for TypeScript.

![Travis (.com)](https://img.shields.io/travis/com/nartc/mapper?label=travis&style=for-the-badge)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@nartc/automapper?label=bundlephobia&style=for-the-badge)
![npm](https://img.shields.io/npm/dt/@nartc/automapper?label=total&style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/@nartc/automapper?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@nartc/automapper?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/nartc/mapper?style=for-the-badge)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nartc/mapper?style=for-the-badge)

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
