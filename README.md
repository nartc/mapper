# AutoMapper

An object-to-object mapper by convention for TypeScript.

![Travis (.com)](https://img.shields.io/travis/com/nartc/mapper?label=travis)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@nartc/automapper?label=bundlephobia)
![npm](https://img.shields.io/npm/dt/@nartc/automapper?label=total)
![npm (scoped)](https://img.shields.io/npm/v/@nartc/automapper)
![NPM](https://img.shields.io/npm/l/@nartc/automapper)
![Coveralls github](https://img.shields.io/coveralls/github/nartc/mapper)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nartc/mapper)

#### Migrations to v6

- `initialize()` has been deprecated in `v6`. Please use `createMap()`, `addProfile()`, and/or `withGlobalSettings()` directly
- Mapping operations have been rewritten as individual functions to support **tree-shaking**, please migrate your `mapping configurations` to use those

```typescript
// before
Mapper.createMap(Source, Destination)
    .forMember(d => d.destMember, opts => opts.mapFrom(s => s.sourceMember);

// after
Mapper.createMap(Source, Destination)
    .forMember(d => d.destMember, mapFrom(s => s.sourceMember))
```

- Pre-Condition: `preCondition()` is also a separate function. Use in v6 as follow

```typescript
// before
Mapper.createMap(Source, Destination).forMember(
  d => d.destMember,
  opts => opts.preCondition(predicate).mapFrom(s => s.sourceMember)
);

// after
Mapper.createMap(Source, Destination).forMember(
  d => d.destMember,
  preCondition(predicate),
  mapFrom(s => s.sourceMember)
);
```

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
- [x] Async (Read more at [Async Support](https://automapper.netlify.app/docs/introduction/async))
- [x] Before/After Callback
- [x] Naming Conventions
- [x] Null Substitution - [@lqmanh](https://github.com/lqmanh) pointed out the difference in `fromValue()` and `nullSubstitution()` use-case, and that difference is totally valid. Hence, `nullSubstitution` is now supported.

- [x] Circular Dependencies
- [x] Tree-shakable

#### Unsupported features:

- [ ] Type Converters
- [ ] Value Transformers

#### Circular Dependencies

Please check out the [Circular Dependencies Documentations](https://automapper.netlify.app/docs/usages/avoids/circular-dependency)

## Documentations

Check out the [AutoMapper TypeScript Documentations](https://automapper.netlify.com)

## Demo

[Codesandbox Demo](https://codesandbox.io/s/automapper-demo-latest-ms1c3)

## Contribution

Contribution of any kind is always welcomed.

#### MIT License
