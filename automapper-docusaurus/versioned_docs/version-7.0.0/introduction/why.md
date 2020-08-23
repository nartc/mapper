---
id: why
title: Why AutoMapper for TypeScript?
sidebar_label: Why AutoMapper?
---

**AutoMapper** is a tool that provides `Object - Object` mapping by **convention**. If you construct your **ViewModels (DTOs, VMs)** with properties that are consistent with your **Domain Models**, then you have established a **convention** and **AutoMapper** is a great tool for this type of mapping operation, based on projects' needs.
It will take away all the _boring manual mappings_. The original **AutoMapper** in **C#** world was created by [Jimmy Bogard](https://jimmybogard.com/). While it seems convenient,
**AutoMapper** is the kind of tool that you either love to use it or hate it. Jimmy writes a blog post on [AutoMapper's Design Philosophy](https://jimmybogard.com/automappers-design-philosophy/) that expresses his opinions on his library.
The same philosophy applies to `@nartc/automapper` as I take a lot of inspiration from the original **C# AutoMapper**. I will quote the last part of the blog post because I think it is a good summary on Jimmy's thoughts regarding **AutoMapper** as a tool

> AutoMapper works because it enforces a convention. It assumes that your destination types are a subset of the source type. It assumes that everything on your destination type is meant to be mapped. It assumes that the destination member names follow the exact name of the source type. It assumes that you want to flatten complex models into simple ones. <br/><br/>
> All of these assumptions come from our original use case - view models for MVC, where all of those assumptions are in line with our view model design. With AutoMapper, we could enforce our view model design philosophy. This is the true power of conventions - laying down a set of enforceable design rules that help you streamline development along the way.<br/><br/>
> By enforcing conventions, we let our developers focus on the value add activities, and less on the activities that provided zero or negative value, like designing bespoke view models or writing a thousand dumb unit tests.<br/><br/>
> And this is why our usage of AutoMapper has stayed so steady over the years - because our design philosophy for view models hasn't changed. If you find yourself hating a tool, it's important to ask - for what problems was this tool designed to solve? And if those problems are different than yours, perhaps that tool isn't a good fit.
