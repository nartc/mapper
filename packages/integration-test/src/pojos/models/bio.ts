import { PojosMetadataMap } from '@automapper/pojos';
import { Address, PascalAddress, SnakeAddress } from './address';
import { Avatar, PascalAvatar, SnakeAvatar } from './avatar';

export interface Bio {
    text: string;
    birthday: Date;
    avatar: Avatar;
    addresses: Address[];
}

export interface PascalBio {
    Text: string;
    Birthday: Date;
    Avatar: PascalAvatar;
    Addresses: PascalAddress[];
}

export interface SnakeBio {
    text: string;
    birthday: Date;
    avatar: SnakeAvatar;
    addresses: SnakeAddress[];
}

export function createBioMetadata() {
    PojosMetadataMap.create<Bio>('Bio', {
        text: String,
        birthday: Date,
        avatar: 'Avatar',
        addresses: ['Address'],
    });

    PojosMetadataMap.create<PascalBio>('PascalBio', {
        Text: String,
        Birthday: Date,
        Avatar: 'PascalAvatar',
        Addresses: ['PascalAddress'],
    });

    PojosMetadataMap.create<SnakeBio>('SnakeBio', {
        text: String,
        birthday: Date,
        avatar: 'SnakeAvatar',
        addresses: ['SnakeAddress'],
    });
}
