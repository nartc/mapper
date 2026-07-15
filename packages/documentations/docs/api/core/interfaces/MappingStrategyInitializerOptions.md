# Interface: MappingStrategyInitializerOptions

Defined in: [core/src/lib/types.ts:736](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L736)

## Properties

### applyMetadata?

> `optional` **applyMetadata?**: [`ApplyMetadata`](../type-aliases/ApplyMetadata.md)

Defined in: [core/src/lib/types.ts:737](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L737)

***

### destinationConstructor?

> `optional` **destinationConstructor?**: [`DestinationConstructor`](../type-aliases/DestinationConstructor.md)\<`any`, `any`\>

Defined in: [core/src/lib/types.ts:738](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L738)

## Methods

### postMap()?

> `optional` **postMap**\<`TSource`, `TDestination`\>(`source`, `destination`, `mapping`): `TDestination`

Defined in: [core/src/lib/types.ts:746](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L746)

#### Type Parameters

##### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

#### Parameters

##### source

`TSource`

##### destination

`TDestination`

##### mapping

[`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TDestination`\>

#### Returns

`TDestination`

***

### preMap()?

> `optional` **preMap**\<`TSource`, `TDestination`\>(`source`, `mapping`): `TSource`

Defined in: [core/src/lib/types.ts:739](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L739)

#### Type Parameters

##### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

##### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

#### Parameters

##### source

`TSource`

##### mapping

[`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TDestination`\>

#### Returns

`TSource`
