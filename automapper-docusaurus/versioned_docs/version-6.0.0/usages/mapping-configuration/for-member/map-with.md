---
id: map-with
title: MapWith
sidebar_label: MapWith
---

By default, `@nartc/automapper` will map [Nested Model](../../features/nested-model.md) by **convention** meaning `user.profile` will be mapped to `userVm.profile`, given that `profile` is a nested model `Profile/ProfileVm`.
Sometimes, you might have different property name for related nested models. `mapWith()` can be used to handle this case

```typescript
Mapper.createMap(User, UserVm).forMember(
  dest => dest.someProfile,
  mapWith(ProfileVm, src => src.originalProfile)
);
```

When you run `Mapper.map(user, UserVm)`, `user.originalProfile` will be mapped to `userVm.someProfile` with `ProfileVm` as the `Destination`.
`mapWith()` takes in two arguments: (1) is the `destination model` and (2) is the value on the `source` whose value `@nartc/automapper` will use to map `dest.<some_member>` with (1) as the `destination model`.
Please ensure you have already established the `Mapping` for whatever models you are trying to map. In this case, you need to have had established a `Mapping` for `Profile` (or whatever model that is associated with `src.originalProfile`) and `ProfileVm` in order for `mapWith()` to work.

`mapWith()` will set the [TransformationType](../../../guides/basic-concept.md#mappingtransformation) to `MapWith`.
