# Type Alias: ConditionReturn\<TSource, TDestination, TSelectorReturn\>

> **ConditionReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`Condition`](../enumerations/TransformationType.md#condition), (`source`, `sourceMemberPath`) => `TSelectorReturn`\]

Defined in: [core/src/lib/types.ts:420](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L420)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
