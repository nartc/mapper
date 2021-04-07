import { AutoMap } from '@automapper/classes';

export class SimpleBar {
  @AutoMap({ typeFn: () => String })
  bar!: string | null;
}

export class SimpleBarVm {
  @AutoMap({ typeFn: () => String })
  bar!: string | null;
}

export class SimpleFoo {
  @AutoMap()
  foo!: string;
  @AutoMap({ typeFn: () => SimpleBar })
  bar!: SimpleBar;
  @AutoMap({ typeFn: () => Number })
  fooBar!: number | null;
}

export class SimpleFooVm {
  @AutoMap()
  foo!: string;
  @AutoMap({ typeFn: () => SimpleBarVm })
  bar!: SimpleBarVm;
  @AutoMap({ typeFn: () => Number })
  fooBar!: number | null;
}
