import { AutoMap } from '@automapper/classes';
import { FooWithBar, FooWithBarZeroDepth } from './circular-deps-foo';

export class BarWithFoo {
  @AutoMap()
  id: string;
  @AutoMap(() => FooWithBar, 1)
  foo: FooWithBar;
}

export class BarWithFooZeroDepth {
  @AutoMap()
  id: string;
  @AutoMap(() => FooWithBarZeroDepth)
  foo: FooWithBarZeroDepth;
}
