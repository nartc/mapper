import { AutoMap } from '@automapper/classes';
import { SnakeAddress, SnakeAddressVm } from './address-snake';
import { SnakeAvatar, SnakeAvatarVm } from './avatar-snake';

export class SnakeUserProfile {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: Date;
  @AutoMap(() => SnakeAvatar)
  avatar!: SnakeAvatar;
  @AutoMap(() => SnakeAddress)
  addresses!: SnakeAddress[];
}

export class SnakeUserProfileVm {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: string;
  @AutoMap(() => SnakeAvatarVm)
  avatar!: SnakeAvatarVm;
  @AutoMap(() => SnakeAddressVm)
  addresses!: SnakeAddressVm[];
}
