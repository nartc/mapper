---
title: mapDefer
description: Choose a member-mapping function at runtime from the current source object.
---

`mapDefer()` returns another member function after inspecting the source:

```ts
forMember(
  (destination) => destination.profile,
  mapDefer((source) => {
    if (source.profile.type === 'business') {
      return mapWith(ProfileDto, BusinessProfile, (value) => value.profile);
    }

    return mapWith(ProfileDto, Profile, (value) => value.profile);
  }),
);
```

Register every nested mapping that the deferred branch can select. Prefer `condition()` or a direct `mapFrom()` when only the value changes and the mapping strategy does not.
