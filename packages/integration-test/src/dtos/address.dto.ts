import { AutoMap } from '@automapper/classes';

export class AddressDto {
    @AutoMap()
    formattedAddress!: string;
}
