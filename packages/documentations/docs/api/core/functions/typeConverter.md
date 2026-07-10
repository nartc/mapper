# Function: typeConverter()

> **typeConverter**\<`TSource`, `TDestination`, `TSourceConstructor`, `TDestinationConstructor`\>(`source`, `destination`, `converterOrValueSelector`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/type-converters.ts:41](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/type-converters.ts#L41)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSourceConstructor

`TSourceConstructor` *extends* [`PrimitiveConstructorExtended`](../type-aliases/PrimitiveConstructorExtended.md) \| \[[`PrimitiveConstructorExtended`](../type-aliases/PrimitiveConstructorExtended.md)\]

### TDestinationConstructor

`TDestinationConstructor` *extends* [`PrimitiveConstructorExtended`](../type-aliases/PrimitiveConstructorExtended.md) \| \[[`PrimitiveConstructorExtended`](../type-aliases/PrimitiveConstructorExtended.md)\]

## Parameters

### source

`TSourceConstructor`

### destination

`TDestinationConstructor`

### converterOrValueSelector

`ConverterOrValueSelector`\<`TSourceConstructor`, `TDestinationConstructor`\>

## Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
