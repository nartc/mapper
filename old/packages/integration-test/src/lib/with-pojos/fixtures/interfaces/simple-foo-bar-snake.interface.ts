import { createMetadataMap } from '@automapper/pojos';

export interface SnakeSimpleBar {
  bar: string;
}

export interface SnakeSimpleBarVm {
  bar: string;
}

export interface SnakeSimpleFoo {
  foo: string;
  bar: SnakeSimpleBar;
  foo_bar: number;
}

export interface SnakeSimpleFooVm {
  foo: string;
  bar: SnakeSimpleBarVm;
  foo_bar: number;
}

export function createSimpleFooBarSnakeMetadata() {
  createMetadataMap('SnakeSimpleBar', { bar: String });
  createMetadataMap('SnakeSimpleBarVm', 'SnakeSimpleBar');
  createMetadataMap('SnakeSimpleFoo', {
    foo: String,
    bar: 'SnakeSimpleBar',
    foo_bar: Number,
  });
  createMetadataMap('SnakeSimpleFooVm', 'SnakeSimpleFoo', {
    bar: 'SnakeSimpleBarVm',
  });
}
