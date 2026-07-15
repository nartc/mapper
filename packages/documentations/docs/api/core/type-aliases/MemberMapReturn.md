# Type Alias: MemberMapReturn\<TSource, TDestination, TSelectorReturn\>

> **MemberMapReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = [`MemberMapReturnNoDefer`](MemberMapReturnNoDefer.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapDeferReturn`](MapDeferReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/types.ts:358](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L358)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
