---
id: convert-using
title: ConvertUsing
sidebar_label: ConvertUsing
---

`convertUsing()` accepts a `Converter` interface which is an object with a `convert()` method.

```ts
export interface Converter<
  TConvertSource = unknown,
  TConvertDestination = unknown
> {
  convert(source: TConvertSource): TConvertDestination;
}
```

## Why?

`Converter` can be used to extract common logic where we want to map one data type to another. This logic might be used across different mappings across the application.

For example, we might have a `dateToStringConverter`:

```ts
import type { Converter } from '@automapper/core';

export const dateToStringConverter: Converter<Date, string> = {
  convert(source) {
    // maybe handle validation, additional parsing, or format here
    return source.toDateString();
  },
};
```

## Usage

Beside the `Converter`, `convertUsing()` accepts a second argument **Selector** to select a value from the **Source**. The return type of this **Selector** needs to match the data type of the `source` of the `Converter`.

```ts
import { convertUsing } from '@automapper/core';

mapper.createMap(User, UserDto).forMember(
  (destination) => destination.birthday,
  convertUsing(dateToStringConverter, (source) => source.birthday)
);
```

## Usage without **Selector**

We can have `Converter#convert` takes in the whole **Source** object as its argument. If we have these types of `Converter`, we do not need to pass in the **Selector** because the whole **Source** object will be passed to `Converter#convert`

```ts
export const fullNameConverter: Converter<User, string> = {
  convert(source) {
    return source.firstName + ' ' + source.lastName;
  },
};

import { convertUsing } from '@automapper/core';

mapper
  .createMap(User, UserDto)
  .forMember(
    (destination) => destination.fullName,
    convertUsing(fullNameConverter)
  );
```

`convertUsing()` will set the `TransformationType` to `TransformationType.ConvertUsing`
