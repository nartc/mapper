# Type Alias: PrimitiveConstructorReturnType\<TType\>

> **PrimitiveConstructorReturnType**\<`TType`\> = `TType` *extends* `DateConstructor` \| `Exclude`\<`TType`, [`PrimitiveConstructor`](PrimitiveConstructor.md)\> ? `InstanceType`\<`TType`\> : `ReturnType`\<`Extract`\<`TType`, [`PrimitiveConstructor`](PrimitiveConstructor.md)\>\>

Defined in: [core/src/lib/types.ts:41](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L41)

## Type Parameters

### TType

`TType` *extends* [`PrimitiveConstructorExtended`](PrimitiveConstructorExtended.md)
