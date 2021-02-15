---
id: classes-metadata
title: Metadata
sidebar_label: Metadata
---

`@automapper/classes` provides a decorator `@AutoMap()` to store the metadata of the properties on the models.

## AutoMap

This is a `PropertyDecorator` whose job is to keep track of the metadata of the property, so the metadata is available at runtime. `@automapper/classes` then uses the metadata to initialize the `Mapping` for a particular pair of **Source** and **Destination**

## Storages

`@automapper/classes` internally defines several storages to store the metadata and some extra information.

### ClassMappingStorage

This is to store the `Mapping` of all the models used within the `Mapper`

### ClassMetadataStorage

This is to store the metadata of all the models used within the `Mapper`

### ClassInstanceStorage

This is to store the recursive count and recursive depth of a particular model. The reason for this storage is to handle [Circular Dependencies](classes-limitations.md#circular-dependencies)
