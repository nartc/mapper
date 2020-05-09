---
id: circular-dependency
title: Circular Dependencies
sidebar_label: Circular Dependencies
---

### Problem

**Circular Dependency** occurs when you have two models that depend on each other. For example, `SourceA` depends on `SourceB` and `SourceB` also depends on `SourceA`.
When designing your data models, both Domain and DTO (or View Model), you will probably run into circular dependency.

```typescript
class SourceA {
  @AutoMap()
  id: number;
  @AutoMap(() => SourceB)
  sourceB: SourceB;
}

class SourceB {
  @AutoMap()
  id: number;
  @AutoMap(() => SourceA)
  sourceA: SourceA;
}
```

This is very common when you setup your Entities using `TypeOrm`. `@nartc/automapper` will not prevent nor warn you about **Circular Dependency** just because
it cannot detect when one occurs. And when it occurs, you will run into this error: `maximum call stack size exceeded`. This error signifies an infinity loop which
is `@nartc/automapper` is trying to instantiate `SourceA -> SourceB -> SourceA -> SourceB -> SourceA ...` without depth limit.

### TypeOrm Example

Suppose you have two Entities: Order and Person

```typescript
@Entity()
export class Order {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @ManyToOne(() => Person, person => person.orders)
  @AutoMap(() => Person)
  person: Person;
}

export class Person {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @OneToMany(() => Order, order => order.person)
  @AutoMap(() => Order)
  orders: Order[];
}
```

Here, you have introduced a **Circular Dependency** with Order and Person.

### Solution

One possible solution is to **NOT** decorate **circular-dependent** properties with `@AutoMap` but to manually configure the mapping for that property using `forMember()` and `mapWith()`.

```typescript
class SourceA {
  @AutoMap()
  id: number;
  sourceB: SourceB;
}

class SourceB {
  @AutoMap()
  id: number;
  sourceA: SourceA;
}

Mapper.createMap(SomeSourceADto, SourceA).forMember(
  d => d.sourceB,
  mapWith(SourceB, s => s.sourceB)
);

Mapper.createMap(SomeSourceBDto, SourceB).forMember(
  d => d.sourceA,
  mapWith(SourceA, s => s.sourceB)
);
```
