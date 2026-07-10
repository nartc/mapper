# Function: extend()

## Call Signature

> **extend**\<`TSource`, `TDestination`, `TExtendSource`, `TExtendDestination`\>(`mapping`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/extend.ts:12](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/extend.ts#L12)

### Type Parameters

#### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

#### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

#### TExtendSource

`TExtendSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TExtendSource`\>

#### TExtendDestination

`TExtendDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TExtendDestination`\>

### Parameters

#### mapping

[`Mapping`](../type-aliases/Mapping.md)\<`TExtendSource`, `TExtendDestination`\>

### Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

## Call Signature

> **extend**\<`TSource`, `TDestination`, `TExtendSource`, `TExtendDestination`\>(`source`, `destination`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/extend.ts:20](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/extend.ts#L20)

### Type Parameters

#### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

#### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

#### TExtendSource

`TExtendSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TExtendSource`\>

#### TExtendDestination

`TExtendDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TExtendDestination`\>

### Parameters

#### source

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TExtendSource`\>

#### destination

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TExtendDestination`\>

### Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
