---
id: getters
title: Handle Getters
sidebar_label: Getters
---

`@nartc/automapper` can also map **public getters**.

```typescript
class User {
  private _firstName: string;
  @AutoMap()
  public get firstName() {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName: string;
  @AutoMap()
  public get lastName() {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }
}

class UserVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
}
```

To iterate once more, `@nartc/automapper` works based a lot on **conventions**. This core-concept applies greatly to the case of **public getters** so
try to keep your `private fields` and `public getters` somewhat aligned with each other. Eg: `private _firstName` and `public get firstName()`
