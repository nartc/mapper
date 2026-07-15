# Class: CamelCaseNamingConvention

Defined in: [core/src/lib/naming-conventions/camel-case-naming-convention.ts:8](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/naming-conventions/camel-case-naming-convention.ts#L8)

CamelCaseNamingConvention

## Example

```ts
thisIsCamelCase
```

## Implements

- [`NamingConvention`](../interfaces/NamingConvention.md)

## Constructors

### Constructor

> **new CamelCaseNamingConvention**(): `CamelCaseNamingConvention`

#### Returns

`CamelCaseNamingConvention`

## Properties

### separatorCharacter

> **separatorCharacter**: `string` = `''`

Defined in: [core/src/lib/naming-conventions/camel-case-naming-convention.ts:9](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/naming-conventions/camel-case-naming-convention.ts#L9)

#### Implementation of

[`NamingConvention`](../interfaces/NamingConvention.md).[`separatorCharacter`](../interfaces/NamingConvention.md#separatorcharacter)

***

### splittingExpression

> **splittingExpression**: `RegExp`

Defined in: [core/src/lib/naming-conventions/camel-case-naming-convention.ts:10](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/naming-conventions/camel-case-naming-convention.ts#L10)

#### Implementation of

[`NamingConvention`](../interfaces/NamingConvention.md).[`splittingExpression`](../interfaces/NamingConvention.md#splittingexpression)

## Methods

### transformPropertyName()

> **transformPropertyName**(`sourceNameParts`): `string`

Defined in: [core/src/lib/naming-conventions/camel-case-naming-convention.ts:12](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/naming-conventions/camel-case-naming-convention.ts#L12)

#### Parameters

##### sourceNameParts

`string`[]

#### Returns

`string`

#### Implementation of

[`NamingConvention`](../interfaces/NamingConvention.md).[`transformPropertyName`](../interfaces/NamingConvention.md#transformpropertyname)
