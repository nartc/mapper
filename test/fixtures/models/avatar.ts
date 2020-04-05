import { AutoMap } from '../../../src';

export class Avatar {
  @AutoMap()
  url!: string;
  @AutoMap()
  source!: string;
  @AutoMap()
  shouldIgnore!: number;
  @AutoMap()
  shouldBeSubstituted!: string;
  @AutoMap()
  forCondition!: boolean;
}

export class AvatarVm {
  @AutoMap()
  url!: string;
  @AutoMap()
  ignored!: number;
  @AutoMap()
  shouldBeSubstituted!: string;
  @AutoMap()
  forCondition!: boolean;
}

export class OtherAvatar {
  @AutoMap()
  url!: string;
  @AutoMap()
  source!: string;
}

export class OtherAvatarVm {
  @AutoMap()
  url!: string;
}
