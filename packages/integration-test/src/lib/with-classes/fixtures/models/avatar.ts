import { AutoMap } from '@automapper/classes';

export class Avatar {
  @AutoMap()
  url!: string;
  @AutoMap()
  source!: string;
  @AutoMap()
  shouldIgnore!: number;
  @AutoMap({ typeFn: () => String })
  shouldBeSubstituted!: string | null;
  @AutoMap()
  forCondition!: boolean;
}

export class AvatarVm {
  @AutoMap()
  url!: string;
  @AutoMap()
  willBeIgnored!: number;
  @AutoMap({ typeFn: () => String })
  shouldBeSubstituted!: string | null;
  @AutoMap()
  forCondition!: boolean;
}
