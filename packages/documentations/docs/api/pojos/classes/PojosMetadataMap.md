# Class: PojosMetadataMap

Defined in: [metadata-map.ts:12](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/pojos/src/lib/metadata-map.ts#L12)

## Constructors

### Constructor

> **new PojosMetadataMap**(): `PojosMetadataMap`

#### Returns

`PojosMetadataMap`

## Methods

### create()

> `static` **create**\<`TModel`\>(`identifier`, `metadata?`): `void`

Defined in: [metadata-map.ts:28](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/pojos/src/lib/metadata-map.ts#L28)

#### Type Parameters

##### TModel

`TModel` *extends* `Dictionary`\<`TModel`\>

#### Parameters

##### identifier

`string` \| `symbol`

##### metadata?

\{ \[key in string \| number \| symbol\]?: PojoMetadata \| \[PojoMetadata\] \| \{ depth: number; type: PojoMetadata \| \[PojoMetadata\] \} \} = `{}`

#### Returns

`void`

***

### reset()

> `static` **reset**(): `void`

Defined in: [metadata-map.ts:24](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/pojos/src/lib/metadata-map.ts#L24)

#### Returns

`void`

***

### retrieve()

> `static` **retrieve**(`identifier`): \[`string`, \{ `depth`: `number`; `isArray`: `boolean`; `isGetterOnly?`: `boolean`; `type`: () => [`PojoMetadata`](../type-aliases/PojoMetadata.md); \}\][]

Defined in: [metadata-map.ts:58](https://github.com/nartc/mapper/blob/b36ab9f978a051efd50c6c1edce5c764c9410d35/packages/pojos/src/lib/metadata-map.ts#L58)

#### Parameters

##### identifier

`symbol`

#### Returns

\[`string`, \{ `depth`: `number`; `isArray`: `boolean`; `isGetterOnly?`: `boolean`; `type`: () => [`PojoMetadata`](../type-aliases/PojoMetadata.md); \}\][]
