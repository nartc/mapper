import { createMetadataMap } from '@automapper/pojos';
import { PascalAddress, PascalAddressVm } from './address-pascal.interface';
import { PascalAvatar, PascalAvatarVm } from './avatar-pascal.interface';

export interface PascalUserProfile {
  Bio: string;
  Birthday: Date;
  Avatar: PascalAvatar;
  Addresses: PascalAddress[];
}

export interface PascalUserProfileVm {
  Bio: string;
  Birthday: string;
  Avatar: PascalAvatarVm;
  Addresses: PascalAddressVm[];
}

export function createUserProfilePascalMetadata() {
  createMetadataMap('PascalUserProfile', {
    Bio: String,
    Birthday: String,
    Avatar: 'PascalAvatar',
    Addresses: 'PascalAddress',
  });
  createMetadataMap('PascalUserProfileVm', 'PascalUserProfile', {
    Avatar: 'PascalAvatarVm',
    Addresses: 'PascalAddressVm',
  });
}
