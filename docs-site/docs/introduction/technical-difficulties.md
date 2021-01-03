---
id: technical
title: Technical Difficulties
sidebar_label: Technical difficulties
---

## Problems with TypeScript

[Reflection](https://en.wikipedia.org/wiki/Reflection_(computer_programming)) plays a huge part in the *auto* portion of an AutoMapper implementation. And it is especially *not that great* in TypeScript. Let's take a look at the following snippet:

```typescript
class User {
    firstName: string;
    lastName: string;
}
```

the above `.ts` code will be compiled to the following in `.js` (depending on the **JS** flavor you picked for your `target`)

```javascript
class User {}

// or in older ES
function User() {}
```

Now, when you try to `instantiate` (or `new up`) a `User` by writing the following code:

```typescript
const user = new User();
console.log(user);
```

You would expect to get `User { firstName: undefined, lastName: undefined }` printed out to the console, wouldn't you? At least, it was my expectation. In reality, you would get `User {}` without any information regarding `firstName` or `lastName`. Next, let's take a look at some similar snippets in **C#**:

```csharp
// SomeFileName.cs

// Same Domain model as in TypeScript
class User {
    public string FirstName {get; set;}
    public string LastName {get; set;}
    // ... some additional properties ...
}

// Some ViewModel class
class UserVm {
    public string FirstName {get; set;}
    public string LastName {get; set;}
    // ... some additional properties ...
}

...
// Create the Mapping between User and UserVm
CreateMap<User, UserVm>();
...

...
// Actual map from User to UserVm
var userVm = Mapper.Map<UserVm>(user);
...
```

In C#, AutoMapper will be able to *conventionally map* `User.FirstName` to `UserVm.FirstName` because of conventions. The two classes share the same property names. In TypeScript, you cannot do that **without** having to do a bit extra work. The `User` (or `UserVm`) instance in TypeScript does not contain any properties because we *never actually declared* them in the class. If you are interested in learning more about this whole process, read my [blog post](https://nartc.netlify.com/blogs/automapper-typescript/).

## Asynchronous

### "Fake" Async

You will probably run into some **async** variations like `mapAsync()` and `mapArrayAsync()`. Those are _fake async_. `mapAsync()` and `mapArrayAsync()` are wrapped inside a `resolved Promise` so that if you ever need an async version (maybe some of your APIs need to expect `Promise`, or you use `afterMap()` with `async`), you'll have those at your disposal.

Let's look at the following snippet:

```typescript
mapAsync(...args: any[]) { // simplified for brevity
    return Promise.resolve().then(() => map(...args));
}

mapArrayAsync(...args: any[]) {
    return Promise.resolve().then(() => mapArray(...args));
}
```

Those are the exact implementations of `mapAsync` and `mapArrayAsync`

### Why not "real"?

Real async support can be provided by utilizing Worker (aka. Worker Thread for NodeJS and Web Worker on the Browser). However, most of the mapping configurations in `@automapper/core` are lazily-evaluated functions that are used to be invoked later. These functions are termed `MemberMapFunction` in the context of `@automapper/core`. The consumers would define these functions at configuration time then they will be invoked later at mapping time. Thus, a mapping operation **cannot** have its arguments _serialized_ to be sent to the Worker thread.

### Help needed

As things stand right now, I will not be able to get Worker to work with AutoMapper. Maybe Worker will improve in the future, maybe there's another runtime (Deno?!), or maybe there's someone that can come up with a brilliant idea, then I'll come back to getting Worker supported. Only then, we will have real Async.

