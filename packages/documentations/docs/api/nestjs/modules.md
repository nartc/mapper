---
id: "modules"
title: "@automapper/nestjs"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [AutomapperModule](classes/AutomapperModule.md)
- [AutomapperProfile](classes/AutomapperProfile.md)

## Interfaces

- [AutomapperAsyncOptions](interfaces/AutomapperAsyncOptions.md)
- [AutomapperGlobalOptions](interfaces/AutomapperGlobalOptions.md)
- [AutomapperOptionsFactory](interfaces/AutomapperOptionsFactory.md)

## Type aliases

### AutomapperOptions

Ƭ **AutomapperOptions**: `CreateMapperOptions` \| `CreateMapperOptions` & { `name`: `string`  }[]

#### Defined in

[packages/nestjs/src/lib/options.ts:8](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/options.ts#L8)

## Variables

### DEFAULT\_MAPPER\_TOKEN

• `Const` **DEFAULT\_MAPPER\_TOKEN**: ``"automapper:nestjs:default"``

#### Defined in

[packages/nestjs/src/lib/di/get-mapper-token.ts:1](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/di/get-mapper-token.ts#L1)

## Functions

### InjectMapper

▸ **InjectMapper**(`name?`): (`target`: `object`, `key`: `string` \| `symbol`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`fn`

▸ (`target`, `key`, `index?`): `void`

Decorator that marks a constructor parameter as a target for
[Dependency Injection (DI)](https://docs.nestjs.com/providers#dependency-injection).

Any injected provider must be visible within the module scope (loosely
speaking, the containing module) of the class it is being injected into. This
can be done by:

- defining the provider in the same module scope
- exporting the provider from one module scope and importing that module into the
  module scope of the class being injected into
- exporting the provider from a module that is marked as global using the
  `@Global()` decorator

#### Injection tokens
Can be *types* (class names), *strings* or *symbols*. This depends on how the
provider with which it is associated was defined. Providers defined with the
`@Injectable()` decorator use the class name. Custom Providers may use strings
or symbols as the injection token.

**`see`** [Providers](https://docs.nestjs.com/providers)

**`see`** [Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)

**`see`** [Injection Scopes](https://docs.nestjs.com/fundamentals/injection-scopes)

**`publicapi`**

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/nestjs/src/lib/di/inject-mapper.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/di/inject-mapper.ts#L4)

___

### MapInterceptor

▸ **MapInterceptor**<`TSource`, `TDestination`\>(`from`, `to`, `options?`): `NestInterceptor`<`any`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends `Dictionary`<`TSource`\> |
| `TDestination` | extends `Dictionary`<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `ModelIdentifier`<`TSource`\> |
| `to` | `ModelIdentifier`<`TDestination`\> |
| `options?` | { `isArray?`: `boolean` ; `mapperName?`: `string`  } & `MapOptions`<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`NestInterceptor`<`any`, `any`\>

#### Defined in

[packages/nestjs/src/lib/map.interceptor.ts:23](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/map.interceptor.ts#L23)

___

### MapPipe

▸ **MapPipe**<`TSource`, `TDestination`\>(`from`, `to`, `options?`): `PipeTransform`<`any`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends `Dictionary`<`TSource`\> |
| `TDestination` | extends `Dictionary`<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `ModelIdentifier`<`TSource`\> |
| `to` | `ModelIdentifier`<`TDestination`\> |
| `options?` | { `isArray?`: `boolean` ; `mapperName?`: `string`  } & `MapOptions`<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`PipeTransform`<`any`, `any`\>

#### Defined in

[packages/nestjs/src/lib/map.pipe.ts:17](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/map.pipe.ts#L17)

___

### getMapperToken

▸ **getMapperToken**(`name?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`string`

#### Defined in

[packages/nestjs/src/lib/di/get-mapper-token.ts:3](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/di/get-mapper-token.ts#L3)
