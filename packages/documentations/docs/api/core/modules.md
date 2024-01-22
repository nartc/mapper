---
id: "modules"
title: "@automapper/core"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [MapFnClassId](enums/MapFnClassId.md)
- [MappingCallbacksClassId](enums/MappingCallbacksClassId.md)
- [MappingClassId](enums/MappingClassId.md)
- [MappingPropertiesClassId](enums/MappingPropertiesClassId.md)
- [MappingPropertyClassId](enums/MappingPropertyClassId.md)
- [MappingTransformationClassId](enums/MappingTransformationClassId.md)
- [MetadataClassId](enums/MetadataClassId.md)
- [MetadataObjectMapClassId](enums/MetadataObjectMapClassId.md)
- [NestedMappingPairClassId](enums/NestedMappingPairClassId.md)
- [TransformationType](enums/TransformationType.md)

## Classes

- [AutoMapperLogger](classes/AutoMapperLogger.md)
- [CamelCaseNamingConvention](classes/CamelCaseNamingConvention.md)
- [PascalCaseNamingConvention](classes/PascalCaseNamingConvention.md)
- [SnakeCaseNamingConvention](classes/SnakeCaseNamingConvention.md)

## Interfaces

- [ConditionPredicate](interfaces/ConditionPredicate.md)
- [Converter](interfaces/Converter.md)
- [CreateMapperOptions](interfaces/CreateMapperOptions.md)
- [DeferFunction](interfaces/DeferFunction.md)
- [ErrorHandler](interfaces/ErrorHandler.md)
- [MapOptions](interfaces/MapOptions.md)
- [Mapper](interfaces/Mapper.md)
- [MappingStrategy](interfaces/MappingStrategy.md)
- [MappingStrategyInitializerOptions](interfaces/MappingStrategyInitializerOptions.md)
- [NamingConvention](interfaces/NamingConvention.md)
- [Resolver](interfaces/Resolver.md)
- [TransformerMetadataFactory](interfaces/TransformerMetadataFactory.md)

## Type aliases

### AnyConstructor

Ƭ **AnyConstructor**: (...`args`: `any`[]) => `any`

#### Type declaration

