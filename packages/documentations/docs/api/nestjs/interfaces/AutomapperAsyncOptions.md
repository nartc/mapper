# Interface: AutomapperAsyncOptions

Defined in: [packages/nestjs/src/lib/options.ts:23](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/options.ts#L23)

## Extends

- `Pick`\<`ModuleMetadata`, `"imports"`\>

## Properties

### imports?

> `optional` **imports?**: (`DynamicModule` \| `Type`\<`any`\> \| `ForwardReference`\<`any`\> \| `Promise`\<`DynamicModule`\>)[]

Defined in: node\_modules/.pnpm/@nestjs+common@11.1.27\_reflect-metadata@0.2.2\_rxjs@7.8.1/node\_modules/@nestjs/common/interfaces/modules/module-metadata.interface.d.ts:18

Optional list of imported modules that export the providers which are
required in this module.

#### Inherited from

`Pick.imports`

***

### inject?

> `optional` **inject?**: `any`[]

Defined in: [packages/nestjs/src/lib/options.ts:25](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/options.ts#L25)

***

### useClass?

> `optional` **useClass?**: `Type`\<[`AutomapperOptionsFactory`](AutomapperOptionsFactory.md)\>

Defined in: [packages/nestjs/src/lib/options.ts:27](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/options.ts#L27)

***

### useExisting?

> `optional` **useExisting?**: `Type`\<[`AutomapperOptionsFactory`](AutomapperOptionsFactory.md)\>

Defined in: [packages/nestjs/src/lib/options.ts:26](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/options.ts#L26)

***

### useFactory?

> `optional` **useFactory?**: (...`args`) => `CreateMapperOptions` \| `Promise`\<`CreateMapperOptions`\>

Defined in: [packages/nestjs/src/lib/options.ts:28](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/options.ts#L28)

#### Parameters

##### args

...`any`[]

#### Returns

`CreateMapperOptions` \| `Promise`\<`CreateMapperOptions`\>
