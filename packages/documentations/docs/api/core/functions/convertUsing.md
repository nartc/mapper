# Function: convertUsing()

> **convertUsing**\<`TSource`, `TDestination`, `TSelectorReturn`, `TConvertSourceReturn`\>(`converter`, `selector`): [`ConvertUsingReturn`](../type-aliases/ConvertUsingReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>

Defined in: [core/src/lib/member-map-functions/convert-using.ts:10](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/member-map-functions/convert-using.ts#L10)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](../type-aliases/Dictionary.md)\<`TDestination`\>

### TSelectorReturn

`TSelectorReturn` = `unknown`

### TConvertSourceReturn

`TConvertSourceReturn` = `unknown`

## Parameters

### converter

[`Converter`](../interfaces/Converter.md)\<`TConvertSourceReturn`, `TSelectorReturn`\>

### selector

[`Selector`](../type-aliases/Selector.md)\<`TSource`, `TConvertSourceReturn`\>

## Returns

[`ConvertUsingReturn`](../type-aliases/ConvertUsingReturn.md)\<`TSource`, `TDestination`, `TSelectorReturn`\>
