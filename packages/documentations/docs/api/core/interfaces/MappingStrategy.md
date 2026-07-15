# Interface: MappingStrategy\<TIdentifier\>

Defined in: [core/src/lib/types.ts:709](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L709)

## Type Parameters

### TIdentifier

`TIdentifier` *extends* [`MetadataIdentifier`](../type-aliases/MetadataIdentifier.md)

## Properties

### applyMetadata

> `readonly` **applyMetadata**: [`ApplyMetadataFn`](../type-aliases/ApplyMetadataFn.md)

Defined in: [core/src/lib/types.ts:712](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L712)

***

### destinationConstructor

> **destinationConstructor**: [`DestinationConstructor`](../type-aliases/DestinationConstructor.md)

Defined in: [core/src/lib/types.ts:710](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L710)

***

### mapper

> **mapper**: [`Mapper`](Mapper.md)

Defined in: [core/src/lib/types.ts:711](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L711)

## Methods

### postMap()

> **postMap**\<`TSource`, `TDestination`\>(`source`, `destination`, `mapping`): `TDestination` \| `undefined`

Defined in: [core/src/lib/types.ts:723](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L723)

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

`TDestination` \| `undefined`

***

### preMap()

> **preMap**\<`TSource`, `TDestination`\>(`source`, `mapping`): `TSource`

Defined in: [core/src/lib/types.ts:716](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L716)

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

***

### retrieveMetadata()

> **retrieveMetadata**(...`identifiers`): `Map`\<`TIdentifier`, [`MetadataList`](../type-aliases/MetadataList.md)\>

Defined in: [core/src/lib/types.ts:713](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L713)

#### Parameters

##### identifiers

...`TIdentifier`[]

#### Returns

`Map`\<`TIdentifier`, [`MetadataList`](../type-aliases/MetadataList.md)\>
