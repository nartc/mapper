import { AutoMap } from '@automapper/classes';
import { Address, AddressVm } from './address';
import { Avatar, AvatarVm } from './avatar';

export class UserProfile {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: Date;
  @AutoMap({ typeFn: () => Avatar })
  avatar!: Avatar;
  @AutoMap({ typeFn: () => Address })
  addresses!: Address[];
}

export class UserProfileVm {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: string;
  @AutoMap({ typeFn: () => AvatarVm })
  avatar!: AvatarVm;
  @AutoMap({ typeFn: () => AddressVm })
  addresses!: AddressVm[];
}
