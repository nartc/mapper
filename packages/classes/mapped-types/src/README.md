# @automapper/classes/mapped-types

`@automapper/classes/mapped-types` is part of the public API of `@automapper/classes`.

`@automapper/classes/mapped-types` is inspired by `@nestjs/mapped-types` to provide mixins to reduce some boilerplate code.

## Usage

All `Mapper*Type` are exported from `@automapper/classes/mapped-types`

### `MapperPickType`

`MapperPickType` accepts an original class, and an array of property keys to **pick** from the original class.

```ts
class Foo {
    @AutoMap()
    foo!: string;
    @AutoMap()
    bar!: number;
    @AutoMap()
    baz!: boolean;
}

class PickFooBar extends MapperPickType(Foo, ['foo', 'bar']) {}

createMap(mapper, Foo, PickFooBar);

const foo = new Foo();
foo.foo = 'foo';
foo.bar = 123;
foo.baz = true;

const pickedFooBar = mapper.map(foo, Foo, PickFooBar);
console.log(pickedFooBar);
/**
 * PickFooBar { foo: 'foo', bar: 123 }
 * only foo and bar have been picked
 */
```

### `MapperOmitType`

`MapperOmitType` accepts an original class, and an array of property keys to **omit** from the original class.

```ts
class Foo {
    @AutoMap()
    foo!: string;
    @AutoMap()
    bar!: number;
    @AutoMap()
    baz!: boolean;
}

class OmitFooBar extends MapperOmitType(Foo, ['foo', 'bar']) {}

createMap(mapper, Foo, OmitFooBar);

const foo = new Foo();
foo.foo = 'foo';
foo.bar = 123;
foo.baz = true;

const omittedFooBar = mapper.map(foo, Foo, OmitFooBar);
console.log(omittedFooBar);
/**
 * OmitFooBar { baz: true }
 * foo and bar have been omitted
 */
```

### `MapperIntersectionType`

`MapperIntersectionType` accepts two parent classes to receive all properties from both classes.

```ts
class Foo {
    @AutoMap()
    foo!: string;
}

class Bar {
    @AutoMap()
    bar!: number;
}

class IntersectFooBar extends MapperIntersectionType(Foo, Bar) {}

createMap(mapper, IntersectFooBar, Foo);
createMap(mapper, IntersectFooBar, Bar);

const intersect = new IntersectFooBar();
intersect.foo = 'foo';
intersect.bar = 123;

const foo = mapper.map(intersect, IntersectFooBar, Foo);
console.log(foo);
/**
 * Foo { foo: 'foo' }
 */

const bar = mapper.map(intersect, IntersectFooBar, Bar);
console.log(bar);
/**
 * Bar { bar: 123 }
 */
```

> AutoMapper does not have the concept of mapping multiple `Sources` to a `Destination`. Hence, please be cautious when to utilize `MapperIntersectionType`
