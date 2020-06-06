import { AutoMap } from '../../../src/decorators';
import { BarWithFoo, BarWithFooZeroDepth } from './bar';

export class Temp {
  @AutoMap()
  t!: string;
}

export class TempVm {
  @AutoMap()
  t!: string;
}

export class FooWithBase extends Temp {
  @AutoMap()
  foo!: string;
}

export class FooWithBaseVm extends TempVm {
  @AutoMap()
  foo!: string;
}

export class Foo {
  foo!: string;
}

export class FooWithReturn {
  @AutoMap()
  returnFoo!: string;
  @AutoMap()
  foos!: string[];
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
