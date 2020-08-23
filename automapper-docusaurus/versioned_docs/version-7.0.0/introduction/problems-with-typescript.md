---
id: problems-with-typescript
title: Problems with TypeScript
sidebar_label: Problems with TypeScript
---

[Reflection](https://en.wikipedia.org/wiki/Reflection_(computer_programming)) plays a huge part in the **auto** part of an **AutoMapper**. And it is especially *not that great* in **TypeScript** (although, **Reflection** in **TypeScript** has been improving). Let's take a look at the following snippet:

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

You would expect to get `User { firstName: undefined, lastName: undefined }` printed out to the **console**, wouldn't you? At least, it was my expectation. But in reality, you would get `User {}`. Now you're sitting there wondering where `firstName` and `lastName` go.
Next, let's take a look at some similar snippets in **C#**:

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

In **C#**, **AutoMapper** will be able to *conventionally map* `User.FirstName` to `UserVm.FirstName` because of **Convention**. The two classes share the same property names.
In **TypeScript**, you cannot do that **without** having to do a bit extra work. The `User` (or `UserVm`) instance in **TypeScript** does not contain any properties because we
**never actually declared** them in the class 😅. If you are interested in learning more about this whole process, read my [blog post](https://nartc.netlify.com/blogs/automapper-typescript/).
