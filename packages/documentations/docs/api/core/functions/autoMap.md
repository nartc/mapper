# Function: autoMap()

> **autoMap**\<`TSource`, `TDestination`, `TKey`, `TValue`\>(`prop`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/auto-map.ts:6](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/auto-map.ts#L6)

## Type Parameters

### TSource

`TSource` *extends* \{ \[key in string \| number \| symbol\]: TValue \}

### TDestination

`TDestination` *extends* \{ \[key in string \| number \| symbol\]: TValue \}

### TKey

`TKey` *extends* `string` \| `number` \| `symbol`

### TValue

`TValue`

## Parameters

### prop

`TKey`

## Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
