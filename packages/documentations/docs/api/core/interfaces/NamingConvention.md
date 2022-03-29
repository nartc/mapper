---
id: "NamingConvention"
title: "Interface: NamingConvention"
sidebar_label: "NamingConvention"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`CamelCaseNamingConvention`](../classes/CamelCaseNamingConvention.md)
- [`PascalCaseNamingConvention`](../classes/PascalCaseNamingConvention.md)
- [`SnakeCaseNamingConvention`](../classes/SnakeCaseNamingConvention.md)

## Properties

### separatorCharacter

• **separatorCharacter**: `string`

#### Defined in

[lib/types.ts:64](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L64)

___

### splittingExpression

• **splittingExpression**: `RegExp`

#### Defined in

[lib/types.ts:63](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L63)

## Methods

### transformPropertyName

▸ **transformPropertyName**(`sourcePropNameParts`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePropNameParts` | `string`[] |

#### Returns

`string`

#### Defined in

[lib/types.ts:65](https://github.com/nartc/mapper/blob/ed14722/packages/core/src/lib/types.ts#L65)
