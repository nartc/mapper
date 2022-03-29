---
id: "MapOptions"
title: "Interface: MapOptions<TSource, TDestination, TExtraArgs>"
sidebar_label: "MapOptions"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |
| `TExtraArgs` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Properties

### afterMap

• `Optional` **afterMap**: [`MapCallback`](../modules.md#mapcallback)<`TSource`, `TDestination`\>

#### Defined in

[lib/types.ts:116](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L116)

___

### beforeMap

• `Optional` **beforeMap**: [`MapCallback`](../modules.md#mapcallback)<`TSource`, `TDestination`\>

#### Defined in

[lib/types.ts:115](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L115)

___

### destinationConstructor

• `Optional` **destinationConstructor**: [`DestinationConstructor`](../modules.md#destinationconstructor)<`TSource`, `TDestination`\>

#### Defined in

[lib/types.ts:117](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L117)

## Methods

### extraArgs

▸ `Optional` **extraArgs**(`mapping`, `destinationObject`): `TExtraArgs`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`Mapping`](../modules.md#mapping)<`TSource`, `TDestination`\> |
| `destinationObject` | `TDestination` |

#### Returns

`TExtraArgs`

#### Defined in

[lib/types.ts:118](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L118)
