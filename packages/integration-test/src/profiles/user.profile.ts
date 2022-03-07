import type { MappingProfile, Resolver } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

const fullNameResolver: Resolver<User, UserDto, string> = {
    resolve(source: User): string {
        return source.firstName + ' ' + source.lastName;
    },
};

const lastLoginResolver: Resolver<User, UserDto, Date | null> = {
    resolve(source: User): Date | null {
        return source.logins.length
            ? source.logins[source.logins.length - 1]
            : null;
    },
};

export const userProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        User,
        UserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.firstName)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.lastName)
        ),
        forMember((d) => d.full, mapFrom(fullNameResolver)),
        forMember((d) => d.lastLogin, mapFrom(lastLoginResolver))
    );
};
