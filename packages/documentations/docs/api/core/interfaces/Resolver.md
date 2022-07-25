---
id: "Resolver"
title: "Interface: Resolver<TSource, TDestination, TResolvedType>"
sidebar_label: "Resolver"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSource` | extends [`Dictionary`](../modules.md#dictionary)<`TSource`\> = `any` |
| `TDestination` | extends [`Dictionary`](../modules.md#dictionary)<`TDestination`\> = `any` |
| `TResolvedType` | [`SelectorReturn`](../modules.md#selectorreturn)<`TDestination`\> |

## Methods

### resolve

▸ **resolve**(`source`, `destination?`): `TResolvedType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `TSource` |
| `destination?` | `TDestination` |

#### Returns

`TResolvedType`

#### Defined in

[lib/types.ts:86](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/types.ts#L86)
