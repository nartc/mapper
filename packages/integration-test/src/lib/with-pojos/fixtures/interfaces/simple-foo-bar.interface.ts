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
  createMetadataMap('SimpleBar', { bar: String });
  createMetadataMap('SimpleBarVm', 'SimpleBar');
  createMetadataMap('SimpleFoo', {
    foo: String,
    bar: 'SimpleBar',
    fooBar: Number,
  });
  createMetadataMap('SimpleFooVm', 'SimpleFoo', {
    bar: 'SimpleBarVm',
  });
}
