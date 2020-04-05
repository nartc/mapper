import { AutoMap } from '../../../src/decorators';

export class Foo {
  foo!: string;
}

export class FooWithReturn {
  @AutoMap()
  returnFoo!: string;
}

export class FooWithReturnVm {
  @AutoMap()
  returnFooVm!: string;
}
