---
id: empty-value
title: Handle Empty Value
sidebar_label: Empty Value
---

By default, `AutoMapper` uses `null` value to map to empty values, or for when `ignore()` is used.

```typescript
Mapper.createMap(Source, Destination).forMember(d => d.foo, ignore());

const fooVm = Mapper.map(foo, Destination, Source);
// fooVm.foo will be null
```

You might be wondering why `AutoMapper` does not `delete` the property when `source.<property>` is **empty** (`null` or `undefined`) or
when the property is `ingore()`. There are two main reasons:

- `delete` has issue with performance and also does not work quite well with **Prototype Chain**
- Deleting a property off of a model will "break" the model because now the mapped result is missing a property. `AutoMapper` does not
  want to make this decision for the consumers.

#### Problem with `null`

`null` does signify that a propert has been set with a value but that value is just **empty**. However, `null` is kept after serialization which
does bring up some problems with APIs that either expect a property with a value OR that property does not exist at all.

#### Solution

With that said, the solution that `AutoMapper` provides is to set an option called `useUndefined` when you `createMap()`

```typescript
Mapper.createMap(Source, Destination, { useUndefined: true });
```

With `useUndefined` set to `true`, `AutoMapper` will use `undefined` for empty values instead of `null`. `undefined` will allow
serialization tool to ignore the property. Again, `AutoMapper` uses `null` by default.

#### Global Settings

You can also set `useUndefined` on [Global Settings](../init/with-global-settings.md). Setting `useUndefined` on **Global Level** will
apply that setting to ALL Mappings.

> `useUndefined` on **Mapping Level** will override the setting on **Global Level**
