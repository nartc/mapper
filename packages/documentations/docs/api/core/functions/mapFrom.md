# Function: mapFrom()

> **mapFrom**\<`TSource`, `TDestination`, `TSelectorReturn`\>(`from`): [`MapFromReturn`](../type-aliases/MapFromReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/map-from.ts:11](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/map-from.ts#L11)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = `unknown`

## Parameters

### from

[`Resolver`](../interfaces/Resolver.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| ((`source`) => [`MaybePromise`](../type-aliases/MaybePromise.md)\<`TSelectorReturn`\>)

## Returns

[`MapFromReturn`](../type-aliases/MapFromReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
