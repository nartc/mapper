---
id: javascript-support
title: JavaScript Support
sidebar_label: JavaScript Support
---

`@nartc/automapper` v6 brings basic `JavaScript` support by exposing a method called `createMapMetadata()`. `@nartc/automapper` works based on `metadata` of the properties on a given class.
In `TypeScript`, the `metadata` is provided by `@AutoMap()` decorator and/or the [Transformer Plugin](../../plugin.md).

In `JavaScript`, it might be hard (or simple depends on your environment) to support `decorators`. Hence, `createMapMetadata()` is exposed for you to provide the `metadata` for `@nartc/automapper`.
Take a look at the following class in `TypeScript`

```typescript
export class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  age!: number;
  @AutoMap()
  birthday!: Date;
  @AutoMap()
  isAdult!: boolean;
  @AutoMap()
  addresses!: string[];
  @AutoMap(() => Profile)
  profile!: Profile;
}
```

Well, in `JavaScript`, this is probably what you have

```javascript
export class User {}
```

...or you might not have a class at all. However, **Object-Oriented Programming** is something `JavaScript` supports out of the box and if you deem `@nartc/automapper` can be useful to you,
you might want to start creating some empty classes. These empty classes can always have **instance methods** because `@nartc/automapper` will return the true **instance** instead of a **plain** Object.
When you have your class ready, call `createMapMetadata()` as follow

```javascript
export class User {}

createMapMetadata(User, {
  firstName: String,
  lastName: String,
  isAdult: Boolean,
  birthday: Date,
  age: Number,
  addresses: [],
  profile: Profile,
});
```

And voila, now you can use `@nartc/automapper` because the `metadata` of `User` has been stored.

### API

The API is fairly simple. `createMapMetadata(Class, options)` where `Class` is a `Constructible` which is the `Class` itself, not an **instance** and
`options` is an object with `keys` as `properties` on this class and `values` as `metadata` of the properties.

Pay attention that the `values` are provided as `constructors` like `String`, `Boolean`, `Number` instead of `string`, `boolean`, `number`.
For nested models, just provide the `Constructible<Class>` (eg: `Profile`).

### Array

Array is a little bit tricky. If you have an array of `primitives` like `Array<string>`, `Array<boolean>`, or `Array<number>` then all you need to provide is `[]` as the `metadata`.
If you have an `Array<NestedModel>`, provide the `NestedModel` instead of `[NestedModel]`. `@nartc/automapper` only needs to store the actual model. The `sourceObject`, when `map()`, will
determine whether `@nartc/automapper` should map to an array instead.

### Other note

You can always use `createMapMetadata()` with `TypeScript` and if you do, you will have intellisense for which `properties` are available based on the `Class` you provide.
