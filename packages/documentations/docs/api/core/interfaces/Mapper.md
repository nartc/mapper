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

[lib/types.ts:279](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L279)

___

### [MAPPINGS]

• **[MAPPINGS]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Mapping`](../modules.md#mapping)<`any`, `any`\>\>\>

#### Defined in

[lib/types.ts:280](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L280)

___

### [METADATA\_MAP]

• **[METADATA\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`Metadata`](../modules.md#metadata)[]\>

#### Defined in

[lib/types.ts:283](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L283)

___

### [METADATA\_OBJECT\_MAP]

• **[METADATA\_OBJECT\_MAP]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [asSource?: Record<string, unknown\>, asDestination?: Record<string, unknown\>]\>

#### Defined in

[lib/types.ts:284](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L284)

___

### [NAMING\_CONVENTIONS]

• **[NAMING\_CONVENTIONS]**: [`NamingConventionInput`](../modules.md#namingconventioninput)

#### Defined in

[lib/types.ts:282](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L282)

___

### [PROFILE\_CONFIGURATION\_CONTEXT]

• **[PROFILE\_CONFIGURATION\_CONTEXT]**: `Set`<[`MappingConfiguration`](../modules.md#mappingconfiguration)<`any`, `any`\>\>

#### Defined in

[lib/types.ts:293](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L293)

___

### [RECURSIVE\_COUNT]

• **[RECURSIVE\_COUNT]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:292](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L292)

___

### [RECURSIVE\_DEPTH]

• **[RECURSIVE\_DEPTH]**: `Map`<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](../modules.md#arraykeyedmap)\>

#### Defined in

[lib/types.ts:291](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L291)

___

### [STRATEGY]

• **[STRATEGY]**: [`MappingStrategy`](MappingStrategy.md)<[`MetadataIdentifier`](../modules.md#metadataidentifier)<`any`\>\>

#### Defined in

[lib/types.ts:281](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L281)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[lib/types.ts:277](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L277)

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

[lib/types.ts:149](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L149)

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

[lib/types.ts:158](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L158)

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

[lib/types.ts:179](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L179)

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

[lib/types.ts:188](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L188)

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

[lib/types.ts:194](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L194)

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

[lib/types.ts:203](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L203)

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

[lib/types.ts:164](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L164)

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

[lib/types.ts:173](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L173)

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

[lib/types.ts:209](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L209)

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

[lib/types.ts:219](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L219)

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

[lib/types.ts:243](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L243)

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

[lib/types.ts:253](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L253)

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

[lib/types.ts:260](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L260)

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

[lib/types.ts:270](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L270)

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

[lib/types.ts:226](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L226)

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

[lib/types.ts:236](https://github.com/nartc/mapper/blob/3ff1b7bf/packages/core/src/lib/types.ts#L236)
