# Class: MappingNotFoundError

Defined in: [core/src/lib/errors.ts:16](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L16)

Thrown when `map()` cannot find a mapping for the given identifiers.

## Extends

- [`AutoMapperError`](AutoMapperError.md)

## Constructors

### Constructor

> **new MappingNotFoundError**(`sourceName`, `destinationName`): `MappingNotFoundError`

Defined in: [core/src/lib/errors.ts:17](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L17)

#### Parameters

##### sourceName

`string`

##### destinationName

`string`

#### Returns

`MappingNotFoundError`

#### Overrides

[`AutoMapperError`](AutoMapperError.md).[`constructor`](AutoMapperError.md#constructor)

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

[`AutoMapperError`](AutoMapperError.md).[`cause`](AutoMapperError.md#cause)

***

### destinationName

> `readonly` **destinationName**: `string`

Defined in: [core/src/lib/errors.ts:19](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L19)

***

### message

> **message**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

[`AutoMapperError`](AutoMapperError.md).[`message`](AutoMapperError.md#message)

***

### name

> **name**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1074

#### Inherited from

[`AutoMapperError`](AutoMapperError.md).[`name`](AutoMapperError.md#name)

***

### sourceName

> `readonly` **sourceName**: `string`

Defined in: [core/src/lib/errors.ts:18](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L18)

***

### stack?

> `optional` **stack?**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`AutoMapperError`](AutoMapperError.md).[`stack`](AutoMapperError.md#stack)
