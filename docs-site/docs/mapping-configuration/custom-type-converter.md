---
id: custom-type-converter
title: Custom Type Converters
sidebar_label: Custom Type Converters
---

Sometimes, you need to set a common converter for one type to another when the property names are matching between a `Source` and a `Destination`. For example, suppose we have a `Source` type:

```ts
export class Source {
  @AutoMap()
  value1!: string;
  @AutoMap()
  value2!: string;
  @AutoMap()
  value3!: string;
}
```

and you would like to map it to the following `Destination` type:

```ts
export class Destination {
  @AutoMap()
  value1!: number;
  @AutoMap()
  value2!: Date;
  @AutoMap()
  value3!: boolean;
}
```

If we were to try and map `Source -> Destination` as-is, we would end up with mismatch values and types on the `Destination`. Eg: `Source.value1` will be mapped to `Destination.value1` even though the types of each `value1` are different. `Destination.value1` will end up with `string` value even though it is declared as `number`. This is because AutoMapper does not know anything and will not try to make any assumptions about these value types.

To solve this issue, you must supply **Custom Type Converters** to a specific `Mapper`:

```ts
const mapper = createMapper(/*...*/);

mapper
  .addTypeConverter(String, Number, (str) => parseInt(str))
  .addTypeConverter(String, Date, (str) => new Date(str))
  .addTypeConverter(String, Boolean, (str) => Boolean(str));

mapper.createMap(Source, Destination);
```

Here, we're telling AutoMapper:

- If you are mapping a `String` to a `Number`, use `parseInt()`
- If you are mapping a `String` to a `Date`, use `new Date()`
- If you are mapping a `String` to a `Boolean`, use `Boolean()`

```ts
const source = new Source();
source.value1 = '123';
source.value2 = '10/14/1991';
source.value3 = 'truthy';

const destination = mapper.map(source, Destination, Source);
/**
 * Destination {
    value1: 123, // number
    value2: Mon Oct 14 1991 00:00:00 GMT-0500 (Central Daylight Time), // a Date instance
    value3; true // boolean
 * }
 */
```

## Limitations

- Custom Type Converters are currently available **only** to `mapInitialize` aka same property names with different types. For the above example, AutoMapper does nothing when it encounters a `String` and a `Number` if `forMember` is used.
- Custom Type Converters only works with Primitive types at the moment aka `String`, `Number`, `Boolean`, and `Date`.
