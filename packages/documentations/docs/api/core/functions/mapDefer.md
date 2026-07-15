# Function: mapDefer()

> **mapDefer**\<`TSource`, `TDestination`, `TSelectorReturn`\>(`defer`): [`MapDeferReturn`](../type-aliases/MapDeferReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/map-defer.ts:4](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/map-defer.ts#L4)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\> = `any`

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\> = `any`

### TSelectorReturn

`TSelectorReturn` = `unknown`

## Parameters

### defer

[`DeferFunction`](../interfaces/DeferFunction.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

## Returns

[`MapDeferReturn`](../type-aliases/MapDeferReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
