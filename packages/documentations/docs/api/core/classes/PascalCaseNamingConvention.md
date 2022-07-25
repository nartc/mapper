---
id: "PascalCaseNamingConvention"
title: "Class: PascalCaseNamingConvention"
sidebar_label: "PascalCaseNamingConvention"
sidebar_position: 0
custom_edit_url: null
---

PascalCaseNamingConvention

**`example`** ThisIsPascalCase

## Implements

- [`NamingConvention`](../interfaces/NamingConvention.md)

## Constructors

### constructor

• **new PascalCaseNamingConvention**()

## Properties

### separatorCharacter

• **separatorCharacter**: `string` = `''`

#### Implementation of

[NamingConvention](../interfaces/NamingConvention.md).[separatorCharacter](../interfaces/NamingConvention.md#separatorcharacter)

#### Defined in

[lib/naming-conventions/pascal-case-naming-convention.ts:9](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/naming-conventions/pascal-case-naming-convention.ts#L9)

___

### splittingExpression

• **splittingExpression**: `RegExp`

#### Implementation of

[NamingConvention](../interfaces/NamingConvention.md).[splittingExpression](../interfaces/NamingConvention.md#splittingexpression)

#### Defined in

[lib/naming-conventions/pascal-case-naming-convention.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/naming-conventions/pascal-case-naming-convention.ts#L10)

## Methods

### transformPropertyName

▸ **transformPropertyName**(`sourceNameParts`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceNameParts` | `string`[] |

#### Returns

`string`

#### Implementation of

[NamingConvention](../interfaces/NamingConvention.md).[transformPropertyName](../interfaces/NamingConvention.md#transformpropertyname)

#### Defined in

[lib/naming-conventions/pascal-case-naming-convention.ts:12](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/naming-conventions/pascal-case-naming-convention.ts#L12)
