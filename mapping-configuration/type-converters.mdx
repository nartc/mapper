---
title: typeConverter
description: Convert every matching source and destination metadata type within one mapping.
sidebar:
  label: typeConverter
---

JavaScript permits a value to be assigned even when TypeScript metadata differs. A type converter makes the conversion explicit for every matching property pair in one mapping.

```ts
createMap(
  mapper,
  Source,
  Destination,
  typeConverter(String, Number, (value) => Number.parseInt(value, 10)),
  typeConverter(String, Date, (value) => new Date(value)),
  typeConverter(String, Boolean, (value) => value === 'true'),
);
```

```ts
const destination = mapper.map(source, Source, Destination);
```

Converters support four metadata shapes:

- `Type` to `Type`;
- `Type` to `[Type]`;
- `[Type]` to `Type`;
- `[Type]` to `[Type]`.

```ts
typeConverter([String], [Number], (values) =>
  values.map((value) => Number.parseInt(value, 10)),
);
```

:::warning
A type-converted member is treated as the converter's result and does not continue through automatic nested mapping. Use a nested mapping or `mapWith()` when object structure should be mapped recursively.
:::

Use [`convertUsing()`](/mapping-configuration/for-member/convert-using) when the conversion should apply to one destination member instead of every matching metadata pair.
