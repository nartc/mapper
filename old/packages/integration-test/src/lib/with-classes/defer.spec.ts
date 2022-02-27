import { mapDefer, mapFrom, preCondition } from '@automapper/core';
import { setupClasses } from '../setup.spec';
import { SimpleUser, SimpleUserVm } from './fixtures/models/simple-user';

describe('Defer', () => {
  const [mapper] = setupClasses('defer');

  it('should map correctly', () => {
    mapper.createMap(SimpleUser, SimpleUserVm).forMember(
      (d) => d.fullName,
      mapDefer(() =>
        mapFrom<SimpleUser, SimpleUserVm>((s) => s.firstName + ' ' + s.lastName)
      )
    );

    const user = new SimpleUser();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    const vm = mapper.map(user, SimpleUserVm, SimpleUser);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });

  it('should map correctly with preCond', () => {
    mapper.createMap(SimpleUser, SimpleUserVm).forMember(
      (d) => d.fullName,
      preCondition((s) => s.firstName === 'Phuong'),
      mapDefer(() =>
        mapFrom<SimpleUser, SimpleUserVm>((s) => s.firstName + ' ' + s.lastName)
      )
    );

    const user = new SimpleUser();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    let vm = mapper.map(user, SimpleUserVm, SimpleUser);
    expect(vm.fullName).toEqual(undefined);

    user.firstName = 'Phuong';
    vm = mapper.map(user, SimpleUserVm, SimpleUser);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });
});
