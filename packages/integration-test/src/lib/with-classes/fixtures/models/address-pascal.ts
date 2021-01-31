import { AutoMap } from '@automapper/classes';

export class PascalAddress {
  @AutoMap()
  Street!: string;
  @AutoMap()
  City!: string;
  @AutoMap()
  State!: string;
}

export class PascalAddressVm {
  @AutoMap()
  FormattedAddress!: string;
}
