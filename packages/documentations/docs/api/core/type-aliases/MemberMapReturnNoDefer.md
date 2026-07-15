# Type Alias: MemberMapReturnNoDefer\<TSource, TDestination, TSelectorReturn\>

> **MemberMapReturnNoDefer**\<`TSource`, `TDestination`, `TSelectorReturn`\> = [`MapInitializeReturn`](MapInitializeReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapWithReturn`](MapWithReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapFromReturn`](MapFromReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`ConditionReturn`](ConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`FromValueReturn`](FromValueReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`ConvertUsingReturn`](ConvertUsingReturn.md)\<`TSource`, `TDestination`\> \| [`NullSubstitutionReturn`](NullSubstitutionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`UndefinedSubstitutionReturn`](UndefinedSubstitutionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`IgnoreReturn`](IgnoreReturn.md)\<`TSource`, `TDestination`\> \| [`MapWithArgumentsReturn`](MapWithArgumentsReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/types.ts:342](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L342)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>
