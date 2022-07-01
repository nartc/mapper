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

[lib/types.ts:631](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L631)

___

### destinationConstructor

• `Optional` **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`any`, `any`\>

#### Defined in

[lib/types.ts:632](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L632)

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

[lib/types.ts:640](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L640)

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

[lib/types.ts:633](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L633)
