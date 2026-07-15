# Interface: MapOptions\<TSource, TDestination, TExtraArgs\>

Defined in: [core/src/lib/types.ts:128](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L128)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TExtraArgs

`TExtraArgs` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Properties

### afterMap?

> `optional` **afterMap?**: [`MapCallback`](../type-aliases/MapCallback.md)\<`TSource`, `TDestination`, `TExtraArgs`\>

Defined in: [core/src/lib/types.ts:134](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L134)

***

### beforeMap?

> `optional` **beforeMap?**: [`MapCallback`](../type-aliases/MapCallback.md)\<`TSource`, `TDestination`, `TExtraArgs`\>

Defined in: [core/src/lib/types.ts:133](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L133)

***

### destinationConstructor?

> `optional` **destinationConstructor?**: [`DestinationConstructor`](../type-aliases/DestinationConstructor.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/types.ts:135](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L135)

***

### extraArgs?

> `optional` **extraArgs?**: (`mapping`, `destinationObject`) => `TExtraArgs`

Defined in: [core/src/lib/types.ts:136](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L136)

#### Parameters

##### mapping

[`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TDestination`\>

##### destinationObject

`TDestination`

#### Returns

`TExtraArgs`
