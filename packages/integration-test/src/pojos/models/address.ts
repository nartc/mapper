import { PojosMetadataMap } from '@automapper/pojos';

export interface Address {
    street: string;
    city: string;
    state: string;
}

export interface PascalAddress {
    Street: string;
    City: string;
    State: string;
}

export interface SnakeAddress {
    street: string;
    city: string;
    state: string;
}

export function createAddressMetadata() {
    PojosMetadataMap.create<Address>('Address', {
        city: String,
        state: String,
        street: String,
    });

    PojosMetadataMap.create<PascalAddress>('PascalAddress', {
        City: String,
        State: String,
        Street: String,
    });

    PojosMetadataMap.create<SnakeAddress>('SnakeAddress', {
        city: String,
        state: String,
        street: String,
    });
}
