import { AutoMap } from '@automapper/classes';
import { AddressDto, PascalAddressDto, SnakeAddressDto } from './address.dto';
import { AvatarDto, PascalAvatarDto, SnakeAvatarDto } from './avatar.dto';

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

export class PascalBioDto {
    @AutoMap()
    Text!: string;
    @AutoMap()
    Birthday!: string;
    @AutoMap(() => PascalAvatarDto)
    Avatar!: PascalAvatarDto;
    @AutoMap(() => [PascalAddressDto])
    Addresses!: PascalAddressDto[];
}

export class SnakeBioDto {
    @AutoMap()
    text!: string;
    @AutoMap()
    birthday!: string;
    @AutoMap(() => SnakeAvatarDto)
    avatar!: SnakeAvatarDto;
    @AutoMap(() => [SnakeAddressDto])
    addresses!: SnakeAddressDto[];
}
