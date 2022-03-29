---
id: "AutomapperAsyncOptions"
title: "Interface: AutomapperAsyncOptions"
sidebar_label: "AutomapperAsyncOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Pick`<`ModuleMetadata`, ``"imports"``\>

  ↳ **`AutomapperAsyncOptions`**

## Properties

### imports

• `Optional` **imports**: (`DynamicModule` \| `Type`<`any`\> \| `Promise`<`DynamicModule`\> \| `ForwardReference`<`any`\>)[]

Optional list of imported modules that export the providers which are
required in this module.

#### Inherited from

Pick.imports

#### Defined in

node_modules/@nestjs/common/interfaces/modules/module-metadata.interface.d.ts:18

___

### inject

• `Optional` **inject**: `any`[]

#### Defined in

[packages/nestjs/src/lib/options.ts:25](https://github.com/nartc/mapper/blob/e4b240d/packages/nestjs/src/lib/options.ts#L25)

___

### useClass

• `Optional` **useClass**: `Type`<[`AutomapperOptionsFactory`](AutomapperOptionsFactory.md)\>

#### Defined in

[packages/nestjs/src/lib/options.ts:27](https://github.com/nartc/mapper/blob/e4b240d/packages/nestjs/src/lib/options.ts#L27)

___

### useExisting

• `Optional` **useExisting**: `Type`<[`AutomapperOptionsFactory`](AutomapperOptionsFactory.md)\>

#### Defined in

[packages/nestjs/src/lib/options.ts:26](https://github.com/nartc/mapper/blob/e4b240d/packages/nestjs/src/lib/options.ts#L26)

## Methods

### useFactory

▸ `Optional` **useFactory**(...`args`): `CreateMapperOptions` \| `Promise`<`CreateMapperOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`CreateMapperOptions` \| `Promise`<`CreateMapperOptions`\>

#### Defined in

[packages/nestjs/src/lib/options.ts:28](https://github.com/nartc/mapper/blob/e4b240d/packages/nestjs/src/lib/options.ts#L28)
