---
id: with-global-settings
title: Global Settings
sidebar_label: WithGlobalSettings
---

You can configure some **global settings** for the `AutoMapper` instance.
To configure the **global settings**, call `withGlobalSettings()` on the `AutoMapper`. `withGlobalSettings()` expects a `AutoMapperGlobalSettings` as its argument.

The following settings can be set at the global level:

- `sourceNamingConvention`: [NamingConvention](../features/naming-convention.md) to be used on ALL Source models
- `destinationNamingConvention`: [NamingConvention](../features/naming-convention.md) to be used on ALL Destination models
- `useUndefined`: A flag to let `AutoMapper` knows to use `undefined` instead of `null` for empty values. Default to: `false` which `AutoMapper` will use `null` for empty values
- `skipUnmappedAssertion`: A flag to let `AutoMapper` knows whether it should assert unmapped properties in `Mappings` on `map()` operations. Default to: `false` which `AutoMapper` will assert and throw an error if there are unmapped properties on the `Destination` model.

> `skipUnmappedAssertion` will have **no** effect on [MapWith](../features/mapping-configuration/for-member/map-with.md). All `mapWith()` operations will always **skip** assertions.

```typescript
Mapper.withGlobalSettings({
  sourceNamingConvention: PascalCaseNamingConvention,
  destinationNamingConvention: CamelCaseNamingConvention,
  useUndefined: true,
  skipUnamppedAssertion: true,
});
```

These **global settings** will be applied to ALL `Mappings` on the `AutoMapper` instance. By default, both `sourceNamingConvention` and `destinationNamingConvention` are `CamelCaseNamingConvention`.

```typescript
interface AutoMapperGlobalSettings {
  useUndefined?: boolean;
  sourceNamingConvention?: Constructible<NamingConvention>;
  destinationNamingConvention?: Constructible<NamingConvention>;
}
```

> We will learn more about [NamingConvention](../features/naming-convention.md) in a later section.
