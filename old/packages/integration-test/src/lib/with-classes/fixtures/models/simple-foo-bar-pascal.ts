import { AutoMap } from '@automapper/classes';

export class PascalSimpleBar {
  @AutoMap()
  Bar!: string;
}

export class PascalSimpleBarVm {
  @AutoMap()
  Bar!: string;
}

export class PascalSimpleFoo {
  @AutoMap()
  Foo!: string;
  @AutoMap({ typeFn: () => PascalSimpleBar })
  Bar!: PascalSimpleBar;
  @AutoMap()
  FooBar!: number;
}

export class PascalSimpleFooVm {
  @AutoMap()
  Foo!: string;
  @AutoMap({ typeFn: () => PascalSimpleBarVm })
  Bar!: PascalSimpleBarVm;
  @AutoMap()
  FooBar!: number;
}
