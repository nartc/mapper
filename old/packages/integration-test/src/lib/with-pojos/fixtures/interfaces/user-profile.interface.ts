import { createMetadataMap } from '@automapper/pojos';
import { Address, AddressVm } from './address.interface';
import { Avatar, AvatarVm } from './avatar.interface';

export interface UserProfile {
  bio: string;
  birthday: Date;
  avatar: Avatar;
  addresses: Address[];
}

export interface UserProfileVm {
  bio: string;
  birthday: string;
  avatar: AvatarVm;
  addresses: AddressVm[];
}

export function createUserProfileMetadata() {
  createMetadataMap('UserProfile', {
    bio: String,
    birthday: String,
    avatar: 'Avatar',
    addresses: 'Address',
  });
  createMetadataMap('UserProfileVm', 'UserProfile', {
    avatar: 'AvatarVm',
    addresses: 'AddressVm',
  });
}
