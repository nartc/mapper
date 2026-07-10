# Class: AutoMapperError

Defined in: [core/src/lib/errors.ts:5](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L5)

Base class for all errors thrown by AutoMapper. Lets consumers catch
mapper errors selectively: `catch (e) { if (e instanceof AutoMapperError) ... }`.

## Extends

- `Error`

## Extended by

- [`MappingNotFoundError`](MappingNotFoundError.md)
- [`MapMemberError`](MapMemberError.md)

## Constructors

### Constructor

> **new AutoMapperError**(`message`): `AutoMapperError`

Defined in: [core/src/lib/errors.ts:6](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/errors.ts#L6)

#### Parameters

##### message

`string`

#### Returns

`AutoMapperError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

`Error.cause`

***

### message

> **message**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1074

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack?**: `string`

Defined in: documentations/node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.stack`
