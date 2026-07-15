# Function: isMappableIdentifier()

> **isMappableIdentifier**(`identifier`): `boolean`

Defined in: [core/src/lib/utils/is-mappable-identifier.ts:12](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/utils/is-mappable-identifier.ts#L12)

True when the identifier is a "real" model identifier (not a primitive or Date
constructor) — i.e. a candidate for nested (member) mapping.

## Parameters

### identifier

`unknown`

## Returns

`boolean`
