import { AutoMap } from '@automapper/classes';
import { AddressDto } from './address.dto';
import { AvatarDto } from './avatar.dto';

export class BioDto {
    @AutoMap()
    text!: string;
    @AutoMap()
    birthday!: string;
    @AutoMap(() => AvatarDto)
    avatar!: AvatarDto;
    @AutoMap(() => [AddressDto])
    addresses!: AddressDto[];
}
