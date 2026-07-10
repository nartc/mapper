# Type Alias: Mapping\<TSource, TDestination\>

> **Mapping**\<`TSource`, `TDestination`\> = \[\[[`MetadataIdentifier`](MetadataIdentifier.md)\<`TSource`\>, [`MetadataIdentifier`](MetadataIdentifier.md)\<`TDestination`\>\], \[`TSource`, `TDestination`\], \[`string`[], [`MappingProperty`](MappingProperty.md)\<`TSource`, `TDestination`, [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>\>, \[[`MetadataIdentifier`](MetadataIdentifier.md) \| [`Primitive`](Primitive.md) \| `Date`, [`MetadataIdentifier`](MetadataIdentifier.md) \| [`Primitive`](Primitive.md) \| `Date`\]\][], \[`string`[], [`MappingProperty`](MappingProperty.md)\<`TSource`, `TDestination`, [`SelectorReturn`](SelectorReturn.md)\<`TDestination`\>\>, \[[`MetadataIdentifier`](MetadataIdentifier.md) \| [`Primitive`](Primitive.md) \| `Date`, [`MetadataIdentifier`](MetadataIdentifier.md) \| [`Primitive`](Primitive.md) \| `Date`\]\][], [`Mapper`](../interfaces/Mapper.md), [`DestinationConstructor`](DestinationConstructor.md)\<`TSource`, `TDestination`\>, `Map`\<[`MetadataIdentifier`](MetadataIdentifier.md) \| [`PrimitiveConstructor`](PrimitiveConstructor.md) \| `DateConstructor`, \[`Map`\<[`MetadataIdentifier`](MetadataIdentifier.md) \| [`PrimitiveConstructor`](PrimitiveConstructor.md) \| `DateConstructor`, \[[`Selector`](Selector.md)?, [`Selector`](Selector.md)?\]\>?, `Map`\<[`MetadataIdentifier`](MetadataIdentifier.md) \| [`PrimitiveConstructor`](PrimitiveConstructor.md) \| `DateConstructor`, \[[`Selector`](Selector.md)?, [`Selector`](Selector.md)?\]\>?\]\>, \[[`MapCallback`](MapCallback.md)\<`TSource`, `TDestination`\>, [`MapCallback`](MapCallback.md)\<`TSource`, `TDestination`\>, [`MapCallback`](MapCallback.md)\<`TSource`[], `TDestination`[]\>, [`MapCallback`](MapCallback.md)\<`TSource`[], `TDestination`[]\>\], \[[`NamingConvention`](../interfaces/NamingConvention.md), [`NamingConvention`](../interfaces/NamingConvention.md)\], [`CompiledMapping`](../interfaces/CompiledMapping.md)\<`TSource`, `TDestination`\>\]

Defined in: [core/src/lib/types.ts:601](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/core/src/lib/types.ts#L601)

## Type Parameters

### TSource

`TSource` *extends* [`Dictionary`](Dictionary.md)\<`TSource`\> = `any`

### TDestination

`TDestination` *extends* [`Dictionary`](Dictionary.md)\<`TDestination`\> = `any`
