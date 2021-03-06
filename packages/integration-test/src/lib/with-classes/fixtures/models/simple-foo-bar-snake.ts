import { AutoMap } from '@automapper/classes';

export class SnakeSimpleBar {
  @AutoMap()
  bar!: string;
}

export class SnakeSimpleBarVm {
  @AutoMap()
  bar!: string;
}

export class SnakeSimpleFoo {
  @AutoMap()
  foo!: string;
  @AutoMap({ typeFn: () => SnakeSimpleBar })
  bar!: SnakeSimpleBar;
  @AutoMap()
  foo_bar!: number;
}

export class SnakeSimpleFooVm {
  @AutoMap()
  foo!: string;
  @AutoMap({ typeFn: () => SnakeSimpleBarVm })
  bar!: SnakeSimpleBarVm;
  @AutoMap()
  foo_bar!: number;
}
