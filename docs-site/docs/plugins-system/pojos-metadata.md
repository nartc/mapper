---
id: pojos-metadata
title: Metadata
sidebar_label: Metadata
---

Different than `@automapper/classes`, `@automapper/pojos` provides a different way to keep track of the metadata. That is a method called: `createMetadataMap()`

## `createMetadataMap()`

`createMetadataMap()` is a function that accepts 2 - 3 arguments:
- `metaKey`: In `@automapper/classes`, a class constructor is used as the **unique** `metaKey`. In `@automapper/pojos`, we need to provide a **unique** string. Usually, the string representation of the Interface name would be sufficient
- `metadataOrMetadataMap`: the second argument can be a `MetadataMap` object or a reference to an existing `metaKey`. This is to help with reusability for models that have similar metadata.
- `metadataMap`: the third argument is an optional `MetadataMap` object. This is to provide additional metadata for a `metaKey` that weren't already available on the existing `metaKey` provided in the second argument. This is also used to negate any unwanted metadata from the second argument `metaKey`

```ts
import { createMetadataMap } from '@automapper/pojos';

export interface SimpleBar {
  bar: string;
}

export interface SimpleBarVm {
  bar: string;
}

export interface SimpleFoo {
  foo: string;
  bar: SimpleBar;
  fooBar: number;
}

export interface SimpleFooVm {
  foo: string;
  bar: SimpleBarVm;
  fooBar: number;
}

export function createSimpleFooBarMetadata() {
  // create a metadataMap for SimpleBar
  createMetadataMap<SimpleBar>('SimpleBar', { bar: String });

  // create a metadataMap for SimpleBarVm. We reuse "SimpleBar" metadata
  createMetadataMap<SimpleBarVm>('SimpleBarVm', 'SimpleBar');

  // create a metadataMap for SimpleFoo
  createMetadataMap<SimpleFoo>('SimpleFoo', {
    foo: String,
    bar: 'SimpleBar',
    fooBar: Number,
  });

  // create a metadataMap for SimpleFooVm
  // We reuse foo and fooBar from SimpleFoo and override bar
  createMetadataMap<SimpleFooVm>('SimpleFooVm', 'SimpleFoo', {
    bar: 'SimpleBarVm',
  });
}
```

`createMetadataMap()` has to be called before invoking `mapper.createMap()` or `mapper.addProfile()`

## Storages

Same as `@automapper/classes`, `@automapper/pojos` has a couple of storages to handle storing the metadata

### PojosMappingStorage

This is to store the `Mapping` of all the models used within the `Mapper`

### PojosMetadataStorage

This is to store the metadata of all the models used within the `Mapper`

### PojosSymbolStorage

This is to store all the metadata for each symbol (`metaKey`)
