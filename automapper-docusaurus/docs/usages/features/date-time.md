---
id: date-time
title: Handle DateTime objects
sidebar_label: Date Time
---

Dealing with `DateTime` is always a hard thing to get right and there are so many different options to manipulate `Date` object in **JavaScript**.

### `Date` object

Internally, `@nartc/automapper` does not use any 3rd-party library to manipulate `Date` object. Therefore, you might want to turn to [ForMember](../mapping-configuration/for-member/basic.md)
to achieve the desired result when dealing with `DateTime`. There are **three** very powerful libraries that deal with vanilla `Date` object: [date-fns](https://date-fns.org/), [dayjs](https://github.com/iamkun/dayjs),
and [Luxon](https://moment.github.io/luxon/).

Check the following snippet

```typescript
class Foo {
  @AutoMap()
  someDate: Date;
}

class FooVm {
  @AutoMap()
  someDate: Date;
}
```

Everything will work properly here. Now check the following case

```typescript
class Foo {
  @AutoMap()
  someDate: Date;
}

class FooVm {
  @AutoMap()
  someDate: string;
}
```

When we `map()` `Foo` to `FooVm`, `FooVm.someDate` will be _made_ into type `Date` instead of `string`. Because there are different ways to turn a `Date` into a `string`,
`@nartc/automapper` cannot decide for the consumers which to use so `@nartc/automapper` just maps the `value` over. The best way to handle this is to use `mapFrom()` and
customize your mapping configuration between `Foo.someDate` and `FooVm.someDate`

```typescript
Mapper.createMap(Foo, FooVm)
    .forMember(dest => dest.someDate, mapFrom(src => src.someDate.toDateString());
```

> Learn more about `mapFrom()` at [ForMember](../mapping-configuration/for-member/basic.md)

You can also leverage a [Converter](../mapping-configuration/for-member/convert-using.md) or a [Resolver](../mapping-configuration/for-member/resolver.md) for reusability. Again, if you have to handle more complex cases
regarding `DateTime`, I highly recommend the libraries I mentioned above.

### `Moment` object

Same complexity and limitation apply to `Moment` object with one extra caveat

```typescript {4}
import moment from 'moment';

class Foo {
  @AutoMap(() => moment)
  someMoment: moment.Moment;
}

class FooVm {
  @AutoMap()
  someMoment: string;
}
```

A `Moment` property needs to be decorated with `@AutoMap(() => moment)`. Internally, `@nartc/automapper` will based on the `typeFunction` to determine if this `property`
is a `Moment` object or not because `@nartc/automapper` does not (and does not want to) have `moment` as its `dependencies` so the consumers need to provide this extra information.

Again, for complex cases, please use `mapFrom()` to customize the mapping configuration

```typescript
Mapper.createMap(Foo, FooVm)
    .forMember(dest => dest.someMoment, mapFrom(src => src.someMoment.toISOString());
```
