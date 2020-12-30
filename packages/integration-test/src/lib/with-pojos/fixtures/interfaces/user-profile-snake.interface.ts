import { createMetadataMap } from '@automapper/pojos';
import { SnakeAddress, SnakeAddressVm } from './address-snake.interface';
import { SnakeAvatar, SnakeAvatarVm } from './avatar-snake.interface';

export interface SnakeUserProfile {
  bio: string;
  birthday: Date;
  avatar: SnakeAvatar;
  addresses: SnakeAddress[];
}

export interface SnakeUserProfileVm {
  bio: string;
  birthday: string;
  avatar: SnakeAvatarVm;
  addresses: SnakeAddressVm[];
}

export function createUserProfileSnakeMetadata() {
  createMetadataMap('SnakeUserProfile', {
    bio: String,
    birthday: String,
    avatar: 'SnakeAvatar',
    addresses: 'SnakeAddress',
  });
  createMetadataMap('SnakeUserProfileVm', 'SnakeUserProfile', {
    avatar: 'SnakeAvatarVm',
    addresses: 'SnakeAddressVm',
  });
}
