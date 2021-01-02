import { AutoMap } from '@automapper/classes';

export class Avatar {
  @AutoMap()
  url: string;
  @AutoMap()
  source: string;
  @AutoMap()
  shouldIgnore: number;
  @AutoMap()
  shouldBeSubstituted: string;
  @AutoMap()
  forCondition: boolean;
}

export class AvatarVm {
  @AutoMap()
  url: string;
  @AutoMap()
  willBeIgnored: number;
  @AutoMap()
  shouldBeSubstituted: string;
  @AutoMap()
  forCondition: boolean;
}
