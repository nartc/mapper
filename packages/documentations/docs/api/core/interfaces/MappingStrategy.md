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

[lib/types.ts:555](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L555)

___

### mapper

• **mapper**: [`Mapper`](Mapper.md)

#### Defined in

[lib/types.ts:556](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L556)

## Accessors

### applyMetadata

• `get` **applyMetadata**(): [`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Returns

[`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Defined in

[lib/types.ts:557](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L557)

## Methods

### postMap

▸ **postMap**<`TSource`, `TDestination`\>(`source`, `destination`, `mapping`): `undefined` \| `TDestination`

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
| `mapping` | [`Mapping`](../modules.md#mapping)<`TSource`, `TDestination`\> |

#### Returns

`undefined` \| `TDestination`

#### Defined in

[lib/types.ts:568](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L568)

___

### preMap

▸ **preMap**<`TSource`, `TDestination`\>(`source`, `mapping`): `TSource`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |
| `mapping` | [`Mapping`](../modules.md#mapping)<`TSource`, `TDestination`\> |

#### Returns

`TSource`

#### Defined in

[lib/types.ts:561](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L561)

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

[lib/types.ts:558](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L558)
