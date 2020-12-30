import { AutoMap } from '@automapper/classes';

export class SimpleBar {
  @AutoMap()
  bar: string;
}

export class SimpleBarVm {
  @AutoMap()
  bar: string;
}

export class SimpleFoo {
  @AutoMap()
  foo: string;
  @AutoMap(() => SimpleBar)
  bar: SimpleBar;
  @AutoMap()
  fooBar: number;
}

export class SimpleFooVm {
  @AutoMap()
  foo: string;
  @AutoMap(() => SimpleBarVm)
  bar: SimpleBarVm;
  @AutoMap()
  fooBar: number;
}
