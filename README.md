# AutoMapper

An object-to-object mapper by convention for TypeScript.

![travis](https://badgen.net/travis/nartc/mapper)
![bundlephobia](https://badgen.net/bundlephobia/minzip/@nartc/automapper)
![downloads](https://badgen.net/npm/dt/@nartc/automapper)
![npm](https://badgen.net/npm/v/@nartc/automapper)
![license](https://badgen.net/github/license/nartc/mapper)
[![Coverage Status](https://coveralls.io/repos/github/nartc/mapper/badge.svg?branch=master)](https://coveralls.io/github/nartc/mapper?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/nartc/mapper.svg)](https://greenkeeper.io/)

## Documentations

Github Pages
[https://nartc.github.io/mapper/](https://nartc.github.io/mapper/)

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

## Motivations

I've been exposed and accustomed to the `ViewModel` pattern when working on Server Side applications whether it's _NodeJS_ or _.NET Core_. However, _.NET_ has a very powerful Mapper called `AutoMapper` (referred as _the original_) while _JS/TS_ ecosystem does not have one that is up-to-date and/or lacking some features.
I know that `AutoMapper` is weak in `TypeScript` because of how `Reflection` works in `TypeScript`. But, it'd be nice to have some type of `Mapper` that works for `NodeJS` development. After looking around for a while, I found a couple libraries that work well:

1.  `automapper-ts`
2.  `wufe/mapper`

but for the same reasons as above (not up-to-date/lacking), I've decided to create my own taking inspirations from both mentioned libraries so credits to te creator of `automapper-ts` and `wufe/mapper`.

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

#### Future features:

- [ ] Type Converters - Help needed
- [ ] Value Transformers

#### Might not support / Need use-case:

- N/A

Contributions are appreciated.

## Installation

```shell
npm install --save @nartc/automapper
```

```shell
yarn add @nartc/automapper
```

`@nartc/automapper` has a `peerDependency` of `reflect-metadata`, so if you'll need to install `reflect-metadata` as well (chances are you already have `reflect-metadata` installed)

```shell
npm install --save reflect-metadata
```

```shell
yarn add reflect-metadata
```

`@nartc/automapper` depends on `class-transformer` so `class-transformer` will also be installed automatically. I'll try to keep the dependency up-to-date so that when I update `@nartc/automapper`, all the dependencies are up-to-date as well.

#### Lodash Note

`@nartc/automapper` uses single-method `lodash` methods as well. Namely, `lodash.set`. Single methods are used to keep the bundle-size as small as possible. `lodash` and `lodash-es` is treeshakable as well but I do not think I'd need to use some other `lodash` methods anytime soon.

## Usage

1. Assuming you have couple of `Domain Models` as follows:

```typescript
class Address {
  address: string;
  city: string;
  state: string;
  zip: string;
}

class Profile {
  bio: string;
  phone: string;
  email: string;
  addresses: Address[];

  constructor() {
    this.addresses = [];
  }
}

class User {
  firstName: string;
  lastName: string;
  password: string;
  profile: Profile;
}
```

2. And you also have couple of `View Models` (or `DTOs`):

```typescript
class ProfileVm {
  bio: string;
  email: string;
  addressStrings: string[];
}

class UserVm {
  fullName: string;
  profile: ProfileVm;
  firstName?: string;
  lastName?: string;
}
```

3. Decorate all of your properties with `@AutoMap()`. This will allow the engine to be aware of all the properties available in a certain **class**.

```typescript
class User {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  password: string;
  @AutoMap(() => Profile)
  profile: Profile;
}

class UserVm {
  @AutoMap()
  fullName: string;
  @AutoMap(() => ProfileVm)
  profile: ProfileVm;
  @AutoMap()
  firstName?: string;
  @AutoMap()
  lastName?: string;
}
```

**NOTE: Check out the [Plugin](#plugin) section for more info.**

4. Next, import `Mapper` from `@nartc/automapper`. You can also just instantiate a new instance of `AutoMapper` if you want to manage your instance.
5. Initialize `Mapper` with `initialize()` method. `initialize()` expects a `Configuration` callback that will give you access to the `Configuration` object. There are two methods on the `Configuration` object that you can use to setup your `Mapper`

- `createMap()`: `createMap()` expects a **source** as the first argument and the **destination** as the second argument. `createMap()` returns `CreateMapFluentFunctions<TSource, TDestination>` (Read more at [API Reference](https://nartc.github.io/mapper/index.html)).

```typescript
import { Mapper } from '@nartc/automapper';

Mapper.initialize(config => {
  config.createMap(User, UserVm); // create a mapping from User to UserVm (one direction)
  config.createMap(Profile, ProfileVm)
    .forMember(destination => destination.addressStrings, opts => opts.mapFrom(s => s.addresses.map(... /* map to addressString however you like */)));
});
```

`createMap()` will establish basic mappings for: `primitives` and `nested mapping` that have the same field name on the **source** and **destination** (eg: `userVm.firstName` will be automatically mapped from `user.firstName`). In addition, you can use `forMember()` to gain more control on how to map a field on the **destination**.

```typescript
Mapper.initialize(config => {
  config
    .createMap(User, UserVm) // create a mapping from User to UserVm (one direction)
    .forMember(
      destination => destination.fullName,
      opts => opts.mapFrom(source => source.firstName + ' ' + source.lastName)
    ); // You will get type-inference here
});
```

- `addProfile()`: `addProfile()` expects a class which extends `MappingProfileBase`. Usually, you can just initialize your `Mapper` with `config.createMap` and setup all your mappings that way. But more than often, it is better to separate your mappings into `Profile` which will create the mappings for specific set of **source** and **destination**

```typescript
import { MappingProfileBase } from '@nartc/automapper';

export class UserProfile extends MappingProfileBase {
  constructor(mapper: AutoMapper) {
    super(); // this is required since it will take UserProfile and get the string "UserProfile" to assign to profileName
    mapper.createMap(User, UserVm).forMember(
      destination => destination.fullName,
      opts => opts.mapFrom(source => source.firstName + ' ' + source.lastName)
    ); // You will get type-inference here
  }
}

// in another file
Mapper.initialize(config => {
  config.addProfile(UserProfile);
});
```

5. When you're ready to map, call `Mapper.map()`.

```typescript
const userVm = Mapper.map(user, UserVm); // this will return an instance of UserVm and assign it to userVm with all the fields assigned properly from User

console.log('instance of UserVm?', userVm instanceof UserVm); // true
```

6. `Mapper.map()` (as well as `mapArray` and the **Async** versions) has an overload where you can also pass in `Source` model. This is to help with Multiple Mapping Sources to the same Destination. And especially when you have a **Plain JS** object, this (as a requirement) will allow you to map plain Object as well.

```typescript
class User2 {
  // some properties
}

Mapper.createMap(User2, UserVm); // assumed you already have a Mapping created between User and UserVm.
const userVm = Mapper.map(user, UserVm);

/**
 * If "user" is truly an instance of User2, then it's fine. But if "user" is just a Plain JS object
 * and TS is tricked to see "user" as User2, then AutoMapper will have trouble looking for
 * the correct Mapping (User2 and UserVm).
 *
 * In that case, the "Source" argument will help AutoMapper to look for the correct Mapping
 */
const userVm = Mapper.map(user, UserVm, User2);
```

#### Date Time

Dealing with `Date Time` is hard and there are so many options out there to help with manipulating `Date` object in **JavaScript**.

1. Vanilla `Date` object:

Internally, `@nartc/automapper` is not using any 3rd party library to manipulate `Date` object rather than the `Date` object itself. Therefore, you might want to handle the mappings with `Date` yourself using `mapFrom` and such that the `AutoMapper` provides.
You can use `date-fns`, `dayjs`, or `luxon` which are 3 very powerful `DateTime` library that deal with Vanilla `Date` object.

```typescript
class Foo {
  @AutoMap()
  someDate!: Date;
}

class FooVm {
  @AutoMap()
  someDate!: Date;
}
```

The above case, all is fine. But check out the below case:

```typescript
class Foo {
  @AutoMap()
  someDate!: Date;
}

class FooVm {
  @AutoMap()
  someDate!: string; // the only difference is now this is a string
}
```

When we map from between these two models, the `destination type` will always be the same as the `source type`.
In other words, if you map from `Foo -> FooVm`, `FooVm.someDate` will also be `Date` and not `string`.
The best way to handle this is to use `mapFrom` and configure your mapping properly

```typescript
Mapper.createMap(Foo, FooVm)
  .forMember(
    dest => dest.someDate,
    opts => opts.mapFrom(source => source.someDate.toDateString())
  )
  .reverseMap()
  .forPath(
    source => source.someDate,
    opts => opts.mapFrom(dest => new Date(dest.someDate))
  );
```

If you have many `Date-string` pairs like above, you might want to consider using a `Converter` for reusability.
Again, if you have more complex cases regarding `Date Time` manipulation, try to leverage the libraries I mentioned.

2. `Moment` object

Same complexity and limit apply to `Moment` object with one extra caveat.

```typescript
class Foo {
  @AutoMap(() => moment) // <-- add the TypeFn to Moment field
  someMoment: moment.Moment;
}

class FooVm {
  @AutoMap()
  someMoment: string;
}
```

Internally, `@nartc/automapper` uses `class-transformer's plainToClass` to initialize the models and do so recursively for nested models. However, `moment` doesn't have a constructor like any other model
and I cannot intelligently tell an `Object` is a `Moment` object without pulling in the `moment` library. Passing in the `typeFn` does not do anything but by-pass initialization for those `moment` fields.
Again, apply mapping manually would be the best way to go about this.

```typescript
Mapper.createMap(Foo, FooVm).forMember(
  dest => dest.someMoment,
  opts => opts.mapFrom(source => source.someMoment.toISOString())
);
```

#### Naming Conventions

`@nartc/automapper` provides away to map between two models with different naming conventions. Naming conventions supported:

- `PascalCaseNamingConvention`
- `CamelCaseNamingConvention`
- `SnakeCaseNamingConvention`

By default, every models will have `CamelCaseNamingConvention`. You can modify the naming conventions on the models by providing the third argument to `createMap()` method:

```typescript
class Address {
  @AutoMap()
  Street!: string;
}

class User {
  @AutoMap()
  FirstName!: string;
  @AutoMap()
  LastName!: string;
  @AutoMap(() => Address)
  Address!: Address;
}

class UserVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  fullName!: string;
  @AutoMap()
  addressStreet!: string;
}

Mapper.createMap(User, UserVm, {
  sourceMemberNamingConvention: new PascalCaseNamingConvention(),
}).forMember(
  dest => dest.fullName,
  opts => opts.mapFrom(s => s.FirstName + ' ' + s.LastName)
);
```

When `map()`, `User.FirstName`, `User.LastName` and `User.Address.Street` will be mapped automatically to `UserVm.firstName`, `UserVm.lastName`, and `UserVm.addressStreet`. **Map by conventions** still stays true.

#### Global Settings

You can also provide **Naming Conventions** (for now) at a global level through **Global Settings**.

```typescript
Mapper.initialize(cfg => {
  cfg.withGlobalSettings({
    sourceMemberNamingConvention: SnakeCaseNamingConvention,
  });
});
```

Now, `SnakeCaseNamingConvention` will be applied to every `Source` models that is a part of a `Mapping` via `createMap()`.

#### Getters

`@nartc/automapper` can map **public getters**

```typescript
class User {
  private _firstName!: string;
  @AutoMap()
  public get firstName() {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName!: string;
  @AutoMap()
  public get lastName() {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }
}

class UserVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  fullName!: string;
}

Mapper.createMap(User, UserVm)
  .forMember(
    d => d.fullName,
    opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
  )
  .reverseMap();
```

Please take note that `@nartc/automapper` works based a lot on **conventions**. This applies greatly to **getters support** so try to keep your `private fields` and `public getters` somewhat aligned with each other. E.g: `private _firstName` and `public get firstName()`

#### Callbacks

`@nartc/automapper` provides `beforeMap` and `afterMap` callbacks which are called **before** a mapping operator occurs and/or **after** a mapping operator occurs, if said callbacks are provided.

There are two ways you can provide the callbacks: `Map` level and `Mapping` level.

**NOTE: `Map` level refers to the actual map operation when any of the `map()` methods are called. `Mapping` level refers to the actual `Mapping` between two models when `createMap()` is called.**

- **Map** level: all `map()` methods have the third parameter which has a shape of `MapActionOptions: {beforeMap: Function, afterMap: Function}`. If any of the callbacks is provided, it will be called in correct chronological order.

```typescript
/**
 * In this case, both callbacks will be called with the following arguments.
 *
 * @param {User} source
 * @param {UserVm} destination
 * @param {Mapping<User, UserVm>} mapping
 */
const userVm = Mapper.map(user, UserVm, {
  beforeMap: (source, destination, mapping) => {},
  afterMap: (source, destination, mapping) => {},
});
```

- **Mapping** level: callbacks on the `Mapping` level will be called for ALL map operations on the two models unless you provide diferent callbacks to specific `map` operation (aka `Map` level)

```typescript
/**
 * In this case, both callbacks will be called with the following arguments.
 *
 * @param {User} source
 * @param {UserVm} destination
 * @param {Mapping<User, UserVm>} mapping
 */
Mapper.initialize(config => {
  config
    .createMap(User, UserVm)
    .beforeMap((source, destination, mapping) => {})
    .afterMap((source, destination, mapping) => {}); // create a mapping from User to UserVm (one direction)
});
```

**NOTE 1: `Map` level callbacks will overide `Mapping` level callbacks if both are provided**

**NOTE 2: The callbacks are called with `source`, `destination` and `mapping`. **ANYTHING** you do to the `source` and `destination` will be carried over to the `source` and `destination` being mapped (mutation) so please be cautious. It might be handy/dangerous at the same time given the dynamic characteristic of **JavaScript**.**

**NOTE 3: `mapArray()` will ignore `Mapping` level callbacks because that would be a performance issue if callbacks were to be called on every single item in an array. Provide `Map` level callbacks for `mapArray()` if you want to have callbacks on `mapArray()`**

6. Use `Mapper.mapArray()` if you want to map from `TSource[]` to `TDestination[]`.

#### Mapping Inheritance

`@nartc/automapper` supports mapping inheritance with a caveat surrounding `Generics Typings`.

```typescript
class Base {
  @AutoMap()
  createdDate?: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  id?: string;
}

class BaseVm {
  @AutoMap()
  created?: Date;
  @AutoMap()
  updated?: Date;
  @AutoMap()
  recordId?: string;
}

class User extends Base {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  about!: string;
}

class UserVm extends BaseVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  fullName!: string;
  @AutoMap()
  about!: string;
}

Mapper.initialize(cfg => {
  cfg.createMap(User, UserVm).forMember(
    d => d.fullName,
    opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
  );
});
```

Now if you run `Mapper.map(someUser, UserVm)`, you will get an error showing 3 **unmapped properties** on `UserVm`: `created`, `updated`, and `recordId`.
`UserVm` is a subclass of `BaseVm` so `UserVm` inherits all properties from `BaseVm` which are `created`, `updated` and `recordId`.
`AutoMapper` cannot _automap_ `createdDate -> created` and so on. That's why you're seeing the error. Now, if `BaseVm` has the same `properties` as `Base`, everything will work without additional work.

Here's how to fix the issue:

```typescript
Mapper.initialize(cfg => {
  cfg
    .createMap(Base, BaseVm) // create a mapping for Base and BaseVm
    .forMember(
      d => d.created,
      opts => opts.mapFrom(s => s.createdAt)
    )
    .forMember(
      d => d.updated,
      opts => opts.mapFrom(s => s.updatedAt)
    )
    .forMember(
      d => d.recordId,
      opts => opts.mapFrom(s => s.id)
    );

  cfg
    .createMap(User, UserVm, { includeBase: [Base, BaseVm] }) // provide includeBase option
    .forMember(
      d => d.fullName,
      opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
    );
});
```

The **unampped** error will be gone now.

**NOTE: Generics typing for `includeBase` is quite tricky. It might not be working properly in some cases.**

#### ReverseMap

`@nartc/automapper` supports `Reverse Mapping` by calling `reverseMap()`. This will create a reversed `Mapping` for the two models that were passed in `createMap()`.

```typescript
Mapper.createMap(User, UserVm) // Create a Mapping<User, UserVm>
  .reverseMap(); // also Create a Mapping<UserVm, User>
```

```typescript
// map from User -> UserVm is the same as example above. The following is to map from UserVm back to User without having to createMap(UserVm, User)

const userVm = new UserVm(); // sometimes you will receive an instance of the ViewModel instead from the Client side
...

const user = Mapper.map(userVm, User); // map from UserVm back to User
```

`reverseMap()` returns a `CreateReversedMapFluentFunctions` which will allow you to chain:

1.  `forPath()`: Same as `forMember()` but will act against the properties of the original `TSource`. Eg: `createMap(User, UserVm)`, `forMember()` will refer to properties of `UserVm` while `forPath()` will refer to properties of `User`.
2.  `beforeMap()` and `afterMap()`: Same as `beforeMap()` and `afterMap()` for `CreateMapFluentFunctions`

#### MapWith

By default, `@nartc/automapper` will map nested model by naming convention meaning `user.profile` will be mapped to `userVm.profile`. Sometimes, you might have different property name for related nested model. Use `mapWith()` in this case.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.someProfile,
  opts => opts.mapWith(ProfileVm, source => source.originalProfile)
);

Mapper.map(user, UserVm); // user.originalProfile will be mapped to dest.someProfile with ProfileVm as the destination model.
```

`mapWith()` takes in two arguments: (1) the destination model and (2) the value on the source whose value `@nartc/automapper` will use to map to (1). Please ensure you have established the Mapping for whatever mapping operations you're using. In this case, you need to have had established `Mapping` for `Profile` (or whatever model associated with `source.originalProfile`) and `ProfileVm` in order for this `mapWith()` to work.

#### Value Converter

In some cases, you might have some similar logic to map from one type to another. For example, you want to map from a type `Date` to `string` with the same logic for most parts of the application, you can use a class that implements the `Converter` for this.

```typescript
class DateStringConverter implements Converter<string, Date> {
  convert(source: string): Date {
    return new Date(source);
  }
}
```

`Converter` is an interface that requires a `convert()` function. `Converter` also takes in two type-arguments: `TConvertSource` and `TConvertDestination` which annotates the type of the source value and the destination value of the converter.

##### Usage

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.birthday,
  opts =>
    opts.convertUsing(
      new DateStringConverter(),
      source => source.someDateString
    )
);
```

Use `convertUsing()` to use the `Converter`. You'll get type inference here.

**Can you just use a `mapFrom()` here?** Absolutely yes, but a `Converter` will help you to separate the concern more if you choose to.

#### Value Resolver

Very similar concept to a `Converter`, however a `Resolver` has access to the whole `source` object as well as the `transformation` information regarding the current `destination member` being mapped. You can use a `Resolver` to handle more complex business mapping logic for a specific `destination member` that you don't want to pollute the construction of a `Mapping`.

##### Usage

Create a class that implements `Resolver`. `Resolver` is an interface that takes in 3 type arguments: `TSource`, `TDestination` and the type of the `destination member` that you want to use this `Resolver` against. Impelemnting `Resolver` requires a `resolve()` function.

```typescript
class CityToState implements Resolver<Address, AddressVm, string> {
  resolve(
    source: Address,
    destination: AddressVm,
    transformation: MappingTransformation<Address, AddressVm, string>
  ): string {
    return source.city;
  }
}
```

```typescript
Mapper.createMap(Address, AddressVm).forMember(
  dest => dest.someState,
  opts => opts.mapFrom(new CityToState())
);
```

Again, **can you just use `mapFrom()` instead?** Absolutely yes.

#### PreCondition

`@nartc/automapper` supports a pre-checked on some expression to determine whether a mapping operation should proceed by using `preCondition()`.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.foo,
  opts =>
    opts.preCondition(source => source.age >= 10).mapFrom(source => source.bar)
);
```

The above mapping operation will only be proceeded if `source.age >= 10`. If `source.age < 10` (or the expression is falsy), then `dest.foo` will receive a `null` value.

`preCondition` takes in an optional second argument: `defaultValue` which will be used to map to the `destinationMember` is the `predicate` returns falsy instead of `null`.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.foo,
  opts =>
    opts
      .preCondition(source => source.age >= 10, 'default value')
      .mapFrom(source => source.bar)
);
```

If `source.age < 10`, `dest.foo` will receive `'default value'` instead of `null`. Please take note that `defaultValue` respects the type of `destinationMember`. In this case, `dest.foo` is a `string` so you can only pass in a `string` for `defaultValue`.

#### Condition

Very similar to `preCondition`. However, if the `condition()` returns true, `@nartc/automapper` will try to map the same property name that is being checked against.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.fullName,
  opts => opts.condition(source => source.age >= 10)
);
```

If `condition()` returns truthy, then `@nartc/automapper` will try to map `source.fullName` to `dest.fullName`. `condition()` will also take in an optional second argument `defaultValue` and the same rule (as `preCondition`) applies to `condition()`.

#### FromValue

Raw value to map to a `destination member`. Please take note if you pass in an object to `fromValue()`, that object will be mapped without consideration for any `Mapping`.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.fullName,
  opts => opts.fromValue('Some value')
);
```

`@nartc/automapper` will map `'Some value'` to `dest.fullName`.

#### NullSubstitution

A value to be mapped to `destsination.member` when `source.member` is `null`. Same rule applies for `nullSubstitution` when you pass in an object for `nullSubstitution`, it will not be mapped with any `Mapping`. The expected value is safe-typed to the `destination.member` type.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.shouldBeSubstituted,
  opts => opts.nullSubstitution('substituted')
);

const user = new User();
user.firstName = 'John';
user.lastName = 'Doe';

// Case 1: do not assign to user.shouldBeSubstituted

const vm = Mapper.map(user, UserVm);
assert(vm.shouldBeSubstituted === 'substituted');

// Case 2: Assign value to user.shouldBeSubstituted
user.shouldBeSubstituted = 'initial value';
const vm = Mapper.map(user, UserVm);
assert(vm.shouldBeSubstituted === 'initial value');
```

#### Async

While `Async` versions of `map` and `mapArray` are available, they're not "real" `Async` since I just wrap the `map` operations inside of a `resolved Promise` to execute the operations as a `Micro Task`. I'll look into this more and I welcome any suggestions.

## Plugin

Looking over the examples, you can see that in order for `@nartc/automapper` to work properly, there's a lot of boilerplate code for `@AutoMap()` decorator.
In order to solve that issue, `@nartc/automapper` has a plugin called [@nartc/automapper-transformer-plugin](https://github.com/nartc/automapper-transformer-plugin).

#### Installation

```shell script
npm i -D @nartc/automapper-transformer-plugin
```

#### Usage

Check out [@nartc/automapper-transformer-plugin](https://github.com/nartc/automapper-transformer-plugin) for detail usage.

## Demo

[Codesandbox Demo](https://codesandbox.io/s/automapper-demo-ntc2d)

## Contribution

Contribution of any kind is always welcomed.
