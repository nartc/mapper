import { createMetadataMap } from '@automapper/pojos';

export interface PascalSimpleBar {
  Bar: string;
}

export interface PascalSimpleBarVm {
  Bar: string;
}

export interface PascalSimpleFoo {
  Foo: string;
  Bar: PascalSimpleBar;
  FooBar: number;
}

export interface PascalSimpleFooVm {
  Foo: string;
  Bar: PascalSimpleBarVm;
  FooBar: number;
}

export function createSimpleFooBarPascalMetadata() {
  createMetadataMap('PascalSimpleBar', { Bar: String });
  createMetadataMap('PascalSimpleBarVm', 'PascalSimpleBar');
  createMetadataMap('PascalSimpleFoo', {
    Foo: String,
    Bar: 'PascalSimpleBar',
    FooBar: Number,
  });
  createMetadataMap('PascalSimpleFooVm', 'PascalSimpleFoo', {
    Bar: 'PascalSimpleBarVm',
  });
}
