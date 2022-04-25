---
id: "MappingStrategyInitializerOptions"
title: "Interface: MappingStrategyInitializerOptions"
sidebar_label: "MappingStrategyInitializerOptions"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### applyMetadata

• `Optional` **applyMetadata**: [`ApplyMetadata`](../modules.md#applymetadata)

#### Defined in

[lib/types.ts:582](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L582)

___

### destinationConstructor

• `Optional` **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:583](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L583)

## Methods

### postMap

▸ `Optional` **postMap**<`TSource`, `TDestination`\>(`source`, `destination`, `mapping`): `TDestination`

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

`TDestination`

#### Defined in

[lib/types.ts:591](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L591)

___

### preMap

▸ `Optional` **preMap**<`TSource`, `TDestination`\>(`source`, `mapping`): `TSource`

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

[lib/types.ts:584](https://github.com/nartc/mapper/blob/26cdf55/packages/core/src/lib/types.ts#L584)
