import { AutoMap } from '../../../src/decorators';
import { FooWithBar, FooWithBarZeroDepth } from './foo';

export class Bar {
  bar!: string;
}

export class BarWithFoo {
  @AutoMap()
  id!: string;
  @AutoMap(() => FooWithBar, 1)
  foo!: FooWithBar;
}

export class BarWithFooZeroDepth {
  @AutoMap()
  id!: string;
  @AutoMap(() => FooWithBarZeroDepth)
  foo!: FooWithBarZeroDepth;
}
