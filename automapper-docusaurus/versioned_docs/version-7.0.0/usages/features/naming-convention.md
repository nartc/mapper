---
id: naming-convention
title: Naming Convention
sidebar_label: Naming Convention
---

`@nartc/automapper` provides a way to map between two models with different naming conventions. The following conventions are supported:

- `PascalCaseNamingConvention`
- `CamelCaseNamingConvention`
- `SnakeCaseNamingConvention`

By default, every models will have `CamelCaseNamingConvention`. You can modify the naming conventions for `Source` and `Destination`
on a `Mapping` by providing the third argument, which is an `CreateMapOptions`, for `createMap()` instance method

```typescript
class Address {
  @AutoMap()
  Street: string;
  @AutoMap()
  City: string;
  @AutoMap()
  State: string;
}

class Company {
  @AutoMap()
  Name: string;
  @AutoMap()
  Description: string;
  @AutoMap()
  YearEstablished: number;
  @AutoMap(() => Address)
  Address: Address;
}

class CompanyVm {
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  addressStreet: string;
}

Mapper.createMap(Company, CompanyVm, {
  sourceMemberNamingConvention: PascalCaseNamingConvention,
});
```

When `map()`, `Company.Name`, `Company.Description` and `Company.Address.Street` will be mapped automatically to `CompanyVm.name`, `CompanyVm.description` and `CompanyVm.addressStreet`. **Map by conventions** and **flattening** are still being applied.

You can set the naming conventions as **global settings**

```typescript
Mapping.withGlobalSettings({
  sourceNamingConvention: PascalCaseNamingConvention,
});
```

Now all `Source` models will have `PascalCaseNamingConvention` applied to their `properties`.

> **Mapping Level** naming conventions will override **Global Level** naming conventions.
