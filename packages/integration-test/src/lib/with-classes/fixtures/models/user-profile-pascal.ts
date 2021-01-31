import { AutoMap } from '@automapper/classes';
import { PascalAddress, PascalAddressVm } from './address-pascal';
import { PascalAvatar, PascalAvatarVm } from './avatar-pascal';

export class PascalUserProfile {
  @AutoMap()
  Bio!: string;
  @AutoMap()
  Birthday!: Date;
  @AutoMap(() => PascalAvatar)
  Avatar!: PascalAvatar;
  @AutoMap(() => PascalAddress)
  Addresses!: PascalAddress[];
}

export class PascalUserProfileVm {
  @AutoMap()
  Bio!: string;
  @AutoMap()
  Birthday!: string;
  @AutoMap(() => PascalAvatarVm)
  Avatar!: PascalAvatarVm;
  @AutoMap(() => PascalAddressVm)
  Addresses!: PascalAddressVm[];
}
