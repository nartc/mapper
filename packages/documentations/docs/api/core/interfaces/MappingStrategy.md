---
id: "MappingStrategy"
title: "Interface: MappingStrategy<TIdentifier>"
sidebar_label: "MappingStrategy"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `TIdentifier` | extends [`MetadataIdentifier`](../modules.md#metadataidentifier) |

## Properties

### destinationConstructor

• **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:541](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L541)

___

### mapper

• **mapper**: [`Mapper`](Mapper.md)

#### Defined in

[lib/types.ts:542](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L542)

## Accessors

### applyMetadata

• `get` **applyMetadata**(): [`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Returns

[`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Defined in

[lib/types.ts:543](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L543)

## Methods

### postMap

▸ **postMap**<`TSource`, `TDestination`\>(`source`, `destination`): `undefined` \| `TDestination`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |
| `destination` | `TDestination` |

#### Returns

`undefined` \| `TDestination`

#### Defined in

[lib/types.ts:548](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L548)

___

### preMap

▸ **preMap**<`TSource`\>(`source`): `TSource`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |

#### Returns

`TSource`

#### Defined in

[lib/types.ts:547](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L547)

___

### retrieveMetadata

▸ **retrieveMetadata**(...`identifiers`): `Map`<`TIdentifier`, [`MetadataList`](../modules.md#metadatalist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...identifiers` | `TIdentifier`[] |

#### Returns

`Map`<`TIdentifier`, [`MetadataList`](../modules.md#metadatalist)\>

#### Defined in

[lib/types.ts:544](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L544)
