---
title: autoMap
description: Explicitly map same-name class properties when decorator metadata is unavailable or undesirable.
---

`autoMap()` adds a same-name property to a classes mapping without requiring `@AutoMap()` on the source and destination.

```ts
class User {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthday: Date,
  ) {}
}

class UserDto {
  firstName!: string;
  lastName!: string;
  birthday!: string;
  fullName!: string;
}

createMap(
  mapper,
  User,
  UserDto,
  autoMap('firstName'),
  autoMap('lastName'),
  forMember(
    (destination) => destination.birthday,
    mapFrom((source) => source.birthday.toDateString()),
  ),
  forMember(
    (destination) => destination.fullName,
    mapFrom((source) => `${source.firstName} ${source.lastName}`),
  ),
);
```

Use strategy metadata for model-wide discovery. `autoMap()` is best for a small number of decoratorless members.
