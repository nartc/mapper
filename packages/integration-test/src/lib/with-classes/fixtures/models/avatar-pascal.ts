import { AutoMap } from '@automapper/classes';

export class PascalAvatar {
  @AutoMap()
  Url!: string;
  @AutoMap()
  Source!: string;
  @AutoMap()
  ShouldIgnore!: number;
  @AutoMap(() => String)
  ShouldBeSubstituted!: string | null;
  @AutoMap()
  ForCondition!: boolean;
}

export class PascalAvatarVm {
  @AutoMap()
  Url!: string;
  @AutoMap()
  WillBeIgnored!: number;
  @AutoMap(() => String)
  ShouldBeSubstituted!: string | null;
  @AutoMap()
  ForCondition!: boolean;
}
