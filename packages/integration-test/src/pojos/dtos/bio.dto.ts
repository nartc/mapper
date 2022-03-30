import { PojosMetadataMap } from '@automapper/pojos';
import { AddressDto, PascalAddressDto, SnakeAddressDto } from './address.dto';
import { AvatarDto, PascalAvatarDto, SnakeAvatarDto } from './avatar.dto';

export interface BioDto {
    text: string;
    birthday: string;
    avatar: AvatarDto;
    addresses: AddressDto[];
}

export interface PascalBioDto {
    Text: string;
    Birthday: string;
    Avatar: PascalAvatarDto;
    Addresses: PascalAddressDto[];
}

export interface SnakeBioDto {
    text: string;
    birthday: string;
    avatar: SnakeAvatarDto;
    addresses: SnakeAddressDto[];
}

export function createBioDtoMetadata() {
    PojosMetadataMap.create<BioDto>('BioDto', {
        avatar: 'AvatarDto',
        text: String,
        addresses: ['AddressDto'],
        birthday: String,
    });

    PojosMetadataMap.create<PascalBioDto>('PascalBioDto', {
        Avatar: 'PascalAvatarDto',
        Text: String,
        Addresses: ['PascalAddressDto'],
        Birthday: String,
    });

    PojosMetadataMap.create<SnakeBioDto>('SnakeBioDto', {
        avatar: 'SnakeAvatarDto',
        text: String,
        addresses: ['SnakeAddressDto'],
        birthday: String,
    });
}
