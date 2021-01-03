---
id: introduce-to-custom-configuration
title: Introduce to Custom Configuration
sidebar_label: Introduction
---

Custom Configuration is made possible with `forMember()` method and a collection of [MemberMapFunction](../fundamentals/#transformationtype). 

`forMember()` uses the **Selector** approach to provide better DX with type-safe intellisense when selecting members on the **Destination** and/or **Source**

![for-member](/gifs/for-member.gif)

`forMember()` returns a `CreateMemberFluentFunction` so we can chain multiple `forMember()` right after each other in one place.
