import { AutoMap } from '../../../src/decorators';
import { BarWithFoo } from './bar';

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

export class FooWithBar {
  @AutoMap()
  id!: string;
  @AutoMap(() => BarWithFoo)
  bar!: BarWithFoo | null;
}
