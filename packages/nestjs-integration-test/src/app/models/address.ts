import { AutoMap } from '@automapper/classes';

export class Address {
  @AutoMap()
  street: string;
  @AutoMap()
  city: string;
  @AutoMap()
  state: string;
}

export class AddressVm {
  @AutoMap()
  formattedAddress: string;
}
