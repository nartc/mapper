---
id: error-handler
title: ErrorHandler
sidebar_label: ErrorHandler
---

`@automapper/*` does not use `console` methods for handling errors in the code base. Instead, `@automapper/*` allows the consumers to pass in `errorHandler` when we call `createMapper()`.

`errorHandler` will take on the shape of `ErrorHandler` which is the following interface:

```ts
export interface ErrorHandler {
  handle: (message: string) => void;
}
```

By default, `@automapper/*` assigns `console.error` to `ErrorHandler#handle`.

```ts
const mapper = createMapper({
  name,
  pluginInitializer,
  errorHandler: (message) => {
    // custom error handler
  },
});
```