• (...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Defined in

[lib/types.ts:15](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L15)

___

### ApplyMetadata

Ƭ **ApplyMetadata**: (`strategy`: [`MappingStrategy`](interfaces/MappingStrategy.md)<[`MetadataIdentifier`](modules.md#metadataidentifier)\>) => [`ApplyMetadataFn`](modules.md#applymetadatafn)

#### Type declaration

▸ (`strategy`): [`ApplyMetadataFn`](modules.md#applymetadatafn)

##### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | [`MappingStrategy`](interfaces/MappingStrategy.md)<[`MetadataIdentifier`](modules.md#metadataidentifier)\> |

##### Returns

[`ApplyMetadataFn`](modules.md#applymetadatafn)

#### Defined in

[lib/types.ts:571](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L571)

___

### ApplyMetadataFn

Ƭ **ApplyMetadataFn**: <TModel\>(`model`: [`MetadataIdentifier`](modules.md#metadataidentifier)<`TModel`\>, `as`: [`MetadataObjectMapClassId`](enums/MetadataObjectMapClassId.md)) => `TModel`

#### Type declaration

▸ <`TModel`\>(`model`, `as`): `TModel`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TModel` | extends [`Dictionary`](modules.md#dictionary)<`TModel`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`MetadataIdentifier`](modules.md#metadataidentifier)<`TModel`\> |
| `as` | [`MetadataObjectMapClassId`](enums/MetadataObjectMapClassId.md) |

##### Returns

`TModel`

#### Defined in

[lib/types.ts:566](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L566)

___

### ArrayKeyedMap

Ƭ **ArrayKeyedMap**: [`PathMap`](modules.md#pathmap) \| [`DataMap`](modules.md#datamap)

#### Defined in

[lib/types.ts:559](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L559)

___

### ConditionReturn

Ƭ **ConditionReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`Condition`](enums/TransformationType.md#condition), (`source`: `TSource`, `sourceMemberPath`: `string`[]) => `TSelectorReturn`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:382](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L382)

___

### Constructor

Ƭ **Constructor**<`T`\>: (...`args`: `any`[]) => `T` & [`TransformerMetadataFactory`](interfaces/TransformerMetadataFactory.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[lib/types.ts:16](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L16)

___

### ConvertUsingReturn

Ƭ **ConvertUsingReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`ConvertUsing`](enums/TransformationType.md#convertusing), [`Selector`](modules.md#selector)<`TSource`, `TSelectorReturn`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:397](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L397)

___

### DataMap

Ƭ **DataMap**: `Map`<`symbol`, `number`\>

#### Defined in

[lib/types.ts:555](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L555)

___

### DestinationConstructor

Ƭ **DestinationConstructor**<`TSource`, `TDestination`\>: (`sourceObject`: `TSource`, `destinationIdentifier`: [`MetadataIdentifier`](modules.md#metadataidentifier)<`TDestination`\>) => `TDestination`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |

#### Type declaration

▸ (`sourceObject`, `destinationIdentifier`): `TDestination`

##### Parameters

| Name | Type |
| :------ | :------ |
| `sourceObject` | `TSource` |
| `destinationIdentifier` | [`MetadataIdentifier`](modules.md#metadataidentifier)<`TDestination`\> |

##### Returns

`TDestination`

#### Defined in

[lib/types.ts:575](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L575)

___

### Dictionary

Ƭ **Dictionary**<`T`\>: { [key in keyof T]?: unknown }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[lib/types.ts:13](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L13)

___

### FromValueReturn

Ƭ **FromValueReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`FromValue`](enums/TransformationType.md#fromvalue), () => `TSelectorReturn`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:391](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L391)

___

### IgnoreReturn

Ƭ **IgnoreReturn**<`TSource`, `TDestination`\>: [[`Ignore`](enums/TransformationType.md#ignore)]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Defined in

[lib/types.ts:421](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L421)

___

### MapCallback

Ƭ **MapCallback**<`TSource`, `TDestination`, `TExtraArgs`\>: (`source`: `TSource`, `destination`: `TDestination`, `extraArguments?`: `TExtraArgs`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TExtraArgs` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

#### Type declaration

▸ (`source`, `destination`, `extraArguments?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |
| `destination` | `TDestination` |
| `extraArguments?` | `TExtraArgs` |

##### Returns

`void`

#### Defined in

[lib/types.ts:96](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L96)

___

### MapDeferReturn

Ƭ **MapDeferReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`MapDefer`](enums/TransformationType.md#mapdefer), [`DeferFunction`](interfaces/DeferFunction.md)<`TSource`, `TDestination`, `TSelectorReturn`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:354](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L354)

___

### MapFromReturn

Ƭ **MapFromReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`MapFrom`](enums/TransformationType.md#mapfrom), [`Selector`](modules.md#selector)<`TSource`, `TSelectorReturn`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:363](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L363)

___

### MapInitializeReturn

Ƭ **MapInitializeReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`MapInitialize`](enums/TransformationType.md#mapinitialize), [`Selector`](modules.md#selector)<`TSource`, `TSelectorReturn`\>, boolean?]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:435](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L435)

___

### MapWithArgumentsReturn

Ƭ **MapWithArgumentsReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`MapWithArguments`](enums/TransformationType.md#mapwitharguments), (`source`: `TSource`, `extraArguments`: `Record`<`string`, `any`\>) => `TSelectorReturn`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:426](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L426)

___

### MapWithReturn

Ƭ **MapWithReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`MapWith`](enums/TransformationType.md#mapwith), (`sourceObj`: `TSource`, `mapper`: [`Mapper`](interfaces/Mapper.md)) => `TSelectorReturn` \| `undefined` \| ``null``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:369](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L369)

___

### Mapping

Ƭ **Mapping**<`TSource`, `TDestination`\>: [identifiers: [source: MetadataIdentifier<TSource\>, destination: MetadataIdentifier<TDestination\>], identifierMetadata: [source: TSource, destination: TDestination], properties: [path: string[], mappingProperty: MappingProperty<TSource, TDestination, SelectorReturn<TDestination\>\>, nestedMappingPair?: [destination: MetadataIdentifier \| Primitive \| Date, source: MetadataIdentifier \| Primitive \| Date]][], mapper: Mapper, destinationConstructor: DestinationConstructor<TSource, TDestination\>, typeConverters?: Map<MetadataIdentifier \| PrimitiveConstructor \| DateConstructor, [Map<MetadataIdentifier \| PrimitiveConstructor \| DateConstructor, [Selector?, Selector?]\>?, Map<MetadataIdentifier \| PrimitiveConstructor \| DateConstructor, [Selector?, Selector?]\>?]\>, callbacks?: [beforeMap?: MapCallback<TSource, TDestination\>, afterMap?: MapCallback<TSource, TDestination\>], namingConventions?: [source: NamingConvention, destination: NamingConvention]]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |

#### Defined in

[lib/types.ts:507](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L507)

___

### MappingConfiguration

Ƭ **MappingConfiguration**<`TSource`, `TDestination`\>: (`mapping`: [`Mapping`](modules.md#mapping)<`TSource`, `TDestination`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |

#### Type declaration

▸ (`mapping`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`Mapping`](modules.md#mapping)<`TSource`, `TDestination`\> |

##### Returns

`void`

#### Defined in

[lib/types.ts:561](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L561)

___

### MappingProfile

Ƭ **MappingProfile**: (`mapper`: [`Mapper`](interfaces/Mapper.md)) => `void`

#### Type declaration

▸ (`mapper`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](interfaces/Mapper.md) |

##### Returns

`void`

#### Defined in

[lib/types.ts:583](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L583)

___

### MappingProperty

Ƭ **MappingProperty**<`TSource`, `TDestination`, `TSelectorReturn`\>: [target: string[], transformation: MappingTransformation<TSource, TDestination, TSelectorReturn\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:463](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L463)

___

### MappingStrategyInitializer

Ƭ **MappingStrategyInitializer**<`TIdentifier`\>: (`mapper`: [`Mapper`](interfaces/Mapper.md)) => [`MappingStrategy`](interfaces/MappingStrategy.md)<`TIdentifier`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TIdentifier` | extends [`MetadataIdentifier`](modules.md#metadataidentifier) |

#### Type declaration

▸ (`mapper`): [`MappingStrategy`](interfaces/MappingStrategy.md)<`TIdentifier`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](interfaces/Mapper.md) |

##### Returns

[`MappingStrategy`](interfaces/MappingStrategy.md)<`TIdentifier`\>

#### Defined in

[lib/types.ts:621](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L621)

___

### MappingTransformation

Ƭ **MappingTransformation**<`TSource`, `TDestination`, `TSelectorReturn`\>: [memberMapFn: MemberMapReturn<TSource, TDestination, TSelectorReturn\>, preCond?: PreConditionReturn<TSource, TDestination, TSelectorReturn\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:450](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L450)

___

### MemberMapReturn

Ƭ **MemberMapReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [`MemberMapReturnNoDefer`](modules.md#membermapreturnnodefer)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapDeferReturn`](modules.md#mapdeferreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:327](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L327)

___

### MemberMapReturnNoDefer

Ƭ **MemberMapReturnNoDefer**<`TSource`, `TDestination`, `TSelectorReturn`\>: [`MapInitializeReturn`](modules.md#mapinitializereturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapWithReturn`](modules.md#mapwithreturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`MapFromReturn`](modules.md#mapfromreturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`ConditionReturn`](modules.md#conditionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`FromValueReturn`](modules.md#fromvaluereturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`ConvertUsingReturn`](modules.md#convertusingreturn)<`TSource`, `TDestination`\> \| [`NullSubstitutionReturn`](modules.md#nullsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`UndefinedSubstitutionReturn`](modules.md#undefinedsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`IgnoreReturn`](modules.md#ignorereturn)<`TSource`, `TDestination`\> \| [`MapWithArgumentsReturn`](modules.md#mapwithargumentsreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:311](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L311)

___

### Metadata

Ƭ **Metadata**: [propertyKeys: string[], metaFn: Function, isArray: boolean, isGetterOnly?: boolean]

#### Defined in

[lib/types.ts:136](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L136)

___

### MetadataIdentifier

Ƭ **MetadataIdentifier**<`T`\>: `Exclude`<[`ModelIdentifier`](modules.md#modelidentifier)<`T`\>, `string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[lib/types.ts:122](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L122)

___

### MetadataList

Ƭ **MetadataList**: [property: string, metadata: Object][]

#### Defined in

[lib/types.ts:585](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L585)

___

### ModelIdentifier

Ƭ **ModelIdentifier**<`T`\>: `string` \| `symbol` \| [`Constructor`](modules.md#constructor)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[lib/types.ts:120](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L120)

___

### NamingConventionInput

Ƭ **NamingConventionInput**: [`NamingConvention`](interfaces/NamingConvention.md) \| { `destination`: [`NamingConvention`](interfaces/NamingConvention.md) ; `source`: [`NamingConvention`](interfaces/NamingConvention.md)  }

#### Defined in

[lib/types.ts:59](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L59)

___

### NestedMappingPair

Ƭ **NestedMappingPair**: [[`MetadataIdentifier`](modules.md#metadataidentifier) \| [`Primitive`](modules.md#primitive) \| `Date`, [`MetadataIdentifier`](modules.md#metadataidentifier) \| [`Primitive`](modules.md#primitive) \| `Date`]

#### Defined in

[lib/types.ts:491](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L491)

___

### NullSubstitutionReturn

Ƭ **NullSubstitutionReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`NullSubstitution`](enums/TransformationType.md#nullsubstitution), (`source`: `TSource`, `sourceMemberPath`: `string`[]) => `TSelectorReturn`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:403](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L403)

___

### PathMap

Ƭ **PathMap**: `Map`<`string`, [`PathMap`](modules.md#pathmap) \| [`DataMap`](modules.md#datamap)\>

#### Defined in

[lib/types.ts:557](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L557)

___

### PreConditionReturn

Ƭ **PreConditionReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [preConditionPredicate: ConditionPredicate<TSource\>, defaultValue?: TSelectorReturn]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:335](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L335)

___

### Primitive

Ƭ **Primitive**: `String` \| `Number` \| `Boolean`

#### Defined in

[lib/types.ts:19](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L19)

___

### PrimitiveConstructor

Ƭ **PrimitiveConstructor**: `StringConstructor` \| `NumberConstructor` \| `BooleanConstructor`

#### Defined in

[lib/types.ts:22](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L22)

___

### PrimitiveConstructorExtended

Ƭ **PrimitiveConstructorExtended**: [`PrimitiveConstructor`](modules.md#primitiveconstructor) \| `DateConstructor` \| [`AnyConstructor`](modules.md#anyconstructor)

#### Defined in

[lib/types.ts:27](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L27)

___

### PrimitiveConstructorReturnType

Ƭ **PrimitiveConstructorReturnType**<`TType`\>: `TType` extends `DateConstructor` \| `Exclude`<`TType`, [`PrimitiveConstructor`](modules.md#primitiveconstructor)\> ? `InstanceType`<`TType`\> : `ReturnType`<`Extract`<`TType`, [`PrimitiveConstructor`](modules.md#primitiveconstructor)\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TType` | extends [`PrimitiveConstructorExtended`](modules.md#primitiveconstructorextended) |

#### Defined in

[lib/types.ts:32](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L32)

___

### PrimitiveExtended

Ƭ **PrimitiveExtended**: [`Primitive`](modules.md#primitive) \| `Date`

#### Defined in

[lib/types.ts:20](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L20)

___

### Selector

Ƭ **Selector**<`TObject`, `TReturnType`\>: (`obj`: `TObject`) => `TReturnType`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObject` | extends [`Dictionary`](modules.md#dictionary)<`TObject`\> = `any` |
| `TReturnType` | `unknown` |

#### Type declaration

▸ (`obj`): `TReturnType`

##### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `TObject` |

##### Returns

`TReturnType`

#### Defined in

[lib/types.ts:66](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L66)

___

### SelectorReturn

Ƭ **SelectorReturn**<`TObject`\>: `ReturnType`<[`Selector`](modules.md#selector)<`TObject`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObject` | extends [`Dictionary`](modules.md#dictionary)<`TObject`\> |

#### Defined in

[lib/types.ts:71](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L71)

___

### UndefinedSubstitutionReturn

Ƭ **UndefinedSubstitutionReturn**<`TSource`, `TDestination`, `TSelectorReturn`\>: [[`UndefinedSubstitution`](enums/TransformationType.md#undefinedsubstitution), (`source`: `TSource`, `sourceMemberPath`: `string`[]) => `TSelectorReturn`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Defined in

[lib/types.ts:412](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L412)

___

### ValueSelector

Ƭ **ValueSelector**<`TSource`, `TDestination`, `TValueReturn`\>: (`source`: `TSource`) => `TValueReturn`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |
| `TValueReturn` | [`SelectorReturn`](modules.md#selectorreturn)<`TDestination`\> |

#### Type declaration

▸ (`source`): `TValueReturn`

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |

##### Returns

`TValueReturn`

#### Defined in

[lib/types.ts:75](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L75)

## Variables

### defaultStrategyInitializerOptions

• `Const` **defaultStrategyInitializerOptions**: `Required`<`Omit`<[`MappingStrategyInitializerOptions`](interfaces/MappingStrategyInitializerOptions.md), ``"destinationConstructor"``\>\>

#### Defined in

[lib/default-strategy-initializer-options.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/default-strategy-initializer-options.ts#L4)

## Functions

### addProfile

▸ **addProfile**(`mapper`, `profile`, ...`mappingConfigurations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](interfaces/Mapper.md) |
| `profile` | [`MappingProfile`](modules.md#mappingprofile) |
| `...mappingConfigurations` | [`MappingConfiguration`](modules.md#mappingconfiguration)<`any`, `any`\>[] |

#### Returns

`void`

#### Defined in

[lib/mappings/add-profile.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mappings/add-profile.ts#L4)

___

### afterMap

▸ **afterMap**<`TSource`, `TDestination`\>(`cb`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`MapCallback`](modules.md#mapcallback)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/after-map.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/after-map.ts#L4)

___

### autoMap

▸ **autoMap**<`TSource`, `TDestination`, `TKey`, `TValue`\>(`prop`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends { [key in `TKey`]: `TValue` } |
| `TDestination` | extends { [key in `TKey`]: `TValue` } |
| `TKey` | extends keyof `TSource` & keyof `TDestination` |
| `TValue` | extends `TSource`[`TKey`] & `TDestination`[`TKey`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `TKey` |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/auto-map.ts:6](https://github.com/nartc/mapper/blob/5906addd/packages/core/src/lib/mapping-configurations/auto-map.ts#L6)

___

### beforeMap

▸ **beforeMap**<`TSource`, `TDestination`\>(`cb`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`MapCallback`](modules.md#mapcallback)<`TSource`, `TDestination`, `Record`<`string`, `any`\>\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/before-map.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/before-map.ts#L4)

___

### condition

▸ **condition**<`TSource`, `TDestination`, `TSelectorReturn`\>(`predicate`, `defaultValue?`): [`ConditionReturn`](modules.md#conditionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`ConditionPredicate`](interfaces/ConditionPredicate.md)<`TSource`\> |
| `defaultValue?` | `TSelectorReturn` |

#### Returns

[`ConditionReturn`](modules.md#conditionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/condition.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/condition.ts#L10)

___

### constructUsing

▸ **constructUsing**<`TSource`, `TDestination`\>(`destinationConstructor`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destinationConstructor` | [`DestinationConstructor`](modules.md#destinationconstructor)<`TSource`, `TDestination`\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/construct-using.ts:9](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/construct-using.ts#L9)

___

### convertUsing

▸ **convertUsing**<`TSource`, `TDestination`, `TSelectorReturn`, `TConvertSourceReturn`\>(`converter`, `selector`): [`ConvertUsingReturn`](modules.md#convertusingreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |
| `TConvertSourceReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `converter` | [`Converter`](interfaces/Converter.md)<`TConvertSourceReturn`, `TSelectorReturn`\> |
| `selector` | [`Selector`](modules.md#selector)<`TSource`, `TConvertSourceReturn`\> |

#### Returns

[`ConvertUsingReturn`](modules.md#convertusingreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/convert-using.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/convert-using.ts#L10)

___

### createMap

▸ **createMap**<`TSource`\>(`mapper`, `source`, ...`mappingConfigFns`): [`Mapping`](modules.md#mapping)<`TSource`, `TSource`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](interfaces/Mapper.md) |
| `source` | [`ModelIdentifier`](modules.md#modelidentifier)<`TSource`\> |
| `...mappingConfigFns` | (`undefined` \| [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TSource`\>)[] |

#### Returns

[`Mapping`](modules.md#mapping)<`TSource`, `TSource`\>

#### Defined in

[lib/mappings/create-map.ts:18](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mappings/create-map.ts#L18)

▸ **createMap**<`TSource`, `TDestination`\>(`mapper`, `source`, `destination`, ...`mappingConfigFns`): [`Mapping`](modules.md#mapping)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](interfaces/Mapper.md) |
| `source` | [`ModelIdentifier`](modules.md#modelidentifier)<`TSource`\> |
| `destination` | [`ModelIdentifier`](modules.md#modelidentifier)<`TDestination`\> |
| `...mappingConfigFns` | (`undefined` \| [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>)[] |

#### Returns

[`Mapping`](modules.md#mapping)<`TSource`, `TDestination`\>

#### Defined in

[lib/mappings/create-map.ts:23](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mappings/create-map.ts#L23)

___

### createMapper

▸ **createMapper**(`options`): [`Mapper`](interfaces/Mapper.md)

Creates and returns a Mapper {} as a Proxy. The following methods are available to use with a Mapper:
 ```
 - Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
 - createMap()
 - addProfile()
 - getMapping()
 - getMappings()
 ```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CreateMapperOptions`](interfaces/CreateMapperOptions.md) |

#### Returns

[`Mapper`](interfaces/Mapper.md)

#### Defined in

[lib/core.ts:49](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/core.ts#L49)

___

### extend

▸ **extend**<`TSource`, `TDestination`, `TExtendSource`, `TExtendDestination`\>(`mapping`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TExtendSource` | extends [`Dictionary`](modules.md#dictionary)<`TExtendSource`\> |
| `TExtendDestination` | extends [`Dictionary`](modules.md#dictionary)<`TExtendDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`Mapping`](modules.md#mapping)<`TExtendSource`, `TExtendDestination`\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/extend.ts:12](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/extend.ts#L12)

▸ **extend**<`TSource`, `TDestination`, `TExtendSource`, `TExtendDestination`\>(`source`, `destination`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TExtendSource` | extends [`Dictionary`](modules.md#dictionary)<`TExtendSource`\> |
| `TExtendDestination` | extends [`Dictionary`](modules.md#dictionary)<`TExtendDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`ModelIdentifier`](modules.md#modelidentifier)<`TExtendSource`\> |
| `destination` | [`ModelIdentifier`](modules.md#modelidentifier)<`TExtendDestination`\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/extend.ts:20](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/extend.ts#L20)

___

### forMember

▸ **forMember**<`TSource`, `TDestination`, `TMemberType`\>(`selector`, ...`fns`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TMemberType` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | [`Selector`](modules.md#selector)<`TDestination`, `TMemberType`\> |
| `...fns` | [preCondOrMapMemberFn: PreConditionReturn<TSource, TDestination, TMemberType\> \| MemberMapReturn<TSource, TDestination, TMemberType\>, mapMemberFn?: MemberMapReturn<TSource, TDestination, TMemberType\>] |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/for-member.ts:16](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/for-member.ts#L16)

___

### forSelf

▸ **forSelf**<`TSource`, `TDestination`, `TSelfSource`\>(`sourceOrMapping`, `selector`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelfSource` | extends [`Dictionary`](modules.md#dictionary)<`TSelfSource`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceOrMapping` | [`ModelIdentifier`](modules.md#modelidentifier)<`TSelfSource`\> \| [`Mapping`](modules.md#mapping)<`TSelfSource`, `TDestination`\> |
| `selector` | [`Selector`](modules.md#selector)<`TSource`, `TSelfSource`\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/for-self.ts:23](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/for-self.ts#L23)

___

### fromValue

▸ **fromValue**<`TSource`, `TDestination`, `TSelectorReturn`\>(`rawValue`): [`FromValueReturn`](modules.md#fromvaluereturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawValue` | `TSelectorReturn` |

#### Returns

[`FromValueReturn`](modules.md#fromvaluereturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/from-value.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/from-value.ts#L4)

___

### getRecursiveValue

▸ **getRecursiveValue**(`recursiveMap`, `parent`, `member`): `number` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `recursiveMap` | `Map`<[`MetadataIdentifier`](modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](modules.md#arraykeyedmap)\> |
| `parent` | [`MetadataIdentifier`](modules.md#metadataidentifier)<`any`\> |
| `member` | `string`[] |

#### Returns

`number` \| `undefined`

#### Defined in

[lib/utils/recursion.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/recursion.ts#L10)

___

### ignore

▸ **ignore**<`TSource`, `TDestination`\>(): [`IgnoreReturn`](modules.md#ignorereturn)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Returns

[`IgnoreReturn`](modules.md#ignorereturn)<`TSource`, `TDestination`\>

#### Defined in

[lib/member-map-functions/ignore.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/ignore.ts#L4)

___

### isDateConstructor

▸ **isDateConstructor**(`value`): `boolean`

Check if value is a Date constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`boolean`

#### Defined in

[lib/utils/is-date-constructor.ts:6](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/is-date-constructor.ts#L6)

___

### isEmpty

▸ **isEmpty**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`boolean`

#### Defined in

[lib/utils/is-empty.ts:1](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/is-empty.ts#L1)

___

### isPrimitiveConstructor

▸ **isPrimitiveConstructor**(`value`): `boolean`

Check if value is a String/Number/Boolean/Array constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

`boolean`

#### Defined in

[lib/utils/is-primitive-constructor.ts:6](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/is-primitive-constructor.ts#L6)

___

### mapDefer

▸ **mapDefer**<`TSource`, `TDestination`, `TSelectorReturn`\>(`defer`): [`MapDeferReturn`](modules.md#mapdeferreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> = `any` |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defer` | [`DeferFunction`](interfaces/DeferFunction.md)<`TSource`, `TDestination`, `TSelectorReturn`\> |

#### Returns

[`MapDeferReturn`](modules.md#mapdeferreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/map-defer.ts:4](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/map-defer.ts#L4)

___

### mapFrom

▸ **mapFrom**<`TSource`, `TDestination`, `TSelectorReturn`\>(`from`): [`MapFromReturn`](modules.md#mapfromreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`ValueSelector`](modules.md#valueselector)<`TSource`, `TDestination`, `TSelectorReturn`\> \| [`Resolver`](interfaces/Resolver.md)<`TSource`, `TDestination`, `TSelectorReturn`\> |

#### Returns

[`MapFromReturn`](modules.md#mapfromreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/map-from.ts:11](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/map-from.ts#L11)

___

### mapWith

▸ **mapWith**<`TSource`, `TDestination`, `TSelectorReturn`, `TWithDestination`, `TWithSource`, `TWithSourceValue`\>(`withDestination`, `withSource`, `withSourceValue`): [`MapWithReturn`](modules.md#mapwithreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |
| `TWithDestination` | extends [`ModelIdentifier`](modules.md#modelidentifier)<`any`\> = [`ModelIdentifier`](modules.md#modelidentifier)<`any`\> |
| `TWithSource` | extends [`ModelIdentifier`](modules.md#modelidentifier)<`any`\> = [`ModelIdentifier`](modules.md#modelidentifier)<`any`\> |
| `TWithSourceValue` | extends [`ValueSelector`](modules.md#valueselector)<`any`, `any`, `unknown`\> = `TWithSource` extends `Constructor`<`InferredWithSource`\> ? [`ValueSelector`](modules.md#valueselector)<`TSource`, `InferredWithSource`, `unknown`\> : [`ValueSelector`](modules.md#valueselector)<`TSource`, `any`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `withDestination` | `TWithDestination` |
| `withSource` | `TWithSource` |
| `withSourceValue` | `TWithSourceValue` |

#### Returns

[`MapWithReturn`](modules.md#mapwithreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/map-with.ts:11](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/map-with.ts#L11)

___

### mapWithArguments

▸ **mapWithArguments**<`TSource`, `TDestination`, `TSelectorReturn`\>(`withArgumentsResolver`): [`MapWithArgumentsReturn`](modules.md#mapwithargumentsreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `withArgumentsResolver` | (`source`: `TSource`, `extraArguments`: `Record`<`string`, `unknown`\>) => `TSelectorReturn` \| [`Resolver`](interfaces/Resolver.md)<`TSource`, `Record`<`string`, `unknown`\>, `TSelectorReturn`\> |

#### Returns

[`MapWithArgumentsReturn`](modules.md#mapwithargumentsreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/map-with-arguments.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/map-with-arguments.ts#L10)

___

### namingConventions

▸ **namingConventions**<`TSource`, `TDestination`\>(`namingConventionsInput`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `namingConventionsInput` | [`NamingConventionInput`](modules.md#namingconventioninput) |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/naming-conventions.ts:10](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/naming-conventions.ts#L10)

___

### nullSubstitution

▸ **nullSubstitution**<`TSource`, `TDestination`, `TSelectorReturn`\>(`substitution`): [`NullSubstitutionReturn`](modules.md#nullsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `substitution` | `TSelectorReturn` |

#### Returns

[`NullSubstitutionReturn`](modules.md#nullsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/null-substitution.ts:9](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/null-substitution.ts#L9)

___

### preCondition

▸ **preCondition**<`TSource`, `TDestination`, `TSelectorReturn`\>(`predicate`, `defaultValue?`): [`PreConditionReturn`](modules.md#preconditionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`ConditionPredicate`](interfaces/ConditionPredicate.md)<`TSource`\> |
| `defaultValue?` | `TSelectorReturn` |

#### Returns

[`PreConditionReturn`](modules.md#preconditionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/pre-condition.ts:8](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/pre-condition.ts#L8)

___

### set

▸ **set**<`T`\>(`object`, `path`, `value`): `T` & { `[p: string]`: `unknown`;  } \| `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `path` | `string`[] |
| `value` | `unknown` |

#### Returns

`T` & { `[p: string]`: `unknown`;  } \| `T`

#### Defined in

[lib/utils/set.ts:1](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/set.ts#L1)

___

### setMutate

▸ **setMutate**<`T`\>(`object`, `path`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `path` | `string`[] |
| `value` | `unknown` |

#### Returns

`void`

#### Defined in

[lib/utils/set.ts:28](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/set.ts#L28)

___

### setRecursiveValue

▸ **setRecursiveValue**(`recursiveMap`, `parent`, `member`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `recursiveMap` | `Map`<[`MetadataIdentifier`](modules.md#metadataidentifier)<`any`\>, [`ArrayKeyedMap`](modules.md#arraykeyedmap)\> |
| `parent` | [`MetadataIdentifier`](modules.md#metadataidentifier)<`any`\> |
| `member` | `string`[] |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[lib/utils/recursion.ts:19](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/recursion.ts#L19)

___

### typeConverter

▸ **typeConverter**<`TSource`, `TDestination`, `TSourceConstructor`, `TDestinationConstructor`\>(`source`, `destination`, `converterOrValueSelector`): [`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSourceConstructor` | extends [`PrimitiveConstructorExtended`](modules.md#primitiveconstructorextended) \| [[`PrimitiveConstructorExtended`](modules.md#primitiveconstructorextended)] |
| `TDestinationConstructor` | extends [`PrimitiveConstructorExtended`](modules.md#primitiveconstructorextended) \| [[`PrimitiveConstructorExtended`](modules.md#primitiveconstructorextended)] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSourceConstructor` |
| `destination` | `TDestinationConstructor` |
| `converterOrValueSelector` | `ConverterOrValueSelector`<`TSourceConstructor`, `TDestinationConstructor`\> |

#### Returns

[`MappingConfiguration`](modules.md#mappingconfiguration)<`TSource`, `TDestination`\>

#### Defined in

[lib/mapping-configurations/type-converters.ts:41](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/mapping-configurations/type-converters.ts#L41)

___

### undefinedSubstitution

▸ **undefinedSubstitution**<`TSource`, `TDestination`, `TSelectorReturn`\>(`substitution`): [`UndefinedSubstitutionReturn`](modules.md#undefinedsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](modules.md#dictionary)<`TSource`\> |
| `TDestination` | extends [`Dictionary`](modules.md#dictionary)<`TDestination`\> |
| `TSelectorReturn` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `substitution` | `TSelectorReturn` |

#### Returns

[`UndefinedSubstitutionReturn`](modules.md#undefinedsubstitutionreturn)<`TSource`, `TDestination`, `TSelectorReturn`\>

#### Defined in

[lib/member-map-functions/undefined-substitution.ts:9](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/member-map-functions/undefined-substitution.ts#L9)
