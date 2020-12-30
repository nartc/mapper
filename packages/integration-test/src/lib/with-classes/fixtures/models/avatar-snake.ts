import { AutoMap } from '@automapper/classes';

export class SnakeAvatar {
  @AutoMap()
  url: string;
  @AutoMap()
  source: string;
  @AutoMap()
  should_ignore: number;
  @AutoMap()
  should_be_substituted: string;
  @AutoMap()
  for_condition: boolean;
}

export class SnakeAvatarVm {
  @AutoMap()
  url: string;
  @AutoMap()
  will_be_ignored: number;
  @AutoMap()
  should_be_substituted: string;
  @AutoMap()
  for_condition: boolean;
}
