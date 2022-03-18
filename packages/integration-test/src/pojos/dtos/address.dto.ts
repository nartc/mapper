import { PojosMetadataMap } from '@automapper/pojos';

export interface AddressDto {
    formattedAddress: string;
}

export interface PascalAddressDto {
    FormattedAddress: string;
}

export interface SnakeAddressDto {
    formatted_address: string;
}

export function createAddressDtoMetadata() {
    PojosMetadataMap.create<AddressDto>('AddressDto', {
        formattedAddress: String,
    });

    PojosMetadataMap.create<PascalAddressDto>('PascalAddressDto', {
        FormattedAddress: String,
    });

    PojosMetadataMap.create<SnakeAddressDto>('SnakeAddressDto', {
        formatted_address: String,
    });
}
