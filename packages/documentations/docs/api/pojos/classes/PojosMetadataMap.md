---
id: "PojosMetadataMap"
title: "Class: PojosMetadataMap"
sidebar_label: "PojosMetadataMap"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new PojosMetadataMap**()

## Properties

### metadataStorage

▪ `Static` `Private` **metadataStorage**: `Map`<`symbol`, [key: string, metadata: Object][]\>

#### Defined in

[lib/metadata-map.ts:13](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L13)

## Methods

### create

▸ `Static` **create**<`TModel`\>(`identifier`, `metadata?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TModel` | extends `Dictionary`<`TModel`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `symbol` |
| `metadata` | { [key in string \| number \| symbol]?: PojoMetadata \| [PojoMetadata] \| Object } |

#### Returns

`void`

#### Defined in

[lib/metadata-map.ts:28](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L28)

___

### normalizePojoMetadata

▸ `Static` `Private` **normalizePojoMetadata**(`pojoMetadata`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pojoMetadata` | `unknown` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `depth` | `number` |
| `type` | () => [`PojoMetadata`](../modules.md#pojometadata) \| [[`PojoMetadata`](../modules.md#pojometadata)] |

#### Defined in

[lib/metadata-map.ts:84](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L84)

___

### reset

▸ `Static` **reset**(): `void`

#### Returns

`void`

#### Defined in

[lib/metadata-map.ts:24](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L24)

___

### retrieve

▸ `Static` **retrieve**(`identifier`): [`string`, { `depth`: `number` ; `isArray`: `boolean` ; `isGetterOnly?`: `boolean` ; `type`: () => [`PojoMetadata`](../modules.md#pojometadata)  }][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `symbol` |

#### Returns

[`string`, { `depth`: `number` ; `isArray`: `boolean` ; `isGetterOnly?`: `boolean` ; `type`: () => [`PojoMetadata`](../modules.md#pojometadata)  }][]

#### Defined in

[lib/metadata-map.ts:58](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L58)

___

### toSymbol

▸ `Static` `Private` **toSymbol**(`metadata`): [`PojoMetadata`](../modules.md#pojometadata) \| [[`PojoMetadata`](../modules.md#pojometadata)]

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | [`PojoMetadata`](../modules.md#pojometadata) \| [[`PojoMetadata`](../modules.md#pojometadata)] |

#### Returns

[`PojoMetadata`](../modules.md#pojometadata) \| [[`PojoMetadata`](../modules.md#pojometadata)]

#### Defined in

[lib/metadata-map.ts:116](https://github.com/nartc/mapper/blob/efc4cb9d/packages/pojos/src/lib/metadata-map.ts#L116)
