import { mapFrom } from '@automapper/core';
import { MappingProfile } from '@automapper/types';
import {
  EmptyFoo,
  EmptyFooVm,
  Foo,
  FooFoo,
  FooFooFoo,
  FooFooFooVm,
  FooFooVm,
  FooVm,
} from '../models/simple-inheritance-foo';

export const simpleInheritanceFooProfile: MappingProfile = (mapper) => {
  mapper.createMap(Foo, FooVm).forMember(
    (d) => d.fooVm,
    mapFrom((s) => s.foo)
  );

  mapper
    .createMap(FooFoo, FooFooVm, { extends: [mapper.getMapping(Foo, FooVm)] })
    .forMember(
      (d) => d.fooFooVm,
      mapFrom((s) => s.fooFoo)
    );

  mapper
    .createMap(FooFooFoo, FooFooFooVm, {
      extends: [mapper.getMapping(FooFoo, FooFooVm)],
    })
    .forMember(
      (d) => d.fooFooFooVm,
      mapFrom((s) => s.fooFooFoo)
    );

  mapper.createMap(EmptyFoo, EmptyFooVm, {
    extends: [mapper.getMapping(FooFooFoo, FooFooFooVm)],
  });
};
