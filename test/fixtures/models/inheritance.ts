import { AutoMap } from '../../../src';

export class Foo {
  @AutoMap()
  foo!: string;
}

export class FooVm {
  @AutoMap()
  fooVm!: string;
}

export class FooFoo extends Foo {
  @AutoMap()
  fooFoo!: string;
}

export class FooFooVm extends FooVm {
  @AutoMap()
  fooFooVm!: string;
}

export class FooFooFoo extends FooFoo {
  @AutoMap()
  fooFooFoo!: string;
}

export class FooFooFooVm extends FooFooVm {
  @AutoMap()
  fooFooFooVm!: string;
}
