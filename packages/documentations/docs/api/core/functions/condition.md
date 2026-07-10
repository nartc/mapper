# Function: condition()

> **condition**\<`TSource`, `TDestination`, `TSelectorReturn`\>(`predicate`, `defaultValue?`): [`ConditionReturn`](../type-aliases/ConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/condition.ts:10](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/condition.ts#L10)

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

[`ConditionReturn`](../type-aliases/ConditionReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
