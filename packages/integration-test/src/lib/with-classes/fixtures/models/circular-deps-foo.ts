import { AutoMap } from '@automapper/classes';
import { BarWithFoo, BarWithFooZeroDepth } from './circular-deps-bar';

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
