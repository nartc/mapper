---
id: "Mapper"
title: "Interface: Mapper"
sidebar_label: "Mapper"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### [ERROR\_HANDLER]

• **[ERROR\_HANDLER]**: [`ErrorHandler`](ErrorHandler.md)

#### Defined in

[lib/types.ts:274](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L274)

___

### [MAPPINGS]

• **[MAPPINGS]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Mapping`](../modules.md#mapping)<`any`, `any`\>\>\>

#### Defined in

[lib/types.ts:275](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L275)

___

### [METADATA\_MAP]

• **[METADATA\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Metadata`](../modules.md#metadata)[]\>

#### Defined in

[lib/types.ts:278](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L278)

___

### [METADATA\_OBJECT\_MAP]

• **[METADATA\_OBJECT\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [asSource?: Record<string, unknown\>, asDestination?: Record<string, unknown\>]\>

#### Defined in

[lib/types.ts:279](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L279)

___

### [NAMING\_CONVENTIONS]

• **[NAMING\_CONVENTIONS]**: [`NamingConventionInput`](../modules.md#namingconventioninput)

#### Defined in

[lib/types.ts:277](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L277)

___

### [PROFILE\_CONFIGURATION\_CONTEXT]

• **[PROFILE\_CONFIGURATION\_CONTEXT]**: `Set`<[`MappingConfiguration`](../modules.md#mappingconfiguration)<`any`, `any`\>\>

#### Defined in

[lib/types.ts:288](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L288)

___

### [RECURSIVE\_COUNT]

• **[RECURSIVE\_COUNT]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:287](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L287)

___

### [RECURSIVE\_DEPTH]

• **[RECURSIVE\_DEPTH]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:286](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L286)

___

### [STRATEGY]

• **[STRATEGY]**: [`MappingStrategy`](MappingStrategy.md)<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>\>

#### Defined in

[lib/types.ts:276](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L276)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[lib/types.ts:272](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L272)

___

### map

▸ **map**<`TSource`, `TDestination`\>(`sourceObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `TDestination`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`TDestination`

#### Defined in

[lib/types.ts:144](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L144)

▸ **map**<`TSource`\>(`sourceObject`, `identifier`, `options?`): `TSource`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TSource`, `Record`<`string`, `any`\>\> |

#### Returns

`TSource`

#### Defined in

[lib/types.ts:153](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L153)

___

### mapArray

▸ **mapArray**<`TSource`, `TDestination`\>(`sourceArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `TDestination`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TDestination`[], `Record`<`string`, `any`\>\> |

#### Returns

`TDestination`[]

#### Defined in

[lib/types.ts:174](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L174)

▸ **mapArray**<`TSource`\>(`sourceArray`, `identifier`, `options?`): `TSource`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TSource`[], `Record`<`string`, `any`\>\> |

#### Returns

`TSource`[]

#### Defined in

[lib/types.ts:183](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L183)

___

### mapArrayAsync

▸ **mapArrayAsync**<`TSource`, `TDestination`\>(`sourceArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`<`TDestination`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TDestination`[], `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`TDestination`[]\>

#### Defined in

[lib/types.ts:189](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L189)

▸ **mapArrayAsync**<`TSource`\>(`sourceArray`, `identifier`, `options?`): `Promise`<`TSource`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TSource`[], `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`TSource`[]\>

#### Defined in

[lib/types.ts:198](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L198)

___

### mapAsync

▸ **mapAsync**<`TSource`, `TDestination`\>(`sourceObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`<`TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`TDestination`\>

#### Defined in

[lib/types.ts:159](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L159)

▸ **mapAsync**<`TSource`\>(`sourceObject`, `identifier`, `options?`): `Promise`<`TSource`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TSource`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`TSource`\>

#### Defined in

[lib/types.ts:168](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L168)

___

### mutate

▸ **mutate**<`TSource`, `TDestination`\>(`sourceObject`, `destinationObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `destinationObject` | `TDestination` |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[lib/types.ts:204](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L204)

▸ **mutate**<`TSource`\>(`sourceObject`, `destinationObject`, `identifier`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `destinationObject` | `TSource` |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TSource`, `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[lib/types.ts:214](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L214)

___

### mutateArray

▸ **mutateArray**<`TSource`, `TDestination`\>(`sourceArray`, `destinationArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `destinationArray` | `TDestination`[] |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TDestination`[], `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[lib/types.ts:238](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L238)

▸ **mutateArray**<`TSource`\>(`sourceArray`, `destinationArray`, `identifier`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `destinationArray` | `TSource`[] |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TSource`[], `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[lib/types.ts:248](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L248)

___

### mutateArrayAsync

▸ **mutateArrayAsync**<`TSource`, `TDestination`\>(`sourceArray`, `destinationArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `destinationArray` | `TDestination`[] |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TDestination`[], `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/types.ts:255](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L255)

▸ **mutateArrayAsync**<`TSource`\>(`sourceArray`, `destinationArray`, `identifier`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceArray` | `TSource`[] |
| `destinationArray` | `TSource`[] |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`[], `TSource`[], `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/types.ts:265](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L265)

___

### mutateAsync

▸ **mutateAsync**<`TSource`, `TDestination`\>(`sourceObject`, `destinationObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `destinationObject` | `TDestination` |
| `sourceIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `destinationIdentifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TDestination`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/types.ts:221](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L221)

▸ **mutateAsync**<`TSource`\>(`sourceObject`, `destinationObject`, `identifier`, `options?`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `destinationObject` | `TSource` |
| `identifier` | [`ModelIdentifier`](../modules.md#modelidentifier)<`TSource`\> |
| `options?` | [`MapOptions`](MapOptions.md)<`TSource`, `TSource`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/types.ts:231](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L231)
