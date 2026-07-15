# Type Alias: MapFromReturn\<TSource, TDestination, TSelectorReturn\>

> **MapFromReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`MapFrom`](../enumerations/TransformationType.md#mapfrom), [`Selector`](Selector.md)\<`TSource`, [`MaybePromise`](MaybePromise.md)\<`TSelectorReturn`\>\>\]

Defined in: [core/src/lib/types.ts:394](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L394)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
