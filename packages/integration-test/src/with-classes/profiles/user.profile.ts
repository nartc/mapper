import type { Mapper, Resolver } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { PascalUserDto, SnakeUserDto, UserDto } from '../dtos/user.dto';
import { PascalUser, SnakeUser, User } from '../models/user';

const fullNameResolver: Resolver<User, UserDto, string> = {
    resolve(source: User): string {
        return source.firstName + ' ' + source.lastName;
    },
};

const pascalFullNameResolver: Resolver<PascalUser, PascalUserDto, string> = {
    resolve(source: PascalUser): string {
        return source.FirstName + ' ' + source.LastName;
    },
};

const snakeFullNameResolver: Resolver<SnakeUser, SnakeUserDto, string> = {
    resolve(source: SnakeUser): string {
        return source.first_name + ' ' + source.last_name;
    },
};

const lastLoginResolver: Resolver<User, UserDto, Date | null> = {
    resolve(source: User): Date | null {
        return source.logins.length
            ? source.logins[source.logins.length - 1]
            : null;
    },
};

const pascalLastLoginResolver: Resolver<
    PascalUser,
    PascalUserDto,
    Date | null
> = {
    resolve(source: PascalUser): Date | null {
        return source.Logins.length
            ? source.Logins[source.Logins.length - 1]
            : null;
    },
};

const snakeLastLoginResolver: Resolver<SnakeUser, SnakeUserDto, Date | null> = {
    resolve(source: SnakeUser): Date | null {
        return source.logins.length
            ? source.logins[source.logins.length - 1]
            : null;
    },
};

export function userProfile(mapper: Mapper) {
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

    createMap(
        mapper,
        User,
        PascalUserDto,
        forMember(
            (d) => d.First,
            mapFrom((s) => s.firstName)
        ),
        forMember(
            (d) => d.Last,
            mapFrom((s) => s.lastName)
        ),
        forMember(
            (d) => d.Full,
            mapFrom((s) => s.firstName + ' ' + s.lastName)
        ),
        forMember(
            (d) => d.LastLogin,
            mapFrom((s) =>
                s.logins.length ? s.logins[s.logins.length - 1] : null
            )
        )
    );

    createMap(
        mapper,
        User,
        SnakeUserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.firstName)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.lastName)
        ),
        forMember(
            (d) => d.full,
            mapFrom((s) => s.firstName + ' ' + s.lastName)
        ),
        forMember(
            (d) => d.last_login,
            mapFrom((s) =>
                s.logins.length ? s.logins[s.logins.length - 1] : null
            )
        )
    );
}

export function pascalUserProfile(mapper: Mapper) {
    createMap(
        mapper,
        PascalUser,
        UserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.FirstName)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.LastName)
        ),
        forMember(
            (d) => d.full,
            mapFrom((s) => s.FirstName + ' ' + s.LastName)
        ),
        forMember(
            (d) => d.lastLogin,
            mapFrom((s) =>
                s.Logins.length ? s.Logins[s.Logins.length - 1] : null
            )
        )
    );

    createMap(
        mapper,
        PascalUser,
        PascalUserDto,
        forMember(
            (d) => d.First,
            mapFrom((s) => s.FirstName)
        ),
        forMember(
            (d) => d.Last,
            mapFrom((s) => s.LastName)
        ),
        forMember((d) => d.Full, mapFrom(pascalFullNameResolver)),
        forMember((d) => d.LastLogin, mapFrom(pascalLastLoginResolver))
    );

    createMap(
        mapper,
        PascalUser,
        SnakeUserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.FirstName)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.LastName)
        ),
        forMember(
            (d) => d.full,
            mapFrom((s) => s.FirstName + ' ' + s.LastName)
        ),
        forMember(
            (d) => d.last_login,
            mapFrom((s) =>
                s.Logins.length ? s.Logins[s.Logins.length - 1] : null
            )
        )
    );
}

export function snakeUserProfile(mapper: Mapper) {
    createMap(
        mapper,
        SnakeUser,
        UserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.first_name)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.last_name)
        ),
        forMember(
            (d) => d.full,
            mapFrom((s) => s.first_name + ' ' + s.last_name)
        ),
        forMember(
            (d) => d.lastLogin,
            mapFrom((s) =>
                s.logins.length ? s.logins[s.logins.length - 1] : null
            )
        )
    );

    createMap(
        mapper,
        SnakeUser,
        PascalUserDto,
        forMember(
            (d) => d.First,
            mapFrom((s) => s.first_name)
        ),
        forMember(
            (d) => d.Last,
            mapFrom((s) => s.last_name)
        ),
        forMember(
            (d) => d.Full,
            mapFrom((s) => s.first_name + ' ' + s.last_name)
        ),
        forMember(
            (d) => d.LastLogin,
            mapFrom((s) =>
                s.logins.length ? s.logins[s.logins.length - 1] : null
            )
        )
    );

    createMap(
        mapper,
        SnakeUser,
        SnakeUserDto,
        forMember(
            (d) => d.first,
            mapFrom((s) => s.first_name)
        ),
        forMember(
            (d) => d.last,
            mapFrom((s) => s.last_name)
        ),
        forMember((d) => d.full, mapFrom(snakeFullNameResolver)),
        forMember((d) => d.last_login, mapFrom(snakeLastLoginResolver))
    );
}
