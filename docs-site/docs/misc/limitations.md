---
id: limitations
title: Limitations
sidebar_label: Limitations
---

## Date Time

When dealing with Date Time, we should utilize Custom Configuration instead of relying on Auto Configuration. Date Time is hard to get right.

## Odd-property name

`@automapper/core` uses the **Selector** approach throughout the library which then needs to be parsed to get the property path. For example:

```ts
const selector = destination => destination.foo.bar;
```

This `selector` will be parsed at some point to extract `foo.bar` as property path. One limitation is that if your object contains property name like: `kebab-case-property` or `dotted.property`, the parser won't be able to parse the property path.

PR is most definitely welcomed to fix this limitation.

## Circular Dependencies

See [`@automapper/classes` Limitations](../plugins-system/classes-limitations)
