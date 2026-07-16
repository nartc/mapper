---
title: Self mapping
description: Register and execute a mapping whose source and destination share one model identifier.
---

Self mappings are useful when nested values keep the same runtime type but still need cloning or member configuration.

```ts
class Person {
  @AutoMap()
  name!: string;

  @AutoMap()
  nickname?: string;
}

createMap(
  mapper,
  Person,
  forMember(
    (destination) => destination.nickname,
    mapFrom((source) => source.nickname ?? source.name),
  ),
);
```

The short form above is equivalent to `createMap(mapper, Person, Person, ...)`.

Map one object or array with the same shorthand:

```ts
const clone = mapper.map(person, Person);
const clones = mapper.mapArray(people, Person);
```

If a parent mapping contains `Person` on both source and destination metadata, the registered self mapping can be used for that nested value.
