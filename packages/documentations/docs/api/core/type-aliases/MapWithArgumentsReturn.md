# Type Alias: MapWithArgumentsReturn\<TSource, TDestination, TSelectorReturn\>

> **MapWithArgumentsReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`MapWithArguments`](../enumerations/TransformationType.md#mapwitharguments), (`source`, `extraArguments`) => [`MaybePromise`](MaybePromise.md)\<`TSelectorReturn`\>\]

Defined in: [core/src/lib/types.ts:467](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L467)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
