import type { MappingProfile } from '@automapper/core';
import {
  condition,
  ignore,
  mapFrom,
  nullSubstitution,
  preCondition,
} from '@automapper/core';
import type {
  PascalAvatar,
  PascalAvatarVm,
} from '../interfaces/avatar-pascal.interface';
import { createAvatarPascalMetadata } from '../interfaces/avatar-pascal.interface';
import type {
  SnakeAvatar,
  SnakeAvatarVm,
} from '../interfaces/avatar-snake.interface';
import { createAvatarSnakeMetadata } from '../interfaces/avatar-snake.interface';
import type { Avatar, AvatarVm } from '../interfaces/avatar.interface';
import { createAvatarMetadata } from '../interfaces/avatar.interface';

export const FOR_SHOULD_IGNORE_PASS_CONDITION = 6;
export const FOR_SHOULD_IGNORE_FAIL_CONDITION = 5;

export const avatarProfile: MappingProfile = (mapper) => {
  createAvatarMetadata();
  createAvatarPascalMetadata();
  createAvatarSnakeMetadata();

  mapper
    .createMap<Avatar, AvatarVm>('Avatar', 'AvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.shouldIgnore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.forCondition,
      condition((s) => s.shouldIgnore > 5, true)
    )
    .forMember((d) => d.willBeIgnored, ignore())
    .forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'));

  mapper
    .createMap<Avatar, PascalAvatarVm>('Avatar', 'PascalAvatarVm')
    .forMember(
      (d) => d.Url,
      preCondition((s) => s.shouldIgnore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.ForCondition,
      condition((s) => s.shouldIgnore > 5, true)
    )
    .forMember((d) => d.WillBeIgnored, ignore())
    .forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'));

  mapper
    .createMap<Avatar, SnakeAvatarVm>('Avatar', 'SnakeAvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.shouldIgnore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.for_condition,
      condition((s) => s.shouldIgnore > 5, true)
    )
    .forMember((d) => d.will_be_ignored, ignore())
    .forMember((d) => d.should_be_substituted, nullSubstitution('sub'));
};

export const pascalAvatarProfile: MappingProfile = (mapper) => {
  createAvatarMetadata();
  createAvatarPascalMetadata();
  createAvatarSnakeMetadata();

  mapper
    .createMap<PascalAvatar, PascalAvatarVm>('PascalAvatar', 'PascalAvatarVm')
    .forMember(
      (d) => d.Url,
      preCondition((s) => s.ShouldIgnore > 5, 'default url'),
      mapFrom((s) => s.Source)
    )
    .forMember(
      (d) => d.ForCondition,
      condition((s) => s.ShouldIgnore > 5, true)
    )
    .forMember((d) => d.WillBeIgnored, ignore())
    .forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'));

  mapper
    .createMap<PascalAvatar, AvatarVm>('PascalAvatar', 'AvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.ShouldIgnore > 5, 'default url'),
      mapFrom((s) => s.Source)
    )
    .forMember(
      (d) => d.forCondition,
      condition((s) => s.ShouldIgnore > 5, true)
    )
    .forMember((d) => d.willBeIgnored, ignore())
    .forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'));

  mapper
    .createMap<PascalAvatar, SnakeAvatarVm>('PascalAvatar', 'SnakeAvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.ShouldIgnore > 5, 'default url'),
      mapFrom((s) => s.Source)
    )
    .forMember(
      (d) => d.for_condition,
      condition((s) => s.ShouldIgnore > 5, true)
    )
    .forMember((d) => d.will_be_ignored, ignore())
    .forMember((d) => d.should_be_substituted, nullSubstitution('sub'));
};

export const snakeAvatarProfile: MappingProfile = (mapper) => {
  createAvatarMetadata();
  createAvatarPascalMetadata();
  createAvatarSnakeMetadata();

  mapper
    .createMap<SnakeAvatar, SnakeAvatarVm>('SnakeAvatar', 'SnakeAvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.should_ignore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.for_condition,
      condition((s) => s.should_ignore > 5, true)
    )
    .forMember((d) => d.will_be_ignored, ignore())
    .forMember((d) => d.should_be_substituted, nullSubstitution('sub'));

  mapper
    .createMap<SnakeAvatar, AvatarVm>('SnakeAvatar', 'AvatarVm')
    .forMember(
      (d) => d.url,
      preCondition((s) => s.should_ignore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.forCondition,
      condition((s) => s.should_ignore > 5, true)
    )
    .forMember((d) => d.willBeIgnored, ignore())
    .forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'));

  mapper
    .createMap<SnakeAvatar, PascalAvatarVm>('SnakeAvatar', 'PascalAvatarVm')
    .forMember(
      (d) => d.Url,
      preCondition((s) => s.should_ignore > 5, 'default url'),
      mapFrom((s) => s.source)
    )
    .forMember(
      (d) => d.ForCondition,
      condition((s) => s.should_ignore > 5, true)
    )
    .forMember((d) => d.WillBeIgnored, ignore())
    .forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'));
};
