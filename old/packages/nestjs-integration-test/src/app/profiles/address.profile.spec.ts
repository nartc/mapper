import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { Address, AddressVm } from '../models/address';
import { AddressProfile } from './address.profile';

describe('addressProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({ name: '', pluginInitializer: classes }),
        },
        AddressProfile,
      ],
    }).compile();
    mapper = moduleRef.get<Mapper>(getMapperToken());
  });

  it('should map', () => {
    const address = new Address();
    address.street = 'street';
    address.city = 'city';
    address.state = 'state';

    const vm = mapper.map(address, AddressVm, Address);
    expect(vm.formattedAddress).toEqual(
      `${address.street} ${address.city} ${address.state}`
    );
  });
});
