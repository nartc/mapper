# AutoMapper

An object-to-object mapper by convention for TypeScript.

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

## Motivations

I've been exposed and accustomed to the `ViewModel` pattern when working on Server Side applications whether it's *NodeJS* or *.NET Core*. However, *.NET* has a very powerful Mapper called `AutoMapper` (referred as *the original*) while *JS/TS* ecosystem does not have one that is up-to-date and/or lacking some features. 
I know that `AutoMapper` is weak in `TypeScript` because of how `Reflection` works in `TypeScript`. But, it'd be nice to have some type of `Mapper` that works for `NodeJS` development. After looking around for a while, I found a couple libraries that work well:

1.  `automapper-ts`
2.  `wufe/mapper`

but for the same reasons as above (not up-to-date/lacking), I've decided to create my own taking inspirations from both mentioned libraries so credits to te creator of `automapper-ts` and `wufe/mapper`.

## Features

So far, the following is supported:

- [x] Basic Mapping between two classes
- [x] Basic Mapping for nested classes
- [x] Array/List Mapping
- [x] Flattening
- [x] ReverseMap
- [x] Value Converters
- [x] Value Resolvers
- [x] Async
- [x] Before/After Callback
- [x] Naming Conventions

#### Future features:

- [ ] Type Converters - Help needed
- [ ] Value Transformers

#### Might not support / Need use-case:

- [x] Null Substitution - It makes more sense to use `fromValue()` instead of implement `nullSubstitution()`. Please let me know of a use-case where `nullSubstitution()` makes sense.

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
`@nartc/automapper` uses `lodash` as well but thanks to `tsdx`, only a few used `lodash`'s methods are used and the unused methods will be tree-shakable. Read more [here](https://www.npmjs.com/package/tsdx#using-lodash) 

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

3. Decorate all of your properties with `@Expose()`. `@Expose` is imported from `class-transformer`. This will allow the engine to be aware of all the properties available in a certain **class**.

```typescript
class User {
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  password: string;
  @Expose()
  profile: Profile;
}

class UserVm {
  @Expose()
  fullName: string;
  @Expose()
  profile: ProfileVm;
  @Expose()
  firstName?: string;
  @Expose()
  lastName?: string;
}
```

**NOTE: If you have nested model, like `profile` in this case, you will want to use `@Type()` on those as well. `@Type()` is also imported from `class-transformer`.**

```typescript
class User {
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  password: string;
  @Expose()
  @Type(() => Profile)
  profile: Profile;
}

class UserVm {
  @Expose()
  fullName: string;
  @Expose()
  @Type(() => ProfileVm)
  profile: ProfileVm;
  @Expose()
  firstName?: string;
  @Expose()
  lastName?: string;
}
```

However, `@nartc/automapper` provides a short-hand decorator `@ExposedType()` instead of explicitly use `@Expose()` and `@Type()` on a nested model property.

```typescript
class UserVm {
  @Expose()
  fullName: string;
  @ExposedType(() => ProfileVm)
  profile: ProfileVm;
  @Expose()
  firstName?: string;
  @Expose()
  lastName?: string;
}
```

**NOTE: I am looking into working on a plugin where the decorators will be added programmatically before the compilation steps so that we don't need as much boilerplate.**

4. Next, import `Mapper` from `@nartc/automapper`. You can also just instantiate a new instance of `AutoMapper` if you want to manage your instance.
5. Initialize `Mapper` with `initialize()` method. `initialize()` expects a `Configuration` callback that will give you access to the `Configuration` object. There are two methods on the `Configuration` object that you can use to setup your `Mapper`

