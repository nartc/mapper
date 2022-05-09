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

[lib/types.ts:587](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L587)

___

### destinationConstructor

• `Optional` **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:588](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L588)

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

[lib/types.ts:596](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L596)

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

[lib/types.ts:589](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L589)
