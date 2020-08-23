---
id: async
title: Async Support
sidebar_label: Async Support
---

### "Fake" Async

You will probably run into some **async** variations like `mapAsync()` and `mapArrayAsync()`. I'm going to go straight to the point: Those are _fake async_.
`mapAsync()` and `mapArrayAsync()` are wrapped inside of a `resolved Promise` so that if you ever need an async version (maybe some of your APIs need to expect `Promise`), you'll have those to use.

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

Real async support can be provided by utilizing **Worker** aka **Worker Thread** for `NodeJS` and **Web Worker** for `Browser`. However, the core concept of `AutoMapper` is
to operate on **Classes** and **Classes** cannot (yet?) be serializable to be transfer to the **Worker Thread**.

I have thought a lot about supporting **Worker** and I have been running into the rabbit hole of trying to come up with a _serializable_ structure to send down to the **Worker**
while still trying to reuse as much of `AutoMapper` as possible.

### Help needed

As things stand right now, I will halt the effort on getting **Worker** to work with `AutoMapper`. Maybe **Worker** will improve in the future, maybe there's another runtime (`Deno`?!),
or maybe there's someone that can come up with a brilliant idea, then I'll come back to getting **Worker** supported.
