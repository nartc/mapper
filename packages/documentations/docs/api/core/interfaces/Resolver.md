# Interface: Resolver\<TSource, TDestination, TResolvedType\>

Defined in: [core/src/lib/types.ts:100](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L100)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\> = `any`

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\> = `any`

### TResolvedType

`TResolvedType` = [`SelectorReturn`](../type-aliases/SelectorReturn.md)\<`TDestination`\>

## Methods

### resolve()

> **resolve**(`source`, `destination?`): [`MaybePromise`](../type-aliases/MaybePromise.md)\<`TResolvedType`\>

Defined in: [core/src/lib/types.ts:105](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L105)

#### Parameters

##### source

`TSource`

##### destination?

`TDestination`

#### Returns

[`MaybePromise`](../type-aliases/MaybePromise.md)\<`TResolvedType`\>
