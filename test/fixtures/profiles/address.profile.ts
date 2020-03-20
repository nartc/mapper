import { AutoMapper, mapFrom, ProfileBase } from '../../../src';
import { Address, AddressVm } from '../models/address';

export class AddressProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Address, AddressVm).forMember(
      d => d.formattedAddress,
      mapFrom(s => s.street + ' ' + s.city + ' ' + s.state)
    );
  }
}
