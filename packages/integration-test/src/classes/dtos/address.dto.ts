import { AutoMap } from '@automapper/classes';

export class AddressDto {
    @AutoMap()
    formattedAddress!: string;
}

export class PascalAddressDto {
    @AutoMap()
    FormattedAddress!: string;
}

export class SnakeAddressDto {
    @AutoMap()
    formatted_address!: string;
}
