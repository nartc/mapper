---
id: "AutoMapperLogger"
title: "Class: AutoMapperLogger"
sidebar_label: "AutoMapperLogger"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new AutoMapperLogger**()

## Properties

### AUTOMAPPER\_PREFIX

▪ `Static` `Private` `Readonly` **AUTOMAPPER\_PREFIX**: ``"[AutoMapper]: "``

#### Defined in

[lib/utils/logger.ts:2](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L2)

___

### configured

▪ `Static` `Private` **configured**: `boolean` = `false`

#### Defined in

[lib/utils/logger.ts:3](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L3)

## Methods

### configure

▸ `Static` **configure**(`customLogger?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `customLogger` | `Partial`<`Pick`<typeof [`AutoMapperLogger`](AutoMapperLogger.md), ``"log"`` \| ``"info"`` \| ``"error"`` \| ``"warn"``\>\> |

#### Returns

`void`

#### Defined in

[lib/utils/logger.ts:5](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L5)

___

### error

▸ `Static` **error**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `string` |

#### Returns

`void`

#### Defined in

[lib/utils/logger.ts:27](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L27)

___

### info

▸ `Static` **info**(`info`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `string` |

#### Returns

`void`

#### Defined in

[lib/utils/logger.ts:31](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L31)

___

### log

▸ `Static` **log**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[lib/utils/logger.ts:19](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L19)

___

### warn

▸ `Static` **warn**(`warning`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `warning` | `string` |

#### Returns

`void`

#### Defined in

[lib/utils/logger.ts:23](https://github.com/nartc/mapper/blob/efc4cb9d/packages/core/src/lib/utils/logger.ts#L23)
