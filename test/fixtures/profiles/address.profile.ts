import { AutoMapper, ignore, mapFrom, ProfileBase } from '../../../src';
import { Address, AddressVm } from '../models/address';

export class AddressProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Address, AddressVm)
      .forMember(
        d => d.formattedAddress,
        mapFrom(s => `${s.street} ${s.city} ${s.state}`)
      )
      .reverseMap()
      .forPath(s => s.street, ignore())
      .forPath(s => s.city, ignore())
      .forPath(s => s.state, ignore());
  }
}
