import {
  condition,
  ignore,
  mapFrom,
  nullSubstitution,
  preCondition,
} from '@automapper/core';
import type { MappingProfile } from '@automapper/types';
import { Avatar, AvatarVm } from '../models/avatar';
import { PascalAvatar, PascalAvatarVm } from '../models/avatar-pascal';
import { SnakeAvatar, SnakeAvatarVm } from '../models/avatar-snake';

export const FOR_SHOULD_IGNORE_PASS_CONDITION = 6;
export const FOR_SHOULD_IGNORE_FAIL_CONDITION = 5;

export const avatarProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(Avatar, AvatarVm)
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
    .createMap(AvatarVm, Avatar)
    .forMember((d) => d.shouldIgnore, ignore());

  mapper
    .createMap(Avatar, PascalAvatarVm)
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
    .createMap(Avatar, SnakeAvatarVm)
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
  mapper
    .createMap(PascalAvatar, PascalAvatarVm)
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
    .createMap(PascalAvatar, AvatarVm)
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
    .createMap(PascalAvatar, SnakeAvatarVm)
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
  mapper
    .createMap(SnakeAvatar, SnakeAvatarVm)
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
    .createMap(SnakeAvatar, AvatarVm)
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
    .createMap(SnakeAvatar, PascalAvatarVm)
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
