import type { Mapper } from '@automapper/core';
import {
    condition,
    createMap,
    forMember,
    ignore,
    mapFrom,
    nullSubstitution,
    preCondition,
} from '@automapper/core';
import {
    AvatarDto,
    createAvatarDtoMetadata,
    PascalAvatarDto,
    SnakeAvatarDto,
} from '../dtos/avatar.dto';
import {
    Avatar,
    createAvatarMetadata,
    PascalAvatar,
    SnakeAvatar,
} from '../models/avatar';

export function avatarProfile(mapper: Mapper) {
    createAvatarMetadata();
    createAvatarDtoMetadata();

    createMap<Avatar, AvatarDto>(
        mapper,
        'Avatar',
        'AvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.shouldIgnore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.forCondition,
            condition((s) => s.shouldIgnore > 5, true)
        ),
        forMember((d) => d.willBeIgnored, ignore()),
        forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<Avatar, PascalAvatarDto>(
        mapper,
        'Avatar',
        'PascalAvatarDto',
        forMember(
            (d) => d.Url,
            preCondition((s) => s.shouldIgnore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.ForCondition,
            condition((s) => s.shouldIgnore > 5, true)
        ),
        forMember((d) => d.WillBeIgnored, ignore()),
        forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<Avatar, SnakeAvatarDto>(
        mapper,
        'Avatar',
        'SnakeAvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.shouldIgnore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.for_condition,
            condition((s) => s.shouldIgnore > 5, true)
        ),
        forMember((d) => d.will_be_ignored, ignore()),
        forMember((d) => d.should_be_substituted, nullSubstitution('sub'))
    );
}

export function pascalAvatarProfile(mapper: Mapper) {
    createAvatarMetadata();
    createAvatarDtoMetadata();

    createMap<PascalAvatar, AvatarDto>(
        mapper,
        'PascalAvatar',
        'AvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.ShouldIgnore > 5, 'default url'),
            mapFrom((s) => s.Source)
        ),
        forMember(
            (d) => d.forCondition,
            condition((s) => s.ShouldIgnore > 5, true)
        ),
        forMember((d) => d.willBeIgnored, ignore()),
        forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<PascalAvatar, PascalAvatarDto>(
        mapper,
        'PascalAvatar',
        'PascalAvatarDto',
        forMember(
            (d) => d.Url,
            preCondition((s) => s.ShouldIgnore > 5, 'default url'),
            mapFrom((s) => s.Source)
        ),
        forMember(
            (d) => d.ForCondition,
            condition((s) => s.ShouldIgnore > 5, true)
        ),
        forMember((d) => d.WillBeIgnored, ignore()),
        forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<PascalAvatar, SnakeAvatarDto>(
        mapper,
        'PascalAvatar',
        'SnakeAvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.ShouldIgnore > 5, 'default url'),
            mapFrom((s) => s.Source)
        ),
        forMember(
            (d) => d.for_condition,
            condition((s) => s.ShouldIgnore > 5, true)
        ),
        forMember((d) => d.will_be_ignored, ignore()),
        forMember((d) => d.should_be_substituted, nullSubstitution('sub'))
    );
}

export function snakeAvatarProfile(mapper: Mapper) {
    createAvatarMetadata();
    createAvatarDtoMetadata();

    createMap<SnakeAvatar, AvatarDto>(
        mapper,
        'SnakeAvatar',
        'AvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.should_ignore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.forCondition,
            condition((s) => s.should_ignore > 5, true)
        ),
        forMember((d) => d.willBeIgnored, ignore()),
        forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<SnakeAvatar, PascalAvatarDto>(
        mapper,
        'SnakeAvatar',
        'PascalAvatarDto',
        forMember(
            (d) => d.Url,
            preCondition((s) => s.should_ignore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.ForCondition,
            condition((s) => s.should_ignore > 5, true)
        ),
        forMember((d) => d.WillBeIgnored, ignore()),
        forMember((d) => d.ShouldBeSubstituted, nullSubstitution('sub'))
    );

    createMap<SnakeAvatar, SnakeAvatarDto>(
        mapper,
        'SnakeAvatar',
        'SnakeAvatarDto',
        forMember(
            (d) => d.url,
            preCondition((s) => s.should_ignore > 5, 'default url'),
            mapFrom((s) => s.source)
        ),
        forMember(
            (d) => d.for_condition,
            condition((s) => s.should_ignore > 5, true)
        ),
        forMember((d) => d.will_be_ignored, ignore()),
        forMember((d) => d.should_be_substituted, nullSubstitution('sub'))
    );
}
