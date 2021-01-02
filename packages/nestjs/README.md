# @automapper/nestjs

This is a NestJS module to integrate `@automapper` with NestJS.

## Installation

```shell
npm i @automapper/nestjs
```

or with `yarn`:

```shell
yarn add @automapper/nestjs
```

#### `peerDependencies`

`@automapper/nestjs` depends on `@automapper/core` and `@automapper/types` (and some other `@nestjs/*` libraries but you
should already have these installed in a NestJS application)

```shell
npm i @automapper/core
npm i --save-dev @automapper/types
```

or with `yarn`:

```shell
yarn add @automapper/core
yarn add --dev @automapper/types
```

## Usage

Call `AutomapperModule.forRoot()` and provide some options to initialize the `Mapper` object(s).

```ts
@Module({
  imports: [AutomapperModule.forRoot({
    options: [{ name: '', pluginInitializer: classes }],
    singular: true
  })]
})
export class AppModule {
}
```

`AutomapperModule` is a `Global` module so when `Mapper` object(s) are initialized, they're available across the
application.

[comment]: <> (TODO: update docs site)
Read more about this on the [documentation site]()

Run `nx test nestjs` to execute the unit tests via [Jest](https://jestjs.io).
