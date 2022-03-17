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
import { AvatarDto, PascalAvatarDto, SnakeAvatarDto } from '../dtos/avatar.dto';
import { Avatar, PascalAvatar, SnakeAvatar } from '../models/avatar';

export function avatarProfile(mapper: Mapper) {
    createMap(
        mapper,
        Avatar,
        AvatarDto,
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

    createMap(
        mapper,
        Avatar,
        PascalAvatarDto,
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

    createMap(
        mapper,
        Avatar,
        SnakeAvatarDto,
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
    createMap(
        mapper,
        PascalAvatar,
        AvatarDto,
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

    createMap(
        mapper,
        PascalAvatar,
        PascalAvatarDto,
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

    createMap(
        mapper,
        PascalAvatar,
        SnakeAvatarDto,
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
    createMap(
        mapper,
        SnakeAvatar,
        AvatarDto,
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

    createMap(
        mapper,
        SnakeAvatar,
        PascalAvatarDto,
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

    createMap(
        mapper,
        SnakeAvatar,
        SnakeAvatarDto,
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
