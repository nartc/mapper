---
id: nestjs
title: NestJS Integration
sidebar_label: NestJS
---

`@automapper/nestjs` is the official integration for [NestJS](https://nestjs.com).

## Installation

```bash
npm i @automapper/nestjs
# or with yarn
yarn add @automapper/nestjs
```

#### `peerDependencies`

`@automapper/nestjs` depends on `@automapper/core`.

```bash
npm i @automapper/core
# or with yarn
yarn add @automapper/core
```

#### Plugin

Recommendation is to use `@automapper/classes` in a NestJS application.

## Usage

- Import `AutomapperModule.forRoot()` in `AppModule`

```ts
@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
      singular: true,
    }),
  ],
})
export class AppModule {}
```

- `AutomapperModule.forRoot()` accepts a `AutomapperModuleOptions` which has the following interface:

```ts
/**
 * Options for AutomapperModule.forRoot()
 */
export interface AutomapperModuleOptions {
  /**
   * An array of CreateMapperOptions to create multiple mappers
   */
  options: CreateMapperOptions[];
  /**
   * Global ErrorHandler to pass to all mappers
   */
  globalErrorHandler?: ErrorHandler;
  /**
   * Global NamingConventions to pass to all mappers
   */
  globalNamingConventions?: {
    source: NamingConvention;
    destination: NamingConvention;
  };
  /**
   * Set to true if you want to use the default Mapper token for when only one mapper is setup with forRoot
   * @default false
   */
  singular?: boolean;
}
```

- Pass in multiple `CreateMapperOptions` to initialize multiple `Mapper` with `AutomapperModule.forRoot()`
- Use `@InjectMapper()` to inject the `Mapper` in NestJS's `Injectable`
  - `@InjectMapper()` accepts an optional argument `name`. This is the name of the `CreateMapperOptions` passed to `AutomapperModule.forRoot()`
  - When `singular` is `true`, `@InjectMapper()` will inject the **default** single `Mapper` initialized.
- `AutomapperModule` is a `Global` module, so it is only needed to be imported once to have the `Mapper` available across the application

### `singular`

The main difference is as follows:

```ts
// without singular

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
    }),
  ],
})
export class AppModule {}

@Injectable()
export class Service {
  // have to pass in the name of the mapper to InjectMapper
  constructor(@InjectMapper('blah') private blahMapper: Mapper) {}
}

// with singular

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
      singular: true,
    }),
  ],
})
export class AppModule {}

@Injectable()
export class Service {
  // do not have to pass in the name of the mapper to InjectMapper
  constructor(@InjectMapper() private blahMapper: Mapper) {}
}
```

## Profile

`Profile` is just another `Injectable` in NestJS. Make sure to `extends AutomapperProfile`

```ts
import { AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(User, UserDto);
    };
  }
}
```

Then provide `UserProfile` in a `Module`

```ts
@Module({
  providers: [UserProfile],
})
export class UserModule {}
```

- `AutomapperProfile` enforces the sub-classes to implement a `mapProfile()` method that will return a `MappingProfile`.
- `Profile` can have other Services injected to its constructor if needed.

## `MapInterceptor`

`@automapper/nestjs` provides `MapInterceptor`. In cases where you do not care about annotating the correct return type for a **Controller#method** and want your **Service** to be a little cleaner, you can utilize the `MapInterceptor` to execute the mapping.

```ts
import { MapInterceptor } from '@automapper/nestjs';

export class UserController {
  @Get('me')
  @UseInterceptors(MapInterceptor(UserDto, User))
  me() {
    // userService.getMe() returns a User here and does not have mapping logic in it.
    return this.userService.getMe();
  }
}
```

`MapInterceptor` has the following signature:

```ts
MapInterceptor(destinationModelType, sourceModelType, {
  isArray?: boolean;
  mapperName?: string;
} & MapOptions)
```

> See [MapOptions](misc/callbacks.md)

## `MapPipe`

`@automapper/nestjs` provides `MapPipe`. When you want to transform the incoming request body before it gets to the route handler, you can utilize `MapPipe` to achieve this behavior

```ts
@Post('/from-body')
postFromBody(@Body(MapPipe(UserDto, User)) user: UserDto) {
    // from the request perspective, user coming in as an User object but will be mapped to UserDto with MapPipe
    return user;
}
```

`MapPipe` only works with `@Body` or `@Query`.

```ts
@Get('/from-query')
getFromQuery(@Query(MapPipe(UserDto, User)) user: UserDto) {
    // from the request perspective, user coming in as an User object but will be mapped to UserDto with MapPipe
    return user;
}
```

> Note that when you send a request with `Body` or `Query`, the data is serialized. Data-type like `Date` will come in the request handler as `string`. Hence, please be cautious of the mapping configuration when you use `MapPipe`

`MapPipe` has the same signature as `MapInterceptor`

```ts
MapPipe(destinationModelType, sourceModelType, {
  isArray?: boolean;
  mapperName?: string;
} & MapOptions)
```