- `createMap()`: `createMap()` expects a **source** as the first argument and the **destination** as the second argument. `createMap()` returns `CreateMapFluentFunctions<TSource, TDestination>` (Read more at [API Reference](https://nartc.github.io/mapper/index.html)).

```typescript
import { Mapper, MappingProfileBase } from 'automapper-nartc';

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
    .forMember(destination => destination.fullName, opts =>
      opts.mapFrom(source => source.firstName + ' ' + source.lastName)
    ); // You will get type-inference here
});
```

- `addProfile()`: `addProfile()` expects a new instance of a class which extends `MappingProfileBase`. Usually, you can just initialize your `Mapper` with `config.createMap` and setup all your mappings that way. But more than often, it is better to separate your mappings into `Profile` which will create the mappings for specific set of **source** and **destination**

```typescript
import { MappingProfileBase } from '@nartc/automapper';

export class UserProfile extends MappingProfileBase {
  constructor() {
    super(); // this is required since it will take UserProfile and get the string "UserProfile" to assign to profileName
  }

  // configure() is required since it is an abstract method. configure() will be called automatically by Mapper.
  // This is where you will setup your mapping with the class method: createMap
  configure(mapper: AutoMapper) {
    mapper
      .createMap(User, UserVm)
      .forMember(destination => destination.fullName, opts =>
        opts.mapFrom(source => source.firstName + ' ' + source.lastName)
      ); // You will get type-inference here
  }
}

// in another file
Mapper.initialize(config => {
  config.addProfile(new UserProfile());
});
```

5. When you're ready to map, call `Mapper.map()`.

```typescript
const userVm = Mapper.map(user, UserVm); // this will return an instance of UserVm and assign it to userVm with all the fields assigned properly from User

console.log('instance of UserVm?', userVm instanceof UserVm); // true
```

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
  afterMap: (source, destination, mapping) => {}
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

#### ReverseMap
`@nartc/automapper` supports `Reverse Mapping` by calling `reverseMap()`. This will create a reversed `Mapping` for the two models that were passed in `createMap()`.

```typescript
Mapper
  .createMap(User, UserVm) // Create a Mapping<User, UserVm>
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
2. `beforeMap()` and `afterMap()`: Same as `beforeMap()` and `afterMap()` for `CreateMapFluentFunctions`

#### MapWith
By default, `@nartc/automapper` will map nested model by naming convention meaning `user.profile` will be mapped to `userVm.profile`. Sometimes, you might have different property name for related nested model. Use `mapWith()` in this case.

```typescript
Mapper.createMap(User, UserVm)
  .forMember(dest => dest.someProfile, opts => opts.mapWith(ProfileVm, source => source.originalProfile));

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
Mapper.createMap(User, UserVm)
  .forMember(dest => dest.birthday, opts => opts.convertUsing(new DateStringConverter(), source => source.someDateString))
```

Use `convertUsing()` to use the `Converter`. You'll get type inference here. 

**Can you just use a `mapFrom()` here?** Absolutely yes, but a `Converter` will help you to separate the concern more if you choose to.

#### Value Resolver
Very similar concept to a `Converter`, however a `Resolver` has access to the whole `source` object as well as the `transformation` information regarding the current `destination member` being mapped. You can use a `Resolver` to handle more complex business mapping logic for a specific `destination member` that you don't want to pollute the construction of a `Mapping`. 

##### Usage
Create a class that implements `Resolver`. `Resolver` is an interface that takes in 3 type arguments: `TSource`, `TDestination` and the type of the `destination member` that you want to use this `Resolver` against. Impelemnting `Resolver` requires a `resolve()` function.

```typescript
class CityToState implements Resolver<Address, AddressVm, string> {
  resolve(source: Address, destination: AddressVm, transformation: MappingTransformation<Address, AddressVm, string>): string {
    return source.city;
  }
}
```

```typescript
Mapper.createMap(Address, AddressVm)
  .forMember(dest => dest.someState, opts => opts.mapFrom(new CityToState()))
```

Again, **can you just use `mapFrom()` instead?** Absolutely yes.

#### PreCondition
`@nartc/automapper` supports a pre-checked on some expression to determine whether a mapping operation should proceed by using `preCondition()`.

```typescript
Mapper.createMap(User, UserVm)
  .forMember(dest => dest.foo, opts => opts.preCondition(source => source.age >= 10).mapFrom(source => source.bar))
```

The above mapping operation will only be proceeded if `source.age >= 10`. If `source.age < 10` (or the expression is falsy), then `dest.foo` will receive a `null` value.

#### Condition
Very similar to `preCondition`. However, if the `condition()` returns true, `@nartc/automapper` will try to map the same property name that is being checked against.

#### FromValue
Raw value to map to a `destination member`. Please take note if you pass in an object to `fromValue()`, that object will be mapped without consideration for any `Mapping`. 

## Demo

Demo is coming

## Contribution

Contribution of any kind is always welcomed.
