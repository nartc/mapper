---
id: installation
title: Installation
sidebar_label: Installation
---

```bash
npm i @automapper/core
# or with yarn
yarn add @automapper/core
```

#### Peer Dependencies

`@automapper/types` is a `peerDependencies` to all official `@automapper/*` packages. This package provides type-def for the other packages so we can install it as a `devDependencies`

```bash
npm i -D @automapper/types
# or with yarn
yarn add -D @automapper/types
```

#### Pick plugin(s)

Pick one or more plugins you want to use. At least one plugin is required. For brevity purpose of the documentations, I will use `@automapper/classes` throughout when a plugin is mentioned. To learn more about Plugins, go to [Plugins](../plugins-system/introduce-to-plugins) section.

```bash
npm i @automapper/classes
# or with yarn
yarn add @automapper/classes
```

A plugin might have its own `peerDependencies` as well. In this case, `@automapper/classes` does have a `peerDependencies` of `reflect-metadata`

```bash
npm i reflect-metadata
# or with yarn
yarn add reflect-metadata
```

## Summary

Here's all the installations in one command for you to copy

```bash
npm i @automapper/{core,classes} reflect-metadata
npm i -D @automapper/types

# or with yarn

yarn add @automapper/{core,classes} reflect-metadata
yarn add -D @automapper/types
```
