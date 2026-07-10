# Type Alias: MapDeferReturn\<TSource, TDestination, TSelectorReturn\>

> **MapDeferReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`MapDefer`](../enumerations/TransformationType.md#mapdefer), [`DeferFunction`](../interfaces/DeferFunction.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>\]

Defined in: [core/src/lib/types.ts:385](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L385)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
