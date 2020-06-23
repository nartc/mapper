---
id: alternatives
title: Alternatives
sidebar_label: Alternatives
---

There are many _automapper-like_ libraries out there for **JS/TS** world and I am going to list some of them as **alternatives** to `@nartc/automapper`:

1. [automapper-ts](https://github.com/loedeman/AutoMapper): This is probably the closest to .NET AutoMapper of them all and `@nartc/automapper` takes inspiration from this library greatly. However, this library is not maintained as of the moment.
2. [@wufe/mapper](https://github.com/Wufe/mapper): Another .NET AutoMapper inspiration. This seems like an improvement from `automapper-ts` but again, it's not really actively maintained. With that said, the author did say they'd resolve any issues that come up.
3. [morphism](https://github.com/nobrainr/morphism): This is a cool library for mapping. Although, it does not take the same approach as .NET AutoMapper.
4. [object-mapper](https://github.com/wankdanker/node-object-mapper): Another JSON object mapper that does not use the same approach as .NET AutoMapper. This one is pretty popular and simple to use.
5. [class-transformer](https://github.com/typestack/class-transformer): Last but not least, we have `class-transformer`. I would not categories `class-transformer` as a mapper because it does not "map" from 1 model to another but it "transforms" a single model to have different shape.

All of these alternatives are either not adhere to .NET AutoMapper syntax or not maintained which were the main reason why I decided to create `@nartc/automapper`.
