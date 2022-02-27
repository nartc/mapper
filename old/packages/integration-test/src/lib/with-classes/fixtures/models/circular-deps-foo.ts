import { AutoMap } from '@automapper/classes';
import { BarWithFoo, BarWithFooZeroDepth } from './circular-deps-bar';

export class FooWithBar {
  @AutoMap()
  id!: string;
  @AutoMap({ typeFn: () => BarWithFoo, depth: 1 })
  bar!: BarWithFoo | null;
}

export class FooWithBarZeroDepth {
  @AutoMap()
  id!: string;
  @AutoMap({ typeFn: () => BarWithFooZeroDepth })
  bar!: BarWithFooZeroDepth | null;
}
