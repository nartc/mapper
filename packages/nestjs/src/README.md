# @automapper/nestjs

This is a NestJS module to integrate `@automapper` with NestJS.

## Installation

```sh
npm i @automapper/nestjs
```

or with `yarn`:

```sh
yarn add @automapper/nestjs
```

#### `peerDependencies`

`@automapper/nestjs` depends on `@automapper/core`

```sh
npm i @automapper/core
```

or with `yarn`:

```sh
yarn add @automapper/core
```

## Usage

Call `AutomapperModule.forRoot()` and provide some options to initialize the `Mapper` object(s).

```ts
// Single Mapper
@Module({
    imports: [
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
    ],
})
export class AppModule {}

// Multiple Mappers
@Module({
    imports: [
        AutomapperModule.forRoot(
            [
                {
                    name: 'classes',
                    strategyInitializer: classes(),
                },
                {
                    name: 'pojos',
                    strategyInitializer: pojos(),
                },
            ],
            {
                /*  globalErrorHandler: ErrorHandler */
                /*  globalNamingConventions: NamingConvention | {source, destination} */
            }
        ),
    ],
})
export class AppModule {}
```

`AutomapperModule` is a `Global` module so when `Mapper` object(s) are initialized, they're available across the application.

## Logging

AutoMapper logs through the global `AutoMapperLogger` from `@automapper/core`.
If you use a structured logger, configure it as early as possible in your
application entrypoint:

```ts
import { AutoMapperLogger } from '@automapper/core';

AutoMapperLogger.configure({
    warn: (message, ...params) => logger.warn(message, ...params),
    error: (message, ...params) => logger.error(message, ...params),
});
```

Some AutoMapper logs can happen while decorators run, before
`AutomapperModule.forRoot()` or `forRootAsync()` executes. Configure
`AutoMapperLogger` before importing decorated model classes if those logs need
to use your logger.

For mapper-specific runtime error handling, use `errorHandler` or
`globalErrorHandler`. `AutomapperModule` does not accept a logger option.

Read more about this on the [documentation site](https://automapperts.netlify.app/docs/nestjs)
