import { AutoMap } from '@automapper/classes';
import { Address } from './address';
import { Avatar } from './avatar';

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
