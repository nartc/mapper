import { AutoMap } from '../../../src';
import { Address, AddressVm } from './address';
import { Avatar, AvatarVm, OtherAvatar, OtherAvatarVm } from './avatar';

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
  @AutoMap()
  birthday!: string;
  @AutoMap(() => AvatarVm)
  avatar!: AvatarVm;
  @AutoMap(() => AddressVm)
  addresses!: AddressVm[];
}

export class ProfileWithMissingMetadata {
  @AutoMap()
  bio!: string;
  @AutoMap()
  birthday!: Date;
  @AutoMap()
  addresses!: Address[];
  @AutoMap()
  skills!: string[];
}

export class ProfileWithMissingMetadataVm {
  @AutoMap()
  bio!: string;
  @AutoMap()
  addresses!: AddressVm[];
  @AutoMap()
  skills!: string[];
}

export class ProfileWithAvatar {
  @AutoMap()
  bio!: string;
  @AutoMap(() => OtherAvatar)
  avatars!: OtherAvatar[];
}

export class ProfileWithAvatarVm {
  @AutoMap()
  bio!: string;
  @AutoMap(() => OtherAvatarVm)
  avatars!: OtherAvatarVm[];
}
