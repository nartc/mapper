---
id: author-use-case
title: Author's Use-case
sidebar_label: Author's use-case
---

At, [ArchitectNow](https://architectnow.net) where I work, we utilize [OpenAPI Specification](https://swagger.io/docs/specification/about/) to document our **API** days in days out, on every projects that we see fit.
Combined with a tool like [NSwag](https://github.com/RicoSuter/NSwag) or [SwaggerCodegen](https://github.com/swagger-api/swagger-codegen), we have an automation pipeline to generate
**HTTP calls** for client-side applications whether it is an [Angular](https://angular.io) web application, a [React Native](https://facebook.github.io/react-native/) mobile application, or an [Xamarin.Forms](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/) app.
At a high level, we have **Domain Models** which are the shape of data that will go in the Database and multiple *conventionally matching* **View Models** that will be exposed to the Client instead of the **Domain Models** counterparts.
Without **AutoMapper**, we would have to manually map a lot of data back and forth on every single API calls.

Now in **C#**, you have **AutoMapper**. Not so much in the **NodeJS** world. For **NodeJS** projects, we leverage an awesome framework called [NestJS](https://nestjs.com) 🎇. **NestJS**
takes on *Angular-like* architecture which helps so much with building maintainable and scalable server-side applications. When working with **NestJS**, we take the same approach as we build a **.NET Core** application.
Unfortunately, there is not one **AutoMapper for TypeScript** solution that is good enough for us which I mention in [Alternatives]() section. That's why `@nartc/automapper` is born.
