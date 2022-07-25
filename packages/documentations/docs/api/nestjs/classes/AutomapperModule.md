---
id: "AutomapperModule"
title: "Class: AutomapperModule"
sidebar_label: "AutomapperModule"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new AutomapperModule**()

## Methods

### createMapper

▸ `Static` `Private` **createMapper**(`mapperOptions`, `globalOptions?`): `Mapper`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapperOptions` | `CreateMapperOptions` |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`Mapper`

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:155](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L155)

___

### createMapperProvider

▸ `Static` `Private` **createMapperProvider**(`asyncMapperOptions`, `globalOptions?`): `Provider`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncMapperOptions` | [`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md) & { `name`: `string`  } |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`Provider`<`any`\>

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:120](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L120)

___

### createProvider

▸ `Static` `Private` **createProvider**(`asyncMapperOptions`, `globalOptions?`): `Provider`<`any`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncMapperOptions` | [`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md) & { `name`: `string`  } |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`Provider`<`any`\>[]

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:101](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L101)

___

### createProviders

▸ `Static` `Private` **createProviders**(`mapperOptions`, `globalOptions?`): `Provider`<`any`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapperOptions` | `CreateMapperOptions` & { `name`: `string`  }[] |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`Provider`<`any`\>[]

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:70](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L70)

___

### forRoot

▸ `Static` **forRoot**(`mapperOptions`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapperOptions` | `CreateMapperOptions` |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:15](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L15)

▸ `Static` **forRoot**(`mapperOptions`, `globalOptions?`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapperOptions` | `CreateMapperOptions` & { `name`: `string`  }[] |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:16](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L16)

___

### forRootAsync

▸ `Static` **forRootAsync**(`asyncMapperOptions`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncMapperOptions` | [`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:38](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L38)

▸ `Static` **forRootAsync**(`asyncMapperOptions`, `globalOptions?`): `DynamicModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncMapperOptions` | [`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md) & { `name`: `string`  }[] |
| `globalOptions?` | [`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md) |

#### Returns

`DynamicModule`

#### Defined in

[packages/nestjs/src/lib/automapper-nestjs.module.ts:41](https://github.com/nartc/mapper/blob/efc4cb9d/packages/nestjs/src/lib/automapper-nestjs.module.ts#L41)
