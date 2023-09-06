---
id: 'index'
title: '@jersmart/automapper-nestjs'
slug: '/api/nestjs/'
sidebar_label: 'README'
sidebar_position: 0
custom_edit_url: null
---

# @jersmart/automapper-nestjs

This is a NestJS module to integrate `@automapper` with NestJS.

## Installation

```sh
npm i @jersmart/automapper-nestjs
```

or with `yarn`:

```sh
yarn add @jersmart/automapper-nestjs
```

#### `peerDependencies`

`@jersmart/automapper-nestjs` depends on `@jersmart/automapper-core`

```sh
npm i @jersmart/automapper-core
```

or with `yarn`:

```sh
yarn add @jersmart/automapper-core
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

Read more about this on the [documentation site](https://automapperts.netlify.app/docs/nestjs)
