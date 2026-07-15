# Function: mapWithArguments()

> **mapWithArguments**\<`TSource`, `TDestination`, `TSelectorReturn`\>(`withArgumentsResolver`): [`MapWithArgumentsReturn`](../type-aliases/MapWithArgumentsReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/map-with-arguments.ts:11](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/map-with-arguments.ts#L11)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = `unknown`

## Parameters

### withArgumentsResolver

[`Resolver`](../interfaces/Resolver.md)\<`TSource`, `Record`\<`string`, `unknown`\>, `TSelectorReturn`\> \| ((`source`, `extraArguments`) => [`MaybePromise`](../type-aliases/MaybePromise.md)\<`TSelectorReturn`\>)

## Returns

[`MapWithArgumentsReturn`](../type-aliases/MapWithArgumentsReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
