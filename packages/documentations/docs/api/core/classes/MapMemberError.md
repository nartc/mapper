# Class: MapMemberError

Defined in: [core/src/lib/errors.ts:27](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L27)

Thrown when mapping a single member fails; wraps the original error.

## Extends

- [`AutoMapperError`](AutoMapperError.md)

## Constructors

### Constructor

> **new MapMemberError**(`memberPath`, `destinationName`, `originalError`): `MapMemberError`

Defined in: [core/src/lib/errors.ts:28](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L28)

#### Parameters

##### memberPath

`string`

##### destinationName

`string`

##### originalError

`unknown`

#### Returns

`MapMemberError`

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

Defined in: [core/src/lib/errors.ts:30](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L30)

***

### memberPath

> `readonly` **memberPath**: `string`

Defined in: [core/src/lib/errors.ts:29](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L29)

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

### originalError

> `readonly` **originalError**: `unknown`

Defined in: [core/src/lib/errors.ts:31](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L31)

***

### stack?

> `optional` **stack?**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`AutoMapperError`](AutoMapperError.md).[`stack`](AutoMapperError.md#stack)
