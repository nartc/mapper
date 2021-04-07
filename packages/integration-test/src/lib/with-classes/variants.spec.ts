import { mapFrom } from '@automapper/core';
import { setupClasses } from '../setup.spec';
import { SimpleUserVm } from './fixtures/models/simple-user';
import {
  UserWithGetter,
  UserWithOnlyGetter,
  UserWithReturnKeyword,
  UserWithReturnKeywordVm,
} from './fixtures/models/user-variants';

describe('Variants', () => {
  const [mapper] = setupClasses('variants');

  it('should map with model with getters', () => {
    mapper.createMap(UserWithGetter, SimpleUserVm).forMember(
      (d) => d.fullName,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );

    const user = new UserWithGetter();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    const vm = mapper.map(user, SimpleUserVm, UserWithGetter);
    expect(vm.firstName).toEqual(user.firstName);
    expect(vm.lastName).toEqual(user.lastName);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });

  it('should map with model with ONLY getters', () => {
    mapper.createMap(UserWithOnlyGetter, SimpleUserVm).forMember(
      (d) => d.fullName,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );

    const user = new UserWithOnlyGetter();
    user.setFirstName('Chau').setLastName('Tran');

    const vm = mapper.map(user, SimpleUserVm, UserWithOnlyGetter);
    expect(vm.firstName).toEqual(user.firstName);
  });

  it('should map with model with properties with return keyword', () => {
    mapper
      .createMap(UserWithReturnKeyword, UserWithReturnKeywordVm)
      .forMember(
        (d) => {
          return d.returnReturnFirst;
        },
        mapFrom((s) => {
          return s.returnFirstName;
        })
      )
      .forMember(
        function (d) {
          return d.returnReturnLast;
        },
        mapFrom(function (s) {
          return s.returnLastName;
        })
      )
      .forMember(
        (d) => {
          return d.returnReturnFull;
        },
        mapFrom(function (s) {
          return s.returnFirstName + ' ' + s.returnLastName;
        })
      );

    const user = new UserWithReturnKeyword();
    user.returnFirstName = 'Chau';
    user.returnLastName = 'Tran';

    const vm = mapper.map(user, UserWithReturnKeywordVm, UserWithReturnKeyword);
    expect(vm.returnReturnFirst).toEqual(user.returnFirstName);
    expect(vm.returnReturnLast).toEqual(user.returnLastName);
    expect(vm.returnReturnFull).toEqual(
      user.returnFirstName + ' ' + user.returnLastName
    );
  });
});
