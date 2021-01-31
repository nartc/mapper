import { AutoMap } from '@automapper/classes';

export class SimpleBarWithUnion {
  @AutoMap(() => String)
  bar!: string | null;
}

export class SimpleBarWithUnionVm {
  @AutoMap(() => String)
  bar!: string | null;
}

export class SimpleFooWithUnion {
  @AutoMap(() => String)
  foo!: string | null;
  @AutoMap(() => SimpleBarWithUnion)
  bar!: SimpleBarWithUnion | null;
  @AutoMap(() => Number)
  fooBar!: number | null;
}

export class SimpleFooWithUnionVm {
  @AutoMap(() => String)
  foo!: string | null;
  @AutoMap(() => SimpleBarWithUnionVm)
  bar!: SimpleBarWithUnionVm | null;
  @AutoMap(() => Number)
  fooBar!: number | null;
}
