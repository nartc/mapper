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

[lib/types.ts:560](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L560)

___

### mapper

• **mapper**: [`Mapper`](Mapper.md)

#### Defined in

[lib/types.ts:561](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L561)

## Accessors

### applyMetadata

• `get` **applyMetadata**(): [`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Returns

[`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Defined in

[lib/types.ts:562](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L562)

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

[lib/types.ts:573](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L573)

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

[lib/types.ts:566](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L566)

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

[lib/types.ts:563](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L563)
