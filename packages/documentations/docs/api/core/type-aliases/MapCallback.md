# Type Alias: MapCallback\<TSource, TDestination, TExtraArgs\>

> **MapCallback**\<`TSource`, `TDestination`, `TExtraArgs`\> = (`source`, `destination`, `extraArguments?`) => [`MaybePromise`](MaybePromise.md)\<`void`\>

Defined in: [core/src/lib/types.ts:118](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L118)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\>

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\>

### TExtraArgs

`TExtraArgs` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Parameters

### source

`TSource`

### destination

`TDestination`

### extraArguments?

`TExtraArgs`

## Returns

[`MaybePromise`](MaybePromise.md)\<`void`\>
