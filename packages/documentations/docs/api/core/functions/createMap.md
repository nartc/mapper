# Function: createMap()

## Call Signature

> **createMap**\<`TSource`\>(`mapper`, `source`, ...`mappingConfigFns`): [`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TSource`\>

Defined in: [core/src/lib/mappings/create-map.ts:20](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mappings/create-map.ts#L20)

### Type Parameters

#### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### Parameters

#### mapper

[`Mapper`](../interfaces/Mapper.md)

#### source

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

#### mappingConfigFns

...([`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TSource`\> \| `undefined`)[]

### Returns

[`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TSource`\>

## Call Signature

> **createMap**\<`TSource`, `TDestination`\>(`mapper`, `source`, `destination`, ...`mappingConfigFns`): [`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mappings/create-map.ts:25](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mappings/create-map.ts#L25)

### Type Parameters

#### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

#### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### Parameters

#### mapper

[`Mapper`](../interfaces/Mapper.md)

#### source

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TSource`\>

#### destination

[`ModelIdentifier`](../type-aliases/ModelIdentifier.md)\<`TDestination`\>

#### mappingConfigFns

...([`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\> \| `undefined`)[]

### Returns

[`Mapping`](../type-aliases/Mapping.md)\<`TSource`, `TDestination`\>
