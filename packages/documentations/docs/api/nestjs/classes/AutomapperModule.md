# Class: AutomapperModule

Defined in: [packages/nestjs/src/lib/automapper-nestjs.module.ts:14](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/automapper-nestjs.module.ts#L14)

## Constructors

### Constructor

> **new AutomapperModule**(): `AutomapperModule`

#### Returns

`AutomapperModule`

## Methods

### forRoot()

#### Call Signature

> `static` **forRoot**(`mapperOptions`): `DynamicModule`

Defined in: [packages/nestjs/src/lib/automapper-nestjs.module.ts:15](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/automapper-nestjs.module.ts#L15)

##### Parameters

###### mapperOptions

`CreateMapperOptions`

##### Returns

`DynamicModule`

#### Call Signature

> `static` **forRoot**(`mapperOptions`, `globalOptions?`): `DynamicModule`

Defined in: [packages/nestjs/src/lib/automapper-nestjs.module.ts:16](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/automapper-nestjs.module.ts#L16)

##### Parameters

###### mapperOptions

`CreateMapperOptions` & `object`[]

###### globalOptions?

[`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md)

##### Returns

`DynamicModule`

***

### forRootAsync()

#### Call Signature

> `static` **forRootAsync**(`asyncMapperOptions`): `DynamicModule`

Defined in: [packages/nestjs/src/lib/automapper-nestjs.module.ts:38](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/automapper-nestjs.module.ts#L38)

##### Parameters

###### asyncMapperOptions

[`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md)

##### Returns

`DynamicModule`

#### Call Signature

> `static` **forRootAsync**(`asyncMapperOptions`, `globalOptions?`): `DynamicModule`

Defined in: [packages/nestjs/src/lib/automapper-nestjs.module.ts:41](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/automapper-nestjs.module.ts#L41)

##### Parameters

###### asyncMapperOptions

[`AutomapperAsyncOptions`](../interfaces/AutomapperAsyncOptions.md) & `object`[]

###### globalOptions?

[`AutomapperGlobalOptions`](../interfaces/AutomapperGlobalOptions.md)

##### Returns

`DynamicModule`
