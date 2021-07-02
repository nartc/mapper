import { AutoMap } from '@automapper/classes';
import { Foo, FooVm } from '../models/foo';

export class FooExtend extends Foo {
  @AutoMap()
  fooFoo!: string;
}

export class FooExtendVm extends FooVm {
  @AutoMap()
  fooFoo!: string;
}
