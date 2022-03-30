import { AutoMap } from '@automapper/classes';
import { Address, PascalAddress, SnakeAddress } from './address';
import { Avatar, PascalAvatar, SnakeAvatar } from './avatar';

export class Bio {
    @AutoMap()
    text!: string;
    @AutoMap()
    birthday!: Date;
    @AutoMap(() => Avatar)
    avatar!: Avatar;
    @AutoMap(() => [Address])
    addresses!: Address[];
}

export class PascalBio {
    @AutoMap()
    Text!: string;
    @AutoMap()
    Birthday!: Date;
    @AutoMap(() => PascalAvatar)
    Avatar!: PascalAvatar;
    @AutoMap(() => [PascalAddress])
    Addresses!: PascalAddress[];
}

export class SnakeBio {
    @AutoMap()
    text!: string;
    @AutoMap()
    birthday!: Date;
    @AutoMap(() => SnakeAvatar)
    avatar!: SnakeAvatar;
    @AutoMap(() => [SnakeAddress])
    addresses!: SnakeAddress[];
}
