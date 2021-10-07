---
id: shim-file
title: Shim model for browsers
sidebar_label: Shim model for browsers
---

`@automapper/classes/extra/shim` is part of the public API of `@automapper/classes`.

## Problem

Sometimes you need to reuse the classes decorated with AutoMapper decorators in some frontend app that won't use AutoMapper at all, since they describes models/VMs/DTOs that you want in the end.

## Usage

You must tell to your bunlder system that imports of `@automapper/classes` module should resolves to `@automapper/classes/extra/shim` instead.

### Webpack

Read about [Resolve on Webpack's documentation](https://webpack.js.org/configuration/resolve).

```js
// snip
module.exports = {
  // snip
  resolve: {
    alias: {
      '@automapper/classes': path.resolve(
        __dirname,
        '../node_modules/@automapper/classes/extra/shim'
      ),
    },
  },
  // snip
};
```
