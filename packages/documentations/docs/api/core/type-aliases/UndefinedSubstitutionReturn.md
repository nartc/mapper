# Type Alias: UndefinedSubstitutionReturn\<TSource, TDestination, TSelectorReturn\>

> **UndefinedSubstitutionReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`UndefinedSubstitution`](../enumerations/TransformationType.md#undefinedsubstitution), (`source`, `sourceMemberPath`) => `TSelectorReturn`\]

Defined in: [core/src/lib/types.ts:453](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L453)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
