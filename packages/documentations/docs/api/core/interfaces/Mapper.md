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

[lib/types.ts:235](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L235)

___

### [MAPPINGS]

• **[MAPPINGS]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Mapping`](../modules.md#mapping)<`any`, `any`\>\>\>

#### Defined in

[lib/types.ts:236](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L236)

___

### [METADATA\_MAP]

• **[METADATA\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Metadata`](../modules.md#metadata)[]\>

#### Defined in

[lib/types.ts:239](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L239)

___

### [METADATA\_OBJECT\_MAP]

• **[METADATA\_OBJECT\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [asSource?: Record<string, unknown\>, asDestination?: Record<string, unknown\>]\>

#### Defined in

[lib/types.ts:240](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L240)

___

### [NAMING\_CONVENTIONS]

• **[NAMING\_CONVENTIONS]**: [`NamingConventionInput`](../modules.md#namingconventioninput)

#### Defined in

[lib/types.ts:238](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L238)

___

### [PROFILE\_CONFIGURATION\_CONTEXT]

• **[PROFILE\_CONFIGURATION\_CONTEXT]**: `Set`<[`MappingConfiguration`](../modules.md#mappingconfiguration)<`any`, `any`\>\>

#### Defined in

[lib/types.ts:249](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L249)

___

### [RECURSIVE\_COUNT]

• **[RECURSIVE\_COUNT]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:248](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L248)

___

### [RECURSIVE\_DEPTH]

• **[RECURSIVE\_DEPTH]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:247](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L247)

___

### [STRATEGY]

• **[STRATEGY]**: [`MappingStrategy`](MappingStrategy.md)<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>\>

#### Defined in

[lib/types.ts:237](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L237)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[lib/types.ts:233](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L233)

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

[lib/types.ts:149](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L149)

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

[lib/types.ts:169](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L169)

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

[lib/types.ts:179](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L179)

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

[lib/types.ts:159](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L159)

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

[lib/types.ts:189](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L189)

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

[lib/types.ts:211](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L211)

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

[lib/types.ts:222](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L222)

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

[lib/types.ts:200](https://github.com/nartc/mapper/blob/446d40fc/packages/core/src/lib/types.ts#L200)
