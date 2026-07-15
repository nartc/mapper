# Interface: Mapper

Defined in: [core/src/lib/types.ts:165](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L165)

## Properties

### \[ERROR\_HANDLER\]

> **\[ERROR\_HANDLER\]**: [`ErrorHandler`](ErrorHandler.md)

Defined in: [core/src/lib/types.ts:305](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L305)

***

### \[MAPPINGS\]

> **\[MAPPINGS\]**: `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, [`Mapping`](../type-aliases/Mapping.md)\<`any`, `any`\>\>\>

Defined in: [core/src/lib/types.ts:306](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L306)

***

### \[METADATA\_MAP\]

> **\[METADATA\_MAP\]**: `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, [`Metadata`](../type-aliases/Metadata.md)[]\>

Defined in: [core/src/lib/types.ts:309](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L309)

***

### \[METADATA\_OBJECT\_MAP\]

> **\[METADATA\_OBJECT\_MAP\]**: `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, \[`Record`\<`string`, `unknown`\>, `Record`\<`string`, `unknown`\>\]\>

Defined in: [core/src/lib/types.ts:310](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L310)

***

### \[NAMING\_CONVENTIONS\]

> **\[NAMING\_CONVENTIONS\]**: [`NamingConventionInput`](../type-aliases/NamingConventionInput.md)

Defined in: [core/src/lib/types.ts:308](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L308)

***

### \[PROFILE\_CONFIGURATION\_CONTEXT\]

> **\[PROFILE\_CONFIGURATION\_CONTEXT\]**: `Set`\<[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`any`, `any`\>\>

Defined in: [core/src/lib/types.ts:319](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L319)

***

### \[RECURSIVE\_COUNT\]

> **\[RECURSIVE\_COUNT\]**: `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, [`ArrayKeyedMap`](../type-aliases/ArrayKeyedMap.md)\>

Defined in: [core/src/lib/types.ts:318](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L318)

***

### \[RECURSIVE\_DEPTH\]

> **\[RECURSIVE\_DEPTH\]**: `Map`\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>, [`ArrayKeyedMap`](../type-aliases/ArrayKeyedMap.md)\>

Defined in: [core/src/lib/types.ts:317](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L317)

***

### \[STRATEGY\]

