import { AutoMap } from '@automapper/classes';

export class SimpleBar {
  @AutoMap(() => String)
  bar!: string | null;
}

export class SimpleBarVm {
  @AutoMap(() => String)
  bar!: string | null;
}

export class SimpleFoo {
  @AutoMap()
  foo!: string;
  @AutoMap(() => SimpleBar)
  bar!: SimpleBar;
  @AutoMap(() => Number)
  fooBar!: number | null;
}

export class SimpleFooVm {
  @AutoMap()
  foo!: string;
  @AutoMap(() => SimpleBarVm)
  bar!: SimpleBarVm;
  @AutoMap(() => Number)
  fooBar!: number | null;
}
