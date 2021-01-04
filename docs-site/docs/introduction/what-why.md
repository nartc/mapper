---
id: what-why
title: What and why?
sidebar_label: What and Why?
---

## What is AutoMapper?

AutoMapper is a tool that provides object-object mapping by convention. It enforces the consumers to construct their View Models (or DTOs) with properties that are consistent with the Domain Models (or Entities).

When the consumers' models and view-models are conventionally matching, mapping between these properties becomes a boring task. This is where AutoMapper comes in, to alleviate the boredom.

While AutoMapper provides a powerful Mapping Configurations mechanism, it is implicitly trying to convey the motto _Conventions over Configurations_. Hence, AutoMapper is quite an opinionated tool. Some people might love it, some might hate it.

[Jimmy Bogard](https://jimmybogard.com/), the author of .NET AutoMapper, writes a [blog post](https://jimmybogard.com/automappers-design-philosophy/) to express his design philosophy when he worked on .NET AutoMapper. The summary is quoted below

> AutoMapper works because it enforces a convention. It assumes that your destination types are a subset of the source type. It assumes that everything on your destination type is meant to be mapped. It assumes that the destination member names follow the exact name of the source type. It assumes that you want to flatten complex models into simple ones. <br/><br/>
> All of these assumptions come from our original use case - view models for MVC, where all of those assumptions are in line with our view model design. With AutoMapper, we could enforce our view model design philosophy. This is the true power of conventions - laying down a set of enforceable design rules that help you streamline development along the way.<br/><br/>
> By enforcing conventions, we let our developers focus on the value add activities, and less on the activities that provided zero or negative value, like designing bespoke view models or writing a thousand dumb unit tests.<br/><br/>
> And this is why our usage of AutoMapper has stayed so steady over the years - because our design philosophy for view models hasn't changed. If you find yourself hating a tool, it's important to ask - for what problems was this tool designed to solve? And if those problems are different than yours, perhaps that tool isn't a good fit.

## Why?

I once learned about AutoMapper through some .NET projects at one of the companies I've worked with. In those projects, we utilize [Swagger](https://swagger.io/specification/) (or OpenAPI) to document our REST API.

With the Swagger Documentations exposed, we can combine that with tools like [NSwag](https://github.com/RicoSuter/NSwag) or [OpenAPI Generator](https://openapi-generator.tech/) to set up an automation pipeline of syncing the models across the Backend and Frontend, along with all the HTTP Calls generated for Client-side applications whether it is an [Angular](https://angular.io) web application, a [React Native](https://reactnative.dev/) mobile application, or a [Xamarin Forms](https://dotnet.microsoft.com/apps/xamarin/xamarin-forms) cross-platform application.

The models exposed to Swagger are View Models, which are either flattened version of the Domain Models, or contain properties that match with the Domain Models. If you haven't noticed already, we would have to manually map these models back and forth a lot if it weren't for .NET AutoMapper.

Recently, we venture more into the [NodeJS](https://nodejs.org/en/) world with the release of [NestJS](https://nestjs.com) framework. Without much consideration, we try to re-use the architecture we use with .NET in NestJS and one fatal missing piece is no AutoMapper solution in TypeScript that assembles the .NET one.

And that is the birth for `@automapper/*`

## What's included in `@automapper/*`?

`@automapper/*` is a collection of packages:

- `@automapper/core`
- `@automapper/classes`
- `@automapper/pojos`
- `@automapper/types`
- `@automapper/nestjs`

#### `@automapper/core`

Core is that main package that deals with configuring transformation information between the models. Core is also the package that executes the actual mapping operations between these models.

#### `@automapper/classes`

`classes` is a plugin that provides the storing mechanism for AutoMapper to store metadata of TS/ES6 Class.

#### `@automapper/pojos`

`pojos` is a plugin that provides the storing mechanism for AutoMapper to store metadata of Interfaces/Types to work with POJOs

#### `@automapper/types`

This package provides type definitions for all other packages to use.

#### `@automapper/nestjs`

NestJS integration which provides an `AutomapperModule` to initialize one or more mappers with one or more plugins.
