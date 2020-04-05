---
id: with-global-settings
title: Global Settings
sidebar_label: WithGlobalSettings
---

You can configure some **global settings** for the `AutoMapper` instance. At the moment, only [NamingConvention](../features/naming-convention.md) is the only **global setting**.
To configure the **global settings**, call `withGlobalSettings()` on the `AutoMapper`. `withGlobalSettings()` expects a `AutoMapperGlobalSettings` as its argument.

```typescript
Mapper.withGlobalSettings({ sourceNamingConvention: PascalCaseNamingConvention, destinationNamingConvention: ... });
```

These **global settings** will be applied to ALL `Mappings` on the `AutoMapper` instance. By default, both `sourceNamingConvention` and `destinationNamingConvention` are `CamelCaseNamingConvention`.

```typescript
interface AutoMapperGlobalSettings {
  sourceNamingConvention?: Constructible<NamingConvention>;
  destinationNamingConvention?: Constructible<NamingConvention>;
}
```

> We will learn more about [NamingConvention](../features/naming-convention.md) in a later section.
