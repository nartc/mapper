import { convertUsing, mapWith, mapFrom } from '@automapper/core';
import type { MappingProfile } from '@automapper/types';
import { dateToStringConverter } from '../converters/date-to-string.converter';
import { Avatar, AvatarVm } from '../models/avatar';
import { PascalAvatar, PascalAvatarVm } from '../models/avatar-pascal';
import { SnakeAvatar, SnakeAvatarVm } from '../models/avatar-snake';
import { UserProfile, UserProfileVm } from '../models/user-profile';
import {
  PascalUserProfile,
  PascalUserProfileVm,
} from '../models/user-profile-pascal';
import {
  SnakeUserProfile,
  SnakeUserProfileVm,
} from '../models/user-profile-snake';

export const userProfileProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(UserProfile, UserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => AvatarVm,
        (s) => s.avatar,
        () => Avatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap(UserProfileVm, UserProfile)
    .forMember(
      (d) => d.birthday,
      mapFrom(s => s.birthday && new Date(s.birthday)),
    );

  mapper
    .createMap(UserProfile, PascalUserProfileVm)
    .forMember(
      (d) => d.Avatar,
      mapWith(
        () => PascalAvatarVm,
        (s) => s.avatar,
        () => Avatar
      )
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap(UserProfile, SnakeUserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => SnakeAvatarVm,
        (s) => s.avatar,
        () => Avatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );
};

export const pascalUserProfileProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(PascalUserProfile, PascalUserProfileVm)
    .forMember(
      (d) => d.Avatar,
      mapWith(
        () => PascalAvatarVm,
        (s) => s.Avatar,
        () => PascalAvatar
      )
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );

  mapper
    .createMap(PascalUserProfile, UserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => AvatarVm,
        (s) => s.Avatar,
        () => PascalAvatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );

  mapper
    .createMap(PascalUserProfile, SnakeUserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => SnakeAvatarVm,
        (s) => s.Avatar,
        () => PascalAvatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.Birthday)
    );
};

export const snakeUserProfileProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(SnakeUserProfile, SnakeUserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => SnakeAvatarVm,
        (s) => s.avatar,
        () => SnakeAvatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap(SnakeUserProfile, UserProfileVm)
    .forMember(
      (d) => d.avatar,
      mapWith(
        () => AvatarVm,
        (s) => s.avatar,
        () => SnakeAvatar
      )
    )
    .forMember(
      (d) => d.birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );

  mapper
    .createMap(SnakeUserProfile, PascalUserProfileVm)
    .forMember(
      (d) => d.Avatar,
      mapWith(
        () => PascalAvatarVm,
        (s) => s.avatar,
        () => SnakeAvatar
      )
    )
    .forMember(
      (d) => d.Birthday,
      convertUsing(dateToStringConverter, (s) => s.birthday)
    );
};
