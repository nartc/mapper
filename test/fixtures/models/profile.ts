import { AutoMap } from '../../../src';
import { Address, AddressVm } from './address';
import { Avatar, AvatarVm } from './avatar';

export class Profile {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: Date;
  @AutoMap(() => Avatar)
  avatar!: Avatar;
  @AutoMap(() => Address)
  addresses!: Address[];
}

export class ProfileVm {
  @AutoMap()
  bio!: string;
  @AutoMap(() => AvatarVm)
  avatar!: AvatarVm;
  @AutoMap(() => AddressVm)
  addresses!: AddressVm[];
}
