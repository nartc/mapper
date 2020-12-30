import { AutoMap } from '@automapper/classes';

export class PascalAvatar {
  @AutoMap()
  Url: string;
  @AutoMap()
  Source: string;
  @AutoMap()
  ShouldIgnore: number;
  @AutoMap()
  ShouldBeSubstituted: string;
  @AutoMap()
  ForCondition: boolean;
}

export class PascalAvatarVm {
  @AutoMap()
  Url: string;
  @AutoMap()
  WillBeIgnored: number;
  @AutoMap()
  ShouldBeSubstituted: string;
  @AutoMap()
  ForCondition: boolean;
}
