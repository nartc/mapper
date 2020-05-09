import { AutoMap } from '../../../src/decorators';
import { FooWithBar } from './foo';

export class Bar {
  bar!: string;
}

export class BarWithFoo {
  @AutoMap()
  id!: string;
  @AutoMap(() => FooWithBar)
  foo!: FooWithBar;
}
