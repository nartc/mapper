import { AutoMap } from '@automapper/classes';
import { SnakeAddress, SnakeAddressVm } from './address-snake';
import { SnakeAvatar, SnakeAvatarVm } from './avatar-snake';

export class SnakeUserProfile {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: Date;
  @AutoMap({ typeFn: () => SnakeAvatar })
  avatar!: SnakeAvatar;
  @AutoMap({ typeFn: () => SnakeAddress })
  addresses!: SnakeAddress[];
}

export class SnakeUserProfileVm {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: string;
  @AutoMap({ typeFn: () => SnakeAvatarVm })
  avatar!: SnakeAvatarVm;
  @AutoMap({ typeFn: () => SnakeAddressVm })
  addresses!: SnakeAddressVm[];
}
