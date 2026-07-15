# Function: forSelf()

> **forSelf**\<`TSource`, `TDestination`, `TSelfSource`\>(`sourceOrMapping`, `selector`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/for-self.ts:23](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/for-self.ts#L23)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelfSource

`TSelfSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSelfSource`\>

## Parameters

### sourceOrMapping

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSelfSource`\> \| [`Mapping`](../type-aliases/Mapping.md)\<`TSelfSource`, `TDestination`\>

### selector

[`Selector`](../type-aliases/Selector.md)\<`TSource`, `TSelfSource`\>

## Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
