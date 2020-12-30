import { mapDefer, mapFrom, preCondition } from '@automapper/core';
import { setupPojos } from '../setup.spec';
import {
  createSimpleUserMetadata,
  SimpleUser,
  SimpleUserVm,
} from './fixtures/interfaces/simple-user.interface';

describe('Defer', () => {
  const [mapper] = setupPojos('defer');

  it('should map correctly', () => {
    createSimpleUserMetadata();
    mapper
      .createMap<SimpleUser, SimpleUserVm>('SimpleUser', 'SimpleUserVm')
      .forMember(
        (d) => d.fullName,
        mapDefer(() => mapFrom((s) => s.firstName + ' ' + s.lastName))
      );

    const user = {
      firstName: 'Chau',
      lastName: 'Tran',
    } as SimpleUser;

    const vm = mapper.map<SimpleUser, SimpleUserVm>(
      user,
      'SimpleUserVm',
      'SimpleUser'
    );
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });

  it('should map correctly with preCond', () => {
    createSimpleUserMetadata();
    mapper
      .createMap<SimpleUser, SimpleUserVm>('SimpleUser', 'SimpleUserVm')
      .forMember(
        (d) => d.fullName,
        preCondition((s) => s.firstName === 'Phuong'),
        mapDefer(() => mapFrom((s) => s.firstName + ' ' + s.lastName))
      );

    const user = {
      firstName: 'Chau',
      lastName: 'Tran',
    } as SimpleUser;

    let vm = mapper.map<SimpleUser, SimpleUserVm>(
      user,
      'SimpleUserVm',
      'SimpleUser'
    );
    expect(vm.fullName).toEqual(undefined);

    user.firstName = 'Phuong';
    vm = mapper.map<SimpleUser, SimpleUserVm>(
      user,
      'SimpleUserVm',
      'SimpleUser'
    );
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });
});
