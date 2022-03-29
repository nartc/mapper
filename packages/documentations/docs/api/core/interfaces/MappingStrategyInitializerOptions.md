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

[lib/types.ts:561](https://github.com/nartc/mapper/blob/e4b240d/packages/core/src/lib/types.ts#L561)

___

### destinationConstructor

• `Optional` **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:562](https://github.com/nartc/mapper/blob/e4b240d/packages/core/src/lib/types.ts#L562)

## Methods

### postMap

▸ `Optional` **postMap**<`TSource`, `TDestination`\>(`source`, `destination`): `TDestination`

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

`TDestination`

#### Defined in

[lib/types.ts:564](https://github.com/nartc/mapper/blob/e4b240d/packages/core/src/lib/types.ts#L564)

___

### preMap

▸ `Optional` **preMap**<`TSource`\>(`source`): `TSource`

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

[lib/types.ts:563](https://github.com/nartc/mapper/blob/e4b240d/packages/core/src/lib/types.ts#L563)
