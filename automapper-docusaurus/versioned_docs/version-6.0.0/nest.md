---
id: nest
title: NestJS Integration
sidebar_label: NestJS
---

`@nartc/automapper` can be integrated with [NestJS](https://nestjs.com) by leveraging a separate library published under the name: `nestjsx-automapper`

- [Github](https://github.com/nestjsx/automapper)
- [NPM](https://www.npmjs.com/package/nestjsx-automapper)

<a href="https://badgen.net/travis/nestjsx/automapper"><img src="https://badgen.net/travis/nestjsx/automapper" alt="travis"/></a>
<a href="https://badgen.net/npm/v/nestjsx-automapper"><img src="https://badgen.net/npm/v/nestjsx-automapper" alt="npm"/></a>
<a href="https://badgen.net/npm/dt/nestjsx-automapper"><img src="https://badgen.net/npm/dt/nestjsx-automapper" alt="downloads"/></a>
<a href="https://badgen.net/bundlephobia/minzip/nestjsx-automapper"><img src="https://badgen.net/bundlephobia/minzip/nestjsx-automapper" alt="bundlephobia"/></a>
<a href="https://badgen.net/github/license/nestjsx/automapper"><img src="https://badgen.net/github/license/nestjsx/automapper" alt="license"/></a>
<a href="https://coveralls.io/repos/github/nestjsx/automapper/badge.svg?branch=master"><img src="https://coveralls.io/repos/github/nestjsx/automapper/badge.svg?branch=master" alt="coveralls"/></a>
<a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/nestjsx/automapper.svg" alt="Greenkeeper"/></a>

### Installation

```bash
npm i nestjsx-automapper
```

```bash
yarn add nestjsx-automapper
```

> `nestjsx-automapper` lists `@nartc/automapper` as its `dependencies`. Installing `nestjsx-automapper` will also install `@nartc/automapper`.

### Setup

1. Import `AutomapperModule` in `AppModule` and call `.withMapper()` method

```typescript
@Module({
  imports: [AutomapperModule.withMapper()],
})
export class AppModule {}
```

`AutomapperModule.withMapper()` has the following overloads:

```typescript
static withMapper(name?: string, options?: AutoMapperGlobalSettings);
static withMapper(options?: AutoMapperGlobalSettings);
```

- `name`: Name of the `AutoMapper` instance being created with `withMapper()`. Default to `"default"`
- `options`: `AutoMapperGlobalSettings` that will provide the naming conventions for `Source` and `Destination` models globally.

2. `nestjsx-automapper` exposes a `@Profile()` decorator to decorate your `Profile` classes.

```typescript
@Profile()
class UserProfile extends ProfileBase {}
```

`@Profile()` takes in an optional `name` argument. This is the `name` if the `AutoMapper` instance you use to create the instance with `withMapper()`. Default to `"default"`

Usually, `NestJS` will have many **Feature Modules** for each of the **Domain Models**. Hence, a `Profile` should stay in close to where the **feature module** is.
If you want to separate `Profile` out to a separate file, then you need to make sure that file gets executed by importing it somewhere (again, the module is a good place).

3. Inject the `AutoMapper` instance in your `Injectable`

```typescript
@Injectable()
export class UserService {
  constructor(@InjectMapper() private readonly mapper: AutoMapper) {}
}
```

`@InjectMapper()` takes in an optional `name` argument which will tell the decorator which `AutoMapper` instance to inject. Default to `"default"`

> `InjectMapper` is imported from `nestjsx-automapper`. `AutoMapper` is imported from `@nartc/automapper`

4. Use `AutoMapper` on your models

```typescript
// ...
const result = await newUser.save();
return this.mapper.map(result.toJSON(), UserVm, User);
```
