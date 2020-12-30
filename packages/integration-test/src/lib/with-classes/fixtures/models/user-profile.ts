import { AutoMap } from '@automapper/classes';
import { Address, AddressVm } from './address';
import { Avatar, AvatarVm } from './avatar';

export class UserProfile {
  @AutoMap()
  bio: string;
  @AutoMap()
  birthday: Date;
  @AutoMap(() => Avatar)
  avatar: Avatar;
  @AutoMap(() => Address)
  addresses: Address[];
}

export class UserProfileVm {
  @AutoMap()
  bio: string;
  @AutoMap()
  birthday: string;
  @AutoMap(() => AvatarVm)
  avatar: AvatarVm;
  @AutoMap(() => AddressVm)
  addresses: AddressVm[];
}
