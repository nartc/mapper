# Type Alias: MapWithReturn\<TSource, TDestination, TSelectorReturn\>

> **MapWithReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`MapWith`](../enumerations/TransformationType.md#mapwith), (`sourceObj`, `mapper`, `options?`) => `TSelectorReturn` \| `undefined` \| `null`\]

Defined in: [core/src/lib/types.ts:403](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L403)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
