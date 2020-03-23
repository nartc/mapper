---
id: converter
title: Value Converter
sidebar_label: Value Converter
---

In some cases, you might have some logic to map from one `type` to another that you might reuse across the application. For example,
you want to map from `string` to `Date` with some common logic that makes sense and might get used a lot in your application, you can
turn to a `ValueConverter` to achieve this.

`ValueConverter` is a class that implements `Converter` interface. `Converter` requires a `convert()` function
and also takes in two `type arguments`: `TConvertSource` and `TConvertDestination` which annotates the type of the source value and the destination value of the converter.

```typescript
interface Converter<TConvertSource, TConvertDestination> {
  convert(source: TConvertSource): TConvertDestination;
}
```

A simple `StringDateConverter`

```typescript
class StringDateConverter implements Converter<string, Date> {
  convert(source: string): Date {
    // handle validation here if you like
    return new Date(source);
  }
}
```

Once you have the `ValueConverter` ready, call `convertUsing()` to use the `ValueConverter`. You'll get type-inference from the `Converter`.

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.birthday,
  convertUsing(new StringDateConverter(), src => src.someDateString) // <-- the selector needs to return a value of type "string" because of the StringDateConverter type
);
```

> Can you just use [MapFrom](map-from.md) instead? Absolutely yes, but a `Converter` might help you to separate the concern more if you choose to.

`convertUsing()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `ConvertUsing`.
