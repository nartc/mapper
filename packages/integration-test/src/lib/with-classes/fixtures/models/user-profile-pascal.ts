import { AutoMap } from '@automapper/classes';
import { PascalAddress, PascalAddressVm } from './address-pascal';
import { PascalAvatar, PascalAvatarVm } from './avatar-pascal';

export class PascalUserProfile {
  @AutoMap()
  Bio!: string;
  @AutoMap()
  Birthday!: Date;
  @AutoMap({ typeFn: () => PascalAvatar })
  Avatar!: PascalAvatar;
  @AutoMap({ typeFn: () => PascalAddress })
  Addresses!: PascalAddress[];
}

export class PascalUserProfileVm {
  @AutoMap()
  Bio!: string;
  @AutoMap()
  Birthday!: string;
  @AutoMap({ typeFn: () => PascalAvatarVm })
  Avatar!: PascalAvatarVm;
  @AutoMap({ typeFn: () => PascalAddressVm })
  Addresses!: PascalAddressVm[];
}
