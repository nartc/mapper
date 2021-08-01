---
id: classes-limitations
title: Limitations
sidebar_label: Limitations
---

## Circular Dependencies

### Problem

**Circular Dependency** occurs when you have two models that depend on each other. For example, `SourceA` depends on `SourceB` and `SourceB` also depends on `SourceA`.
When designing your data models, both Domain and DTO (or View Model), you will probably run into circular dependency.

```ts
class SourceA {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceB })
  sourceB: SourceB;
}

class SourceB {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceA })
  sourceA: SourceA;
}
```

### TypeOrm Example

This is very common when you set up your Entities using `TypeOrm`. Suppose you have two Entities: Order and Person

```ts
@Entity()
export class Order {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @ManyToOne(() => Person, (person) => person.orders)
  @AutoMap({ typeFn: () => Person })
  person: Person;
}

@Entity()
export class Person {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @OneToMany(() => Order, (order) => order.person)
  @AutoMap({ typeFn: () => Order })
  orders: Order[];
}
```

Here, you have introduced a **Circular Dependency** with Order and Person.

### Solution

In general, you should avoid introducing **Circular Dependency** as much as possible. However, there are cases that you must have **Circular Dependency**. For those cases, `@automapper/classes` has a concept of **depth** of nesting models.

```ts
class SourceA {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceB })
  sourceB: SourceB;
}

class SourceB {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceA })
  sourceA: SourceA;
}
```

Let's assume the above models, this is how **depth** works:

- Depth of 0

```ts
SourceA {
    sourceB: SourceB {
        sourceA: null
    }
}
```

- Depth of 1

```
SourceA {
    sourceB: SourceB {
        sourceA: SourceA {
            sourceB: null;
        }
    }
}
```

- Depth of 2

```
SourceA {
    sourceB: SourceB {
        sourceA: SourceA {
            sourceB: {
                sourceA: SourceA {
                    sourceB: null;
                }
            }
        }
    }
}
```

By default, `@automapper/classes` will apply **depth of 0** to nested models. To specify **depth**, use `@AutoMap()` decorator second argument:

```ts
class SourceA {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceB, depth: 1 })
  sourceB: SourceB;
}

class SourceB {
  @AutoMap()
  id: number;
  @AutoMap({ typeFn: () => SourceA, depth: 1 })
  sourceA: SourceA;
}
```

Please be advised that the bigger the **depth** is, the bigger your model is, so you need to be very cautious when you start introducing **Circular Dependency**.

Another possible solution is to **NOT** decorate the circular-dependent member with `@AutoMap()` and configure the mapping for this member manually with `mapWith()`

```ts
@Entity()
export class Order {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @ManyToOne(() => Person, (person) => person.orders)
  person: Person;
}

@Entity()
export class Person {
  @AutoMap()
  id: number;
  // ... shorten for brevity purpose
  @OneToMany(() => Order, (order) => order.person)
  orders: Order[];
}

mapper.createMap(SomeOrderDto, Order).forMember(
  (d) => d.person,
  mapWith(
    () => Person,
    (s) => s.person,
    () => SomePersonDto
  )
);
mapper.createMap(SomePersonDto, Person).forMember(
  (d) => d.orders,
  mapWith(
    () => Order,
    (s) => s.orders,
    () => SomeOrderDto
  )
);
```

## Strict Mode

If you have `strict` mode turned on, and you have **Union Type** on your properties like: `string | null`, `number | null`, or `boolean | null`; you need to pass the `typeFn` to `@AutoMap()` like the following:

```ts
export class User {
  @AutoMap({ typeFn: () => String })
  name!: string | null;
  @AutoMap({ typeFn: () => Number })
  age!: number | null;
  @AutoMap({ typeFn: () => Boolean })
  isAdmin!: boolean | null;
}
```

This is due to **Weak Reflection** when `strict` mode is enabled.

## Nested Array property

If your model contain array property and does not specify any `forMember()` rule for them, then you *MUST* provide `typeFn` for it.

```ts
class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  profile!: UserProfile;
  @AutoMap({ typeFn: () => Job }) // <- it's required for nested array property
  jobs!: Job[];
}

mapper.createMap(User, UserVm);
```

AutoMapper will attempt to get the data type of the property through reflection. In most cases, it will work without any problem, but for array property, it will only result an  `Array` type instead of `Job[]` above. It's currently an [open issue](https://github.com/microsoft/TypeScript/issues/7169) of TypeScript.

Or you can also use `mapWith()` to let AutoMapper know its type.

```ts
class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  profile!: UserProfile;
  @AutoMap() // <- omit typeFn
  jobs!: Job[];
}

mapper
  .createMap(User, UserVm)
  .forMember(
    (d) => d.jobs,
    mapWith(
      () => JobVm,
      (s) => s.profile,
      () => Job
    )
  );
```
