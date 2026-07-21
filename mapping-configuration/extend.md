---
title: extend
description: Reuse destination-member configuration from an existing mapping.
---

Create the base mapping first, then extend it by mapping value or model identifiers:

```ts
const baseMapping = createMap(mapper, BaseEntity, BaseDto);

createMap(
  mapper,
  User,
  UserDto,
  extend(baseMapping),
  forMember(
    (destination) => destination.name,
    mapFrom((source) => source.displayName),
  ),
);

// Equivalent lookup form:
createMap(mapper, Admin, AdminDto, extend(BaseEntity, BaseDto));
```

Explicit member configuration on the new mapping is not overwritten by inherited configuration. Use `extend()` for structurally related models, not as a substitute for unrelated shared business logic.
