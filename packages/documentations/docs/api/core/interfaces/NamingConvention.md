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

[lib/types.ts:55](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L55)

___

### splittingExpression

• **splittingExpression**: `RegExp`

#### Defined in

[lib/types.ts:54](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L54)

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

[lib/types.ts:56](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L56)
