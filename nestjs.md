---
title: NestJS integration
description: Configure AutoMapper in NestJS 10 or 11 with injection, profiles, interceptors, and pipes.
---

`@automapper/nestjs` provides a global module and NestJS-specific mapping helpers. The classes strategy is the usual choice for decorated DTOs and entities.

**npm**

```shell
npm install @automapper/core @automapper/classes @automapper/nestjs reflect-metadata
```

**pnpm**

```shell
pnpm add @automapper/core @automapper/classes @automapper/nestjs reflect-metadata
```

**Bun**

```shell
bun add @automapper/core @automapper/classes @automapper/nestjs reflect-metadata
```

## Register a mapper

```ts
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AppModule {}
```

The module is global, so import it once at the application root.

## Inject the mapper

```ts
@Injectable()
export class UserService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  toDto(user: User): UserDto {
    return this.mapper.map(user, User, UserDto);
  }
}
```

For multiple strategies, name each mapper and pass the same name to `@InjectMapper()`:

```ts
AutomapperModule.forRoot(
  [
    { name: 'classes', strategyInitializer: classes() },
    { name: 'pojos', strategyInitializer: pojos() },
  ],
  {
    globalErrorHandler,
    globalNamingConventions: new CamelCaseNamingConvention(),
  },
);

constructor(@InjectMapper('classes') private readonly mapper: Mapper) {}
```

Mapper-specific options take precedence over global options.

## Async module configuration

`forRootAsync()` supports `useFactory`, `useClass`, or `useExisting`:

```ts
AutomapperModule.forRootAsync({
  imports: [PersistenceModule],
  inject: [EntityManager],
  useFactory: (entityManager: EntityManager) => ({
    strategyInitializer: classes({
      destinationConstructor: (_, destinationIdentifier) =>
        entityManager.create(destinationIdentifier, {}),
    }),
  }),
});
```

Class and existing providers implement `AutomapperOptionsFactory.createAutomapperOptions()`.

## Profiles

```ts
@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, User, UserDto);
      createMap(mapper, User, UserSummaryDto);
    };
  }

  protected override get mappingConfigurations(): MappingConfiguration[] {
    return [extend(BaseEntity, BaseDto)];
  }
}
```

Add the profile class to a module's `providers`. `mappingConfigurations` applies to every `createMap()` in the profile.

## Response interceptor

```ts
@Get('me')
@UseInterceptors(MapInterceptor(User, UserDto))
me(): Promise<User> {
  return this.userService.getMe();
}
```

For arrays or named mappers:

```ts
MapInterceptor(User, UserDto, {
  isArray: true,
  mapperName: "classes",
});
```

## Request pipe

`MapPipe` transforms `@Body()` or `@Query()` values:

```ts
@Post()
create(@Body(MapPipe(CreateUserDto, User)) user: User) {
  return this.userService.create(user);
}
```

Request data is already serialized, so configure conversions for values such as dates and numbers.

:::note Async mappings
`MapInterceptor` and `MapPipe` support both synchronous and asynchronous mappings, including arrays. They wait for asynchronous member resolvers and mapping callbacks before passing the mapped value onward. Mapping failures propagate through Nest's normal exception handling.
:::
