import 'reflect-metadata';
import {
    CamelCaseNamingConvention,
    createMap,
    forMember,
    mapFrom,
    type Mapper,
    namingConventions,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { AutoMap } from '@automapper/classes';

// Shared classes-strategy fixtures used by bench.ts, verify.ts, and
// profile-formember.ts so the model/factory/mapping setup lives in one place.

export const makeUser = (i: number) => ({
    firstName: `First${i}`,
    lastName: `Last${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 50),
    active: i % 2 === 0,
    role: i % 3 === 0 ? 'admin' : 'user',
    score: i * 1.5,
    createdAt: 'Fri Jun 19 2026',
});

// snake_case source — exercises the source->dest naming-convention rename path
export const makeSnakeUser = (i: number) => ({
    first_name: `First${i}`,
    last_name: `Last${i}`,
    email_address: `user${i}@example.com`,
    user_age: 20 + (i % 50),
    is_active: i % 2 === 0,
    user_role: i % 3 === 0 ? 'admin' : 'user',
});

// Explicit @AutoMap types — esbuild/tsx has no emitDecoratorMetadata, so the
// design:type is provided explicitly.
export class User {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) email!: string;
    @AutoMap(() => Number) age!: number;
    @AutoMap(() => Boolean) active!: boolean;
    @AutoMap(() => String) role!: string;
    @AutoMap(() => Number) score!: number;
    @AutoMap(() => String) createdAt!: string;
}
export class UserDto {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) email!: string;
    @AutoMap(() => Number) age!: number;
    @AutoMap(() => Boolean) active!: boolean;
    @AutoMap(() => String) role!: string;
    @AutoMap(() => Number) score!: number;
    @AutoMap(() => String) createdAt!: string;
}
// 2 auto-mapped (same-name) + 6 mapFrom-derived members — a common real-world
// configuration the identity groups don't exercise.
export class UserView {
    @AutoMap(() => String) firstName!: string; // auto (same name)
    @AutoMap(() => String) lastName!: string; // auto (same name)
    @AutoMap(() => String) fullName!: string; // mapFrom
    @AutoMap(() => String) emailLower!: string; // mapFrom
    @AutoMap(() => String) ageGroup!: string; // mapFrom
    @AutoMap(() => Boolean) isActive!: boolean; // mapFrom
    @AutoMap(() => String) roleLabel!: string; // mapFrom
    @AutoMap(() => Number) scoreRounded!: number; // mapFrom
}
export class SnakeUser {
    @AutoMap(() => String) first_name!: string;
    @AutoMap(() => String) last_name!: string;
    @AutoMap(() => String) email_address!: string;
    @AutoMap(() => Number) user_age!: number;
    @AutoMap(() => Boolean) is_active!: boolean;
    @AutoMap(() => String) user_role!: string;
}
export class CamelUserDto {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) emailAddress!: string;
    @AutoMap(() => Number) userAge!: number;
    @AutoMap(() => Boolean) isActive!: boolean;
    @AutoMap(() => String) userRole!: string;
}

/**
 * Register the three classes-strategy mappings on a classes() mapper:
 *  - User -> UserDto         (identity / auto-map)
 *  - User -> UserView        (2 auto + 6 forMember(mapFrom))
 *  - SnakeUser -> CamelUserDto (snake_case -> camelCase naming convention)
 */
export function registerUserMaps(mapper: Mapper): void {
    createMap(mapper, User, UserDto);
    createMap(
        mapper,
        User,
        UserView,
        forMember(
            (d) => d.fullName,
            mapFrom((s) => `${s.firstName} ${s.lastName}`)
        ),
        forMember(
            (d) => d.emailLower,
            mapFrom((s) => s.email.toLowerCase())
        ),
        forMember(
            (d) => d.ageGroup,
            mapFrom((s) => (s.age < 30 ? 'young' : 'adult'))
        ),
        forMember(
            (d) => d.isActive,
            mapFrom((s) => s.active)
        ),
        forMember(
            (d) => d.roleLabel,
            mapFrom((s) => s.role.toUpperCase())
        ),
        forMember(
            (d) => d.scoreRounded,
            mapFrom((s) => Math.round(s.score))
        )
    );
    createMap(
        mapper,
        SnakeUser,
        CamelUserDto,
        namingConventions({
            source: new SnakeCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        })
    );
}
