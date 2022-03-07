import type { MappingProfile } from '@automapper/core';
import {
    condition,
    createMap,
    forMember,
    ignore,
    mapFrom,
    nullSubstitution,
    preCondition,
} from '@automapper/core';
import { AvatarDto } from '../dtos/avatar.dto';
import { Avatar } from '../models/avatar';

export const avatarProfile: MappingProfile = (mapper) => {
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
};
