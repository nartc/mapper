import { AutoMap } from '../../../src/decorators';
import { BarWithFoo, BarWithFooZeroDepth } from './bar';

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
  @AutoMap(() => BarWithFoo, 1)
  bar!: BarWithFoo | null;
}

export class FooWithBarZeroDepth {
  @AutoMap()
  id!: string;
  @AutoMap(() => BarWithFooZeroDepth)
  bar!: BarWithFooZeroDepth | null;
}
