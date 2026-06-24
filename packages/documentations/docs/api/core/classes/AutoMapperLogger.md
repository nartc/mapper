---
id: "AutoMapperLogger"
title: "Class: AutoMapperLogger"
sidebar_label: "AutoMapperLogger"
sidebar_position: 0
custom_edit_url: null
---

## Logger types

```ts
export type AutoMapperLogFn = (
    message: unknown,
    ...optionalParams: unknown[]
) => void;

export interface AutoMapperLoggerLike {
    log?: AutoMapperLogFn;
    info?: AutoMapperLogFn;
    warn?: AutoMapperLogFn;
    error?: AutoMapperLogFn;
    debug?: AutoMapperLogFn;
    verbose?: AutoMapperLogFn;
    fatal?: AutoMapperLogFn;
    trace?: AutoMapperLogFn;
}
```

## Configuration

Use `AutoMapperLogger.configure()` to route AutoMapper logs to a structured
logger.

```ts
import { AutoMapperLogger } from '@automapper/core';

const restore = AutoMapperLogger.configure({
    info: (message, ...params) => logger.info(message, ...params),
    warn: (message, ...params) => logger.warn(message, ...params),
    error: (message, ...params) => logger.error(message, ...params),
});

restore();
```

`configure()` replaces the current custom logger. Later calls override earlier
calls. The returned function restores the logger that was active before that
`configure()` call.

Use `AutoMapperLogger.reset()` to restore the default console logger.

## Default levels

- `log` -> `console.log`
- `info` -> `console.info`
- `warn` -> `console.warn`
- `error` -> `console.error`
- `debug` -> `console.debug`
- `verbose` -> `console.debug`
- `fatal` -> `console.error`
- `trace` -> no default implementation

Default console logs preserve this output shape:

```ts
console.error('[AutoMapper]: ', message, ...optionalParams);
```

`trace` is optional so AutoMapper does not accidentally call `console.trace()`
and print stack traces. When using it, call it with optional chaining:

```ts
AutoMapperLogger.trace?.('diagnostic message');
```

## Configure early

Some AutoMapper logs happen while decorators run, before a mapper exists. If you
need decorator-time logs routed to your logger, call `AutoMapperLogger.configure()`
before importing decorated model classes.
