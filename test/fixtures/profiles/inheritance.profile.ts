import { AutoMapper, mapFrom, ProfileBase } from '../../../src';
import {
  Foo,
  FooFoo,
  FooFooFoo,
  FooFooFooVm,
  FooFooVm,
  FooVm,
} from '../models/inheritance';

export class InheritanceProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Foo, FooVm).forMember(
      d => d.fooVm,
      mapFrom(s => s.foo)
    );

    mapper.createMap(FooFoo, FooFooVm, { includeBase: [Foo, FooVm] }).forMember(
      d => d.fooFooVm,
      mapFrom(s => s.fooFoo)
    );

    mapper
      .createMap(FooFooFoo, FooFooFooVm, { includeBase: [FooFoo, FooFooVm] })
      .forMember(
        d => d.fooFooFooVm,
        mapFrom(s => s.fooFooFoo)
      );
  }
}
