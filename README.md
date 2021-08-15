# AutoMapper TypeScript

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Unit Test Actions](https://github.com/nartc/mapper/workflows/Unit%20Test/badge.svg)](https://github.com/nartc/mapper/actions?query=workflow%3A%22Unit+Test%22)
[![Docusaurus Actions](https://github.com/nartc/mapper/workflows/Docusaurus/badge.svg)](https://github.com/nartc/mapper/actions?query=workflow%3ADocusaurus)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=nartc_mapper&metric=ncloc)](https://sonarcloud.io/dashboard?id=nartc_mapper)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nartc_mapper&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=nartc_mapper)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nartc_mapper&metric=alert_status)](https://sonarcloud.io/dashboard?id=nartc_mapper)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=nartc_mapper&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=nartc_mapper)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=nartc_mapper&metric=security_rating)](https://sonarcloud.io/dashboard?id=nartc_mapper)

This is a monorepo of `@automapper/core` and official packages.

## Packages

| Project          | Package                                                                    | Version                                                             | Links                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **core**         | [`@automapper/core`](https://npmjs.com/package/@automapper/core)           | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/core)      | [![README](https://img.shields.io/badge/README--green.svg)](/packages/core/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/core) ![NPM](https://img.shields.io/npm/l/@automapper/core)                |
| **classes**      | [`@automapper/classes`](https://npmjs.com/package/@automapper/classes)     | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/classes)   | [![README](https://img.shields.io/badge/README--green.svg)](/packages/classes/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/classes) ![NPM](https://img.shields.io/npm/l/@automapper/classes)       |
| **mapped-types** | -                                                                          | -                                                                   | [![README](https://img.shields.io/badge/README--green.svg)](/packages/classes/mapped-types/README.md)                                                                                                                                               |
| **pojos**        | [`@automapper/pojos`](https://npmjs.com/package/@automapper/pojos)         | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/pojos)     | [![README](https://img.shields.io/badge/README--green.svg)](/packages/pojos/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/pojos) ![NPM](https://img.shields.io/npm/l/@automapper/pojos)             |
| **sequelize**    | [`@automapper/sequelize`](https://npmjs.com/package/@automapper/sequelize) | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/sequelize) | [![README](https://img.shields.io/badge/README--green.svg)](/packages/sequelize/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/sequelize) ![NPM](https://img.shields.io/npm/l/@automapper/sequelize) |
| **nestjs**       | [`@automapper/nestjs`](https://npmjs.com/package/@automapper/nestjs)       | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/nestjs)    | [![README](https://img.shields.io/badge/README--green.svg)](/packages/nestjs/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/nestjs) ![NPM](https://img.shields.io/npm/l/@automapper/nestjs)          |
| **types**        | [`@automapper/types`](https://npmjs.com/package/@automapper/types)         | ![npm (scoped)](https://img.shields.io/npm/v/@automapper/types)     | [![README](https://img.shields.io/badge/README--green.svg)](/packages/types/README.md) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@automapper/types) ![NPM](https://img.shields.io/npm/l/@automapper/types)             |

### Experimental

Packages under **experimental** are either:

- Not ready for production
- Using experimental feature of the ecosystem (TypeScript)

Please be cautious when using these packages.

| Project                | Description                                                         | Links                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **transformer-plugin** | A transformer plugin to minimize boiler-plate for `classes` package | [![README](https://img.shields.io/badge/README--green.svg)](/packages/classes/experimental/transformer-plugin/README.md) |

### Others

| Project                     | Description                                        | Links                                                                                             |
| --------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **integration-test**        | Integration tests of Core and the official plugins | [![README](https://img.shields.io/badge/README--green.svg)](/packages/integration-test/README.md) |
| **nestjs-integration-test** | Integration tests for NestJS                       | -                                                                                                 |

## Documentations

See [Documentations](https://automapperts.netlify.app)

## Miscellaneous

`@automapper/*` is a later iteration of the legacy `@nartc/automapper`. `@nartc/automapper` is archived and is placed in this repo under [legacy branch](https://github.com/nartc/mapper/tree/legacy)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nartc.me/"><img src="https://avatars1.githubusercontent.com/u/25516557?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Chau Tran</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=nartc" title="Code">💻</a> <a href="#ideas-nartc" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/micalevisk"><img src="https://avatars.githubusercontent.com/u/13461315?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Micael Levi L. Cavalcante</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=micalevisk" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AliYusuf95"><img src="https://avatars.githubusercontent.com/u/17704100?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Ali Yusuf</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=AliYusuf95" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/robsonhermes"><img src="https://avatars.githubusercontent.com/u/26451017?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Robson Hermes</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=robsonhermes" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/huybn5776"><img src="https://avatars.githubusercontent.com/u/6702287?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Huybn</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=huybn5776" title="Code">💻</a></td>
    <td align="center"><a href="http://jasonmerino.me/"><img src="https://avatars.githubusercontent.com/u/1660279?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Jason Merino</b></sub></a><br /><a href="https://github.com/nartc/mapper/commits?author=jasonmerino" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome! Please check out our [contributing guide](CONTRIBUTING.md)
