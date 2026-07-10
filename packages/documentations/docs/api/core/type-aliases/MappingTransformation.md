# Type Alias: MappingTransformation\<TSource, TDestination, TSelectorReturn\>

> **MappingTransformation**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`MemberMapReturn`](MemberMapReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>, [`PreConditionReturn`](PreConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>\]

Defined in: [core/src/lib/types.ts:494](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L494)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\> = `any`

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\> = `any`

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
