import { mapFrom } from '@automapper/core';
import { MappingProfile } from '@automapper/types';
import type {
  Foo,
  FooFoo,
  FooFooFoo,
  FooFooFooVm,
  FooFooVm,
  FooVm,
} from '../interfaces/simple-inheritance-foo.interface';
import { createSimpleInheritanceFooMetadata } from '../interfaces/simple-inheritance-foo.interface';

export const simpleInheritanceFooProfile: MappingProfile = (mapper) => {
  createSimpleInheritanceFooMetadata();

  mapper.createMap<Foo, FooVm>('Foo', 'FooVm').forMember(
    (d) => d.fooVm,
    mapFrom((s) => s.foo)
  );

  mapper
    .createMap<FooFoo, FooFooVm>('FooFoo', 'FooFooVm', {
      extends: [mapper.getMapping('Foo', 'FooVm')],
    })
    .forMember(
      (d) => d.fooFooVm,
      mapFrom((s) => s.fooFoo)
    );

  mapper
    .createMap<FooFooFoo, FooFooFooVm>('FooFooFoo', 'FooFooFooVm', {
      extends: [mapper.getMapping('FooFoo', 'FooFooVm')],
    })
    .forMember(
      (d) => d.fooFooFooVm,
      mapFrom((s) => s.fooFooFoo)
    );
};