> **\[STRATEGY\]**: [`MappingStrategy`](MappingStrategy.md)\<[`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>\>

Defined in: [core/src/lib/types.ts:307](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L307)

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [core/src/lib/types.ts:303](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L303)

#### Returns

`void`

***

### map()

#### Call Signature

> **map**\<`TSource`, `TDestination`\>(`sourceObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `TDestination`

Defined in: [core/src/lib/types.ts:166](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L166)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceObject

`TSource`

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TDestination`, `Record`\<`string`, `unknown`\>\>

##### Returns

`TDestination`

#### Call Signature

> **map**\<`TSource`\>(`sourceObject`, `identifier`, `options?`): `TSource`

Defined in: [core/src/lib/types.ts:175](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L175)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceObject

`TSource`

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TSource`, `Record`\<`string`, `unknown`\>\>

##### Returns

`TSource`

***

### mapArray()

#### Call Signature

> **mapArray**\<`TSource`, `TDestination`\>(`sourceArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `TDestination`[]

Defined in: [core/src/lib/types.ts:205](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L205)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceArray

`TSource`[]

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TDestination`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`TDestination`[]

#### Call Signature

> **mapArray**\<`TSource`\>(`sourceArray`, `identifier`, `options?`): `TSource`[]

Defined in: [core/src/lib/types.ts:214](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L214)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceArray

`TSource`[]

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TSource`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`TSource`[]

***

### mapArrayAsync()

#### Call Signature

> **mapArrayAsync**\<`TSource`, `TDestination`\>(`sourceArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`\<`TDestination`[]\>

Defined in: [core/src/lib/types.ts:220](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L220)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceArray

`TSource`[]

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TDestination`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`TDestination`[]\>

#### Call Signature

> **mapArrayAsync**\<`TSource`\>(`sourceArray`, `identifier`, `options?`): `Promise`\<`TSource`[]\>

Defined in: [core/src/lib/types.ts:229](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L229)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceArray

`TSource`[]

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TSource`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`TSource`[]\>

***

### mapAsync()

#### Call Signature

> **mapAsync**\<`TSource`, `TDestination`\>(`sourceObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`\<`TDestination`\>

Defined in: [core/src/lib/types.ts:190](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L190)

Maps `sourceObject` and resolves with the result.

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceObject

`TSource`

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TDestination`, `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`TDestination`\>

##### Remarks

Member mapping itself is synchronous, but any `beforeMap`/`afterMap`
callbacks that return a promise are collected and awaited before the
returned promise resolves. Use the synchronous [map](#map) when no async
callbacks are involved.

#### Call Signature

> **mapAsync**\<`TSource`\>(`sourceObject`, `identifier`, `options?`): `Promise`\<`TSource`\>

Defined in: [core/src/lib/types.ts:199](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L199)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceObject

`TSource`

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TSource`, `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`TSource`\>

***

### mutate()

#### Call Signature

> **mutate**\<`TSource`, `TDestination`\>(`sourceObject`, `destinationObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `void`

Defined in: [core/src/lib/types.ts:235](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L235)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceObject

`TSource`

###### destinationObject

`TDestination`

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TDestination`, `Record`\<`string`, `unknown`\>\>

##### Returns

`void`

#### Call Signature

> **mutate**\<`TSource`\>(`sourceObject`, `destinationObject`, `identifier`, `options?`): `void`

Defined in: [core/src/lib/types.ts:245](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L245)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceObject

`TSource`

###### destinationObject

`TSource`

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TSource`, `Record`\<`string`, `unknown`\>\>

##### Returns

`void`

***

### mutateArray()

#### Call Signature

> **mutateArray**\<`TSource`, `TDestination`\>(`sourceArray`, `destinationArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `void`

Defined in: [core/src/lib/types.ts:269](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L269)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceArray

`TSource`[]

###### destinationArray

`TDestination`[]

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TDestination`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`void`

#### Call Signature

> **mutateArray**\<`TSource`\>(`sourceArray`, `destinationArray`, `identifier`, `options?`): `void`

Defined in: [core/src/lib/types.ts:279](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L279)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceArray

`TSource`[]

###### destinationArray

`TSource`[]

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TSource`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`void`

***

### mutateArrayAsync()

#### Call Signature

> **mutateArrayAsync**\<`TSource`, `TDestination`\>(`sourceArray`, `destinationArray`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`\<`void`\>

Defined in: [core/src/lib/types.ts:286](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L286)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceArray

`TSource`[]

###### destinationArray

`TDestination`[]

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TDestination`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **mutateArrayAsync**\<`TSource`\>(`sourceArray`, `destinationArray`, `identifier`, `options?`): `Promise`\<`void`\>

Defined in: [core/src/lib/types.ts:296](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L296)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceArray

`TSource`[]

###### destinationArray

`TSource`[]

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`[], `TSource`[], `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`void`\>

***

### mutateAsync()

#### Call Signature

> **mutateAsync**\<`TSource`, `TDestination`\>(`sourceObject`, `destinationObject`, `sourceIdentifier`, `destinationIdentifier`, `options?`): `Promise`\<`void`\>

Defined in: [core/src/lib/types.ts:252](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L252)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

###### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

##### Parameters

###### sourceObject

`TSource`

###### destinationObject

`TDestination`

###### sourceIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### destinationIdentifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TDestination`, `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **mutateAsync**\<`TSource`\>(`sourceObject`, `destinationObject`, `identifier`, `options?`): `Promise`\<`void`\>

Defined in: [core/src/lib/types.ts:262](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L262)

##### Type Parameters

###### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### Parameters

###### sourceObject

`TSource`

###### destinationObject

`TSource`

###### identifier

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

###### options?

[`MapOptions`](MapOptions.md)\<`TSource`, `TSource`, `Record`\<`string`, `unknown`\>\>

##### Returns

`Promise`\<`void`\>
