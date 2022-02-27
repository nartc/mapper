import { AutoMap } from '@automapper/classes';

export class SimpleBarWithUnion {
  @AutoMap({ typeFn: () => String })
  bar!: string | null;
}

export class SimpleBarWithUnionVm {
  @AutoMap({ typeFn: () => String })
  bar!: string | null;
}

export class SimpleFooWithUnion {
  @AutoMap({ typeFn: () => String })
  foo!: string | null;
  @AutoMap({ typeFn: () => SimpleBarWithUnion })
  bar!: SimpleBarWithUnion | null;
  @AutoMap({ typeFn: () => Number })
  fooBar!: number | null;
}

export class SimpleFooWithUnionVm {
  @AutoMap({ typeFn: () => String })
  foo!: string | null;
  @AutoMap({ typeFn: () => SimpleBarWithUnionVm })
  bar!: SimpleBarWithUnionVm | null;
  @AutoMap({ typeFn: () => Number })
  fooBar!: number | null;
}
