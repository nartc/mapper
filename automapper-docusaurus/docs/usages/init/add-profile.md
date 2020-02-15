---
id: add-profile
title: Profile
sidebar_label: Profile
---

`Profile` is generally a good way (and recommended) to organize your `Mapping`. This helps you to separate your concern by providing you a way to group related `Mappings` for a certain **Domain Model**.

A `Profile` needs to inherit from `MappingProfileBase` and the configuration will be put in the `constructor`

```typescript
import { AutoMapper, MappingProfileBase } from '@nartc/automapper';

export class SourceProfile extends MappingProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Source, DestinationOne);
    mapper.createMap(Source, DestinationTwo);
  }
}
```

After you configure a `Profile`, call the instance method `addProfile()` on the `AutoMapper` instance and pass in the `Profile`.

```typescript
Mapper.addProfile(SourceProfile);
```

`addProfile()`, upon called, will first instantiate an instance of `Profile` and pass in the `AutoMapper` instance from which `addProfile()` is invoked.
Hence, `SourceProfile.constructor` will be called with `Mapper` as its argument. `super()`, which is `MappingProfileBase.constructor`, is also get called and the `profileName` will be set to `SourceProfile`.

> Each `Profile` added to the `Mapper` is **unique** and is tracked by `profileName`. `@nartc/automapper` will throw an `Error` if you're trying to add the same `profileName` twice.

`addProfile()` returns the same `AutoMapper` instance that calls it so it can be **chained** when you want to add multiple `Profile`.

```typescript
Mapper.addProfile(SourceProfile)
  .addProfile(OtherSourceProfile)
  .addProfile(SomeOtherSourceProfile);
```

> `addProfile()` returns the `AutoMapper` instance but `createMap()` returns a `CreateMapFluentFunction` to configure the `Mapping` further. Hence, you can only **chain** `addProfile()` and not `createMap()`
