---
title: convertUsing
description: Convert one selected source value with a reusable converter.
---

A converter packages synchronous conversion logic:

```ts
const dateToString: Converter<Date, string> = {
  convert(source) {
    return source.toISOString();
  },
};

forMember(
  (destination) => destination.birthday,
  convertUsing(dateToString, (source) => source.birthday),
);
```

Use a [type converter](/mapping-configuration/type-converters) when the same metadata conversion should apply to every matching property pair in a mapping. Use `convertUsing()` when one destination member needs it.
