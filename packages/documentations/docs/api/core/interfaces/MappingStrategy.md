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

### applyMetadata

• `Readonly` **applyMetadata**: [`ApplyMetadataFn`](../modules.md#applymetadatafn)

#### Defined in

[lib/types.ts:600](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L600)

___

### destinationConstructor

• **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:598](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L598)

___

### mapper

• **mapper**: [`Mapper`](Mapper.md)

#### Defined in

[lib/types.ts:599](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L599)

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

[lib/types.ts:611](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L611)

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

[lib/types.ts:604](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L604)

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

[lib/types.ts:601](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L601)
