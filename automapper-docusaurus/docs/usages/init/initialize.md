---
id: initialize
title: Initialize
sidebar_label: Initialize (deprecated)
---
`deprecated`

`AutoMapper` exposes an instance method `initialize()` to configure your `AutoMapper` instance the same way as `createMap()` combined with `addProfile()`.
`initialize()` expects a `callback (config: Configuration) => void` as its only argument. `Configuration` has the same `addProfile()` and `createMap()` as the `AutoMapper` instance.

```typescript
Mapper.initialize(config => {
  config.addProfile(SourceProfile);
  config.createMap(OtherSource, OtherDestination);
});
```

### `withGlobalSettings`

With `initialize()`, you can also configure some **global settings** for the `AutoMapper` instance. At the moment, only [NamingConvention](../features/naming-convention.md) is the only **global setting**.
To configure the **global settings**, call `withGlobalSettings()` on the `Configuration`. `withGlobalSettings()` expects a `AutoMapperGlobalSettings` as its argument.

```typescript
Mapper.initialize(config => {
  config.withGlobalSettings({ sourceNamingConvention: ..., destinationNamingConvention: ... });
});
```

These **global settings** will be applied to ALL `Mappings` on the `AutoMapper` instance. By default, both `sourceNamingConvention` and `destinationNamingConvention` are `CamelCaseNamingConvention`.

```typescript
interface AutoMapperGlobalSettings {
  sourceNamingConvention?: Constructible<NamingConvention>;
  destinationNamingConvention?: Constructible<NamingConvention>;
}
```

> We will learn more about [NamingConvention](../features/naming-convention.md) in a later section.
