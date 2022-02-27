import { createMetadataMap } from '@automapper/pojos';

export interface Foo {
  foo: string;
}

export interface FooVm {
  fooVm: string;
}

export interface FooFoo extends Foo {
  fooFoo: string;
}

export interface FooFooVm extends FooVm {
  fooFooVm: string;
}

export interface FooFooFoo extends FooFoo {
  fooFooFoo: string;
}

export interface FooFooFooVm extends FooFooVm {
  fooFooFooVm: string;
}

export function createSimpleInheritanceFooMetadata() {
  createMetadataMap('Foo', {
    foo: String,
  });
  createMetadataMap('FooVm', {
    fooVm: String,
  });
  createMetadataMap('FooFoo', 'Foo', {
    fooFoo: String,
  });
  createMetadataMap('FooFooVm', 'FooVm', {
    fooFooVm: String,
  });
  createMetadataMap('FooFooFoo', 'FooFoo', {
    fooFooFoo: String,
  });
  createMetadataMap('FooFooFooVm', 'FooFooVm', {
    fooFooFooVm: String,
  });
}
