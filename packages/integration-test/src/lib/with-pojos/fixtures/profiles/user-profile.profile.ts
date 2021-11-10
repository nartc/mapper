import type { MappingProfile } from '@automapper/core';
import { convertUsing, mapWith } from '@automapper/core';
import { dateToStringConverter } from '../converters/date-to-string.converter';
import type {
  PascalUserProfile,
  PascalUserProfileVm,
} from '../interfaces/user-profile-pascal.interface';
import { createUserProfilePascalMetadata } from '../interfaces/user-profile-pascal.interface';
import type {
  SnakeUserProfile,
  SnakeUserProfileVm,
} from '../interfaces/user-profile-snake.interface';
import { createUserProfileSnakeMetadata } from '../interfaces/user-profile-snake.interface';
import type {
  UserProfile,
  UserProfileVm,
} from '../interfaces/user-profile.interface';
import { createUserProfileMetadata } from '../interfaces/user-profile.interface';

export const userProfileProfile: MappingProfile = (mapper) => {
  createUserProfileMetadata();
  createUserProfilePascalMetadata();
  createUserProfileSnakeMetadata();

  mapper
    .createMap<UserProfile, UserProfileVm>('UserProfile', 'UserProfileVm')
    .forMember(
      (d) => d.avatar,
      mapWith('AvatarVm', 'Avatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap<UserProfile, PascalUserProfileVm>(
      'UserProfile',
      'PascalUserProfileVm'
    )
    .forMember(
      (d) => d.Avatar,
      mapWith('PascalAvatarVm', 'Avatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap<UserProfile, SnakeUserProfileVm>(
      'UserProfile',
      'SnakeUserProfileVm'
    )
    .forMember(
      (d) => d.avatar,
      mapWith('SnakeAvatarVm', 'Avatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );
};

export const pascalUserProfileProfile: MappingProfile = (mapper) => {
  createUserProfileMetadata();
  createUserProfilePascalMetadata();
  createUserProfileSnakeMetadata();

  mapper
    .createMap<PascalUserProfile, PascalUserProfileVm>(
      'PascalUserProfile',
      'PascalUserProfileVm'
    )
    .forMember(
      (d) => d.Avatar,
      mapWith('PascalAvatarVm', 'PascalAvatar', (s) => s.Avatar)
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );

  mapper
    .createMap<PascalUserProfile, UserProfileVm>(
      'PascalUserProfile',
      'UserProfileVm'
    )
    .forMember(
      (d) => d.avatar,
      mapWith('AvatarVm', 'PascalAvatar', (s) => s.Avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );

  mapper
    .createMap<PascalUserProfile, SnakeUserProfileVm>(
      'PascalUserProfile',
      'SnakeUserProfileVm'
    )
    .forMember(
      (d) => d.avatar,
      mapWith('SnakeAvatarVm', 'PascalAvatar', (s) => s.Avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );
};

export const snakeUserProfileProfile: MappingProfile = (mapper) => {
  createUserProfileMetadata();
  createUserProfilePascalMetadata();
  createUserProfileSnakeMetadata();

  mapper
    .createMap<SnakeUserProfile, SnakeUserProfileVm>(
      'SnakeUserProfile',
      'SnakeUserProfileVm'
    )
    .forMember(
      (d) => d.avatar,
      mapWith('SnakeAvatarVm', 'SnakeAvatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap<SnakeUserProfile, UserProfileVm>(
      'SnakeUserProfile',
      'UserProfileVm'
    )
    .forMember(
      (d) => d.avatar,
      mapWith('AvatarVm', 'SnakeAvatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap<SnakeUserProfile, PascalUserProfileVm>(
      'SnakeUserProfile',
      'PascalUserProfileVm'
    )
    .forMember(
      (d) => d.Avatar,
      mapWith('PascalAvatarVm', 'SnakeAvatar', (s) => s.avatar)
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );
};
