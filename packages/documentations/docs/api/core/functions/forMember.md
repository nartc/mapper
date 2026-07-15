# Function: forMember()

> **forMember**\<`TSource`, `TDestination`, `TMemberType`\>(`selector`, ...`fns`): [`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>

Defined in: [core/src/lib/mapping-configurations/for-member.ts:14](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/mapping-configurations/for-member.ts#L14)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TMemberType

`TMemberType` = `unknown`

## Parameters

### selector

[`Selector`](../type-aliases/Selector.md)\<`TDestination`, `TMemberType`\>

### fns

...\[[`PreConditionReturn`](../type-aliases/PreConditionReturn.md)\<`TSource`, `TDestination`, `TMemberType`\> \| [`MemberMapReturn`](../type-aliases/MemberMapReturn.md)\<`TSource`, `TDestination`, `TMemberType`\>, [`MemberMapReturn`](../type-aliases/MemberMapReturn.md)\<`TSource`, `TDestination`, `TMemberType`\>\]

## Returns

[`MappingConfiguration`](../type-aliases/MappingConfiguration.md)\<`TSource`, `TDestination`\>
