# Variable: MapPipe

> `const` **MapPipe**: \<`TSource`, `TDestination`\>(`from`, `to`, `options?`) => `Type`\<`PipeTransform`\>

Defined in: [packages/nestjs/src/lib/map.pipe.ts:17](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/nestjs/src/lib/map.pipe.ts#L17)

## Type Parameters

### TSource

`TSource` *extends* `Dictionary`\<`TSource`\>

### TDestination

`TDestination` *extends* `Dictionary`\<`TDestination`\>

## Parameters

### from

`ModelIdentifier`\<`TSource`\>

### to

`ModelIdentifier`\<`TDestination`\>

### options?

`object` & `MapOptions`\<`TSource`, `TDestination`\>

## Returns

`Type`\<`PipeTransform`\>
