---
id: migrations
title: Migrations
sidebar_label: Migrations
---

## Library Scope

`@nartc/automapper` and `@automapper/*` are essentially two different packages. Technically, `@nartc/automapper` is the base for `@automapper/core` and `@automapper/classes`.

In the near future, `@nartc/automapper` will be archived (v7 would still be available) and will not receive any bug fixes or new features. All the effort will be spent toward `@automapper/*`.

## Versioning

`@nartc/automapper` is currently at v7. `@automapper/*` will start out with v1.0.0 and will strictly follow [Semantic Versioning](https://semver.org/).

`@automapper/*` is a collection of packages that would all follow the same version number at any given time.

## Migrate from `@nartc/automapper`

### Install `@automapper/*`

```bash
npm i @automapper/{core,classes}
npm i -D @automapper/types
# or with yarn
yarn add @automapper/{core,classes}
yarn add -D @automapper/types
```

### Create a `Mapper` with `@automapper/classes`

`@automapper/core` does not expose a `Mapper` constant anymore because `@automapper/core` operates based on a `MapPlugin` you pick, and you can have multiple `Mapper` for each plugin.

```ts
// before
import { Mapper } from '@nartc/automapper';

Mapper.createMap(...);

// after
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

const mapper = createMapper({
  name: 'arbitrary name',
  pluginInitializer: classes
})

mapper.createMap(...);
```

### Default settings

`@nartc/automapper` sets some default settings which are `NamingConvention` and `ErrorHandler`. `@automapper/core` does not set any default `NamingConvention` and it sets `console.error` for `ErrorHandler#handle`.

```ts
const mapper = createMapper({
  name: 'arbitrary name',
  pluginInitializer: classes,
  namingConventions: new CamelCaseNamingConvention(),
});
```

For `ErrorHandler`, it is now an interface with a `handle` method so you can just provide that as well

```ts
const mapper = createMapper({
  name: 'arbitrary name',
  pluginInitializer: classes,
  namingConventions: new CamelCaseNamingConvention(),
  errorHandler: {
    handle: (error) => {
      // custom error handler
    },
  },
});
```

### `Profile`

`Profile` in `@automapper/core` is just a function that accepts the `Mapper` object and returns nothing (`void`).

```ts
// before
import { ProfileBase } from '@nartc/automapper';

export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super()
    mapper.createMap(...)
  }
}

// after
import type { MappingProfile } from '@automapper/types';

export const userProfile: MappingProfile = mapper => {
  mapper.createMap(...)
}
```

### `Converter`

`Converter` in `@automapper/core` is just an object with the `convert` method that accepts a `sourceData` and returns a `destinationData`.

```ts
// before
import { Converter } from '@nartc/automapper';

export class DateStringConverter implements Converter<Date, string> {
  convert(source: Date): string {
    return source.toDateString();
  }
}

// after
import type { Converter } from '@automapper/types';

export const dateStringConverter: Converter<Date, string> = {
  convert(source) {
    return source.toDateString();
  },
};
```

### `Resolver`

`Resolver` in `@automapper/core` is just an object with the `resolve` method that accepts a `(source, destination?)` and returns data that matches with `destination#member` type.

```ts
// before
import { Resolver } from '@nartc/automapper';

export class TaxResolver implements Resolver<Item, ItemDto, number> {
  resolve(source: Item): number {
    return source.type === 'A' ? source.price * 0.5 : source.price * 0.9;
  }
}

// after
import type { Resolver } from '@automapper/types';

export const taxResolver: Resolver<Item, ItemDto, number> = {
  resolve(source) {
    return source.type === 'A' ? source.price * 0.5 : source.price * 0.9;
  },
};
```

### Inheritance

```ts
class Base {...}
class BaseDto {...}

class User extends Base {...}
class UserDto extends BaseDto {...}

// before
import { Mapper } from '@nartc/automapper';

Mapper.createMap(Base, BaseDto);
Mapper.createMap(User, UserDto, { includeBase: [Base, BaseDto] });

// after
import { mapper } from 'your/path/to/your-mapper'

mapper.createMap(Base, BaseDto);
mapper.createMap(User, UserDto, { extends: [mapper.getMapping(Base, BaseDto)] })
```

This approach allows you to have `Mapping<User, UserDto>` extends as many mappings as possible. There's a downside that is the typings for `extends` is a little loose.

### `MapAction` (aka callbacks)

`beforeMap` and `afterMap` work the same as before. However, they will be invoked with `(source, destination)` instead of `(source, destination, mapping)`

### Empty Values

`@nartc/automapper` dictates `undefined` or `null` to assign to empty values. `@automapper/core` will not do this. All empty values will be `undefined`. `null` will still be mapped to `null`.

### Reverse Mapping

`reverseMap()` has been removed in `@automapper/*`. The reason is Reverse Mapping is very tricky to get right, and it requires a lot of code to make it work, and it is not even working correctly.

If you need `reverseMap()`, just call `createMap()` with the models again.

```ts
// before
Mapper.createMap(User, UserDto).reverseMap();

// after
mapper.createMap(User, UserDto);
mapper.createMap(UserDto, User);
```

### `map()` variations API changes

`@nartc/automapper` works only with Class so the `map()` method in `@nartc/automapper` makes passing in the `source` type optional and will try to guess the type of `source` with: `sourceObj.constructor`.

`@automapper/core` works with different type now so `source` type has been made mandatory.

```ts
// before
Mapper.map(sourceObj, Destination);

// after
mapper.map(sourceObj, Destination, Source);
```

### `skipUnmappedAssertion` is removed

In `@automapper/core`, `ErrorHandler#handle` is default to `console.error`. `skipUnmappedAssertion` was added to `@nartc/automapper` to prevent having a thrown exception leading to a crash. It is not needed with `@automapper/core`.

> Note: In the event of unmapped properties, the error is still be logged to the Console. If this is something you do not want, please [open an Issue](https://github.com/nartc/mapper/issues)

### `enum` properties

`@AutoMap()` on enum properties might behave differently based on the `tsconfig` that your application is using (either for serving or building). If you run into issues with Enum properties, provide additional information for `@AutoMap()`

```ts
// string enum
@AutoMap({ typeFn: () => String })
role: UserRole

// number enum
@AutoMap({ typeFn: () => Number })
role: UserRole
```

This might not be the case for `@nartc/automapper` but the `@AutoMap()` decorator is reworked a little (to be lighter and more consistent) in `@automapper/classes`.

## Migrate from `nestjsx-automapper`

`nestjsx-automapper` will also be archived due to the release of `@automapper/nestjs` which is the official integration package with [NestJS](https://nestjs.com)

### Install `@automapper/nestjs` and `peerDependencies`

```bash
npm i @automapper/{core,classes,nestjs}
npm i -D @automapper/types
# or with yarn
yarn add @automapper/{core,classes,nestjs}
yarn add -D @automapper/types
```

### Initialization

```ts
// before
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [AutomapperModule.withMapper()],
})
export class AppModule {}

// after
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [
        // can initialize multiple mappers for each plugins
        {
          name: 'arbitrary name',
          pluginInitializer: classes,
          namingConventions: new CamelCaseNamingConvention(),
        },
      ],
      singular: true, // default to false. set to true if you want to use `InjectMapper()` without passing in anything
    }),
  ],
})
export class AppModule {}
```

### `MappingProfile`

```ts
// before
import { Profile, ProfileBase, AutoMapper } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(...)
  }
}

// in some other files that are guaranteed to load by webpack
import 'path/to/profile'


// after
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { // can inject other services
    super(mapper);
  }

  mapProfile() {
    return mapper => {
      mapper.createMap(...)
    }
  }
}

// in some module
@Module({
  imports: [...],
  providers: [UserProfile]
})
export class SomeModule {}
```

`mapProfile()` will be called automatically by `AutomapperProfile`.
