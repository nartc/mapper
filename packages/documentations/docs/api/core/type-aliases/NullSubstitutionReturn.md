# Type Alias: NullSubstitutionReturn\<TSource, TDestination, TSelectorReturn\>

> **NullSubstitutionReturn**\<`TSource`, `TDestination`, `TSelectorReturn`\> = \[[`NullSubstitution`](../enumerations/TransformationType.md#nullsubstitution), (`source`, `sourceMemberPath`) => `TSelectorReturn`\]

Defined in: [core/src/lib/types.ts:444](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L444)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
