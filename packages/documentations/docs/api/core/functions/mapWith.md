# Function: mapWith()

> **mapWith**\<`TSource`, `TDestination`, `TSelectorReturn`, `TWithDestination`, `TWithSource`, `TWithSourceValue`\>(`withDestination`, `withSource`, `withSourceValue`): [`MapWithReturn`](../type-aliases/MapWithReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/map-with.ts:12](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/map-with.ts#L12)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = `unknown`

### TWithDestination

`TWithDestination` *extends* [`ModelIdentifier`](../type-aliases/ModelIdentifier.md) = [`ModelIdentifier`](../type-aliases/ModelIdentifier.md)

### TWithSource

`TWithSource` *extends* [`ModelIdentifier`](../type-aliases/ModelIdentifier.md) = [`ModelIdentifier`](../type-aliases/ModelIdentifier.md)

### TWithSourceValue

`TWithSourceValue` *extends* [`ValueSelector`](../type-aliases/ValueSelector.md) = `TWithSource` *extends* `Constructor`\<`InferredWithSource`\> ? [`ValueSelector`](../type-aliases/ValueSelector.md)\<`TSource`, `InferredWithSource`\> : [`ValueSelector`](../type-aliases/ValueSelector.md)\<`TSource`\>

## Parameters

### withDestination

`TWithDestination`

### withSource

`TWithSource`

### withSourceValue

`TWithSourceValue`

## Returns

[`MapWithReturn`](../type-aliases/MapWithReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
