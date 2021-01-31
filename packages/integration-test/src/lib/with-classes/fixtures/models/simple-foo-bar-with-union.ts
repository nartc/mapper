import { AutoMap } from '@automapper/classes';

export class SimpleBarWithUnion {
  @AutoMap()
  bar: string | null;
}

export class SimpleBarWithUnionVm {
  @AutoMap()
  bar: string | null;
}

export class SimpleFooWithUnion {
  @AutoMap()
  foo: string | null;
  @AutoMap(() => SimpleBarWithUnion)
  bar: SimpleBarWithUnion | null;
  @AutoMap()
  fooBar: number | null;
}

export class SimpleFooWithUnionVm {
  @AutoMap()
  foo: string | null;
  @AutoMap(() => SimpleBarWithUnionVm)
  bar: SimpleBarWithUnionVm | null;
  @AutoMap()
  fooBar: number | null;
}
