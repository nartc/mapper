import { AutoMap } from '@automapper/classes';

export class CustomKeyBar {
  @AutoMap({ typeFn: () => String })
  ['.startDot']!: string | null;
}

export class CustomKeyBarVm {
  @AutoMap({ typeFn: () => String })
  ['.startDot']!: string | null;
}

export class CustomKeyFoo {
  @AutoMap()
  ['.startDot']!: string;
  @AutoMap({ typeFn: () => CustomKeyBar })
  ['mid.Dot']!: CustomKeyBar;
  @AutoMap({ typeFn: () => Number })
  ['endDot.']!: number | null;
  @AutoMap({ typeFn: () => String })
  normalKey!: string;
}

export class CustomKeyFooVm {
  @AutoMap()
  ['.startDot']!: string;
  @AutoMap({ typeFn: () => CustomKeyBarVm })
  ['mid.Dot']!: CustomKeyBarVm;
  @AutoMap({ typeFn: () => Number })
  ['endDot.']!: number | null;
  @AutoMap({ typeFn: () => String })
  normalKey!: string;
}
