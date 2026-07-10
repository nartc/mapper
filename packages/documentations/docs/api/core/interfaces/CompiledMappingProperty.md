# Interface: CompiledMappingProperty\<TSource, TDestination\>

Defined in: [core/src/lib/types.ts:549](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L549)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\> = `any`

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\> = `any`

## Properties

### destinationMemberIdentifier?

> `optional` **destinationMemberIdentifier?**: [`Primitive`](../type-aliases/Primitive.md) \| `Date` \| [`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>

Defined in: [core/src/lib/types.ts:558](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L558)

***

### destinationMemberPath

> **destinationMemberPath**: `string`[]

Defined in: [core/src/lib/types.ts:553](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L553)

***

### sourceMemberIdentifier?

> `optional` **sourceMemberIdentifier?**: [`Primitive`](../type-aliases/Primitive.md) \| `Date` \| [`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)\<`any`\>

Defined in: [core/src/lib/types.ts:559](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L559)

***

### transformationMapFn

> **transformationMapFn**: [`MemberMapReturn`](../type-aliases/MemberMapReturn.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/types.ts:554](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L554)

***

### transformationPreConditionDefaultValue?

> `optional` **transformationPreConditionDefaultValue?**: `unknown`

Defined in: [core/src/lib/types.ts:557](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L557)

***

### transformationPreConditionPredicate?

> `optional` **transformationPreConditionPredicate?**: (`source`) => `boolean`

Defined in: [core/src/lib/types.ts:556](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L556)

#### Parameters

##### source

`TSource`

#### Returns

`boolean`

***

### transformationType

> **transformationType**: [`TransformationType`](../enumerations/TransformationType.md)

Defined in: [core/src/lib/types.ts:555](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L555)
