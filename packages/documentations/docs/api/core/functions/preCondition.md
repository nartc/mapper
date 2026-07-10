# Function: preCondition()

> **preCondition**\<`TSource`, `TDestination`, `TSelectorReturn`\>(`predicate`, `defaultValue?`): [`PreConditionReturn`](../type-aliases/PreConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/pre-condition.ts:8](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/pre-condition.ts#L8)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = `unknown`

## Parameters

### predicate

[`ConditionPredicate`](../interfaces/ConditionPredicate.md)\<`TSource`\>

### defaultValue?

`TSelectorReturn`

## Returns

[`PreConditionReturn`](../type-aliases/PreConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
