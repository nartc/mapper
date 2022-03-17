import { AutoMap } from '@automapper/classes';
import { createMap, MappingProfile } from '@automapper/core';

export enum AccountRole {
    Foo = 'foo',
    Bar = 'bar',
}

export class AccountEntity {
    @AutoMap()
    id!: string;

    @AutoMap()
    username!: string;

    @AutoMap()
    email!: string;

    @AutoMap(() => String)
    role!: AccountRole;

    @AutoMap(() => [String])
    topics!: string[];

    @AutoMap(() => [String])
    posts!: string[];

    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}

export class AccountDTO {
    @AutoMap()
    id!: string;

    @AutoMap()
    username!: string;

    @AutoMap()
    email!: string;

    @AutoMap(() => String)
    role!: AccountRole;
}

export const accountProfile: MappingProfile = (mapper) => {
    createMap(mapper, AccountEntity, AccountDTO);
};
