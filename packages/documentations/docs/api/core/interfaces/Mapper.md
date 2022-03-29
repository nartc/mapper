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

[lib/types.ts:229](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L229)

___

### [MAPPINGS]

• **[MAPPINGS]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Mapping`](../modules.md#mapping)<`any`, `any`\>\>\>

#### Defined in

[lib/types.ts:230](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L230)

___

### [METADATA\_MAP]

• **[METADATA\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Metadata`](../modules.md#metadata)[]\>

#### Defined in

[lib/types.ts:233](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L233)

___

### [NAMING\_CONVENTIONS]

• **[NAMING\_CONVENTIONS]**: [`NamingConventionInput`](../modules.md#namingconventioninput)

#### Defined in

[lib/types.ts:232](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L232)

___

### [PROFILE\_CONFIGURATION\_CONTEXT]

• **[PROFILE\_CONFIGURATION\_CONTEXT]**: `Set`<[`MappingConfiguration`](../modules.md#mappingconfiguration)<`any`, `any`\>\>

#### Defined in

[lib/types.ts:236](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L236)

___

### [RECURSIVE\_COUNT]

• **[RECURSIVE\_COUNT]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:235](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L235)

___

### [RECURSIVE\_DEPTH]

• **[RECURSIVE\_DEPTH]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:234](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L234)

___

### [STRATEGY]

• **[STRATEGY]**: [`MappingStrategy`](MappingStrategy.md)<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>\>

#### Defined in

[lib/types.ts:231](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L231)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[lib/types.ts:227](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L227)

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

[lib/types.ts:143](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L143)

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

[lib/types.ts:163](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L163)

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

[lib/types.ts:173](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L173)

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

[lib/types.ts:153](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L153)

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

[lib/types.ts:183](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L183)

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

[lib/types.ts:205](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L205)

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

[lib/types.ts:216](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L216)

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

[lib/types.ts:194](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L194)
