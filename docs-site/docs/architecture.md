---
id: architecture
title: Architecture
sidebar_label: Architecture
---

## Monorepo with Nx

`@automapper/*` is a monorepo with multiple packages that are managed by [Nx DevTools](https://nx.dev). This is to bring a sense of consistency of developing, building, and testing all the separate packages.

## Semantic Versioning

`@automapper/*` will follow [SemVer](https://semver.org/) specification for releasing fixes and features. When a package is bumped, the other packages will also be bumped. A major version might or might not be accompanied with a `beta` or `rc` release.

## Plugin-based approach

Different from the previous version, `@nartc/automapper`, `@automapper/core` is reworked to support for plugin-based system. The plugin-based system allows me to separate the concerns of different packages away from `@automapper/core`. Ultimately, this brings a better developer experience to me (and hopefully, to future contributors) since we can stay focus on one particular area instead of the whole library.

`@automapper/core` will handle the mapping configuration and the mapping operations. Core also provides utilities to help build Plugins.

Plugins will be responsible for Metadata Storing mechanism. `@automapper` works based on metadata of a certain pair of Objects which means this responsibility can now be developed in separation from the Core itself. This allows for customization to meet more use-cases. `@automapper` provides two official plugins: `@automapper/classes` and `@automapper/pojos`

- `@automapper/classes` works with TS/ES5 Class which is exactly like the previous `@nartc/automapper`
- `@automapper/pojos` helps with Interfaces/Types + POJOs.
