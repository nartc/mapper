import { AutoMap } from '@automapper/classes';

export class SnakeAddress {
  @AutoMap()
  street!: string;
  @AutoMap()
  city!: string;
  @AutoMap()
  state!: string;
}

export class SnakeAddressVm {
  @AutoMap()
  formatted_address!: string;
}
