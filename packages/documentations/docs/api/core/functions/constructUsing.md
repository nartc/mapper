# Function: constructUsing()

> **constructUsing**\<`TSource`, `TDestination`\>(`destinationConstructor`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/construct-using.ts:9](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/construct-using.ts#L9)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

## Parameters

### destinationConstructor

[`DestinationConstructor`](../type-aliases/DestinationConstructor.md)\<`TSource`, `TDestination`\>

## Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
