import { mapFrom } from '@automapper/core';
import { setupPojos } from '../setup.spec';
import {
  createUserVariantsMetadata,
  UserWithReturnKeyword,
  UserWithReturnKeywordVm,
} from './fixtures/interfaces/user-variants.interface';

describe('Variants', () => {
  const [mapper] = setupPojos('variants');

  it('should map with model with properties with return keyword', () => {
    createUserVariantsMetadata();
    mapper
      .createMap<UserWithReturnKeyword, UserWithReturnKeywordVm>(
        'UserWithReturnKeyword',
        'UserWithReturnKeywordVm'
      )
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

    const user = {
      returnFirstName: 'Chau',
      returnLastName: 'Tran',
    } as UserWithReturnKeyword;

    const vm = mapper.map<UserWithReturnKeyword, UserWithReturnKeywordVm>(
      user,
      'UserWithReturnKeywordVm',
      'UserWithReturnKeyword'
    );
    expect(vm.returnReturnFirst).toEqual(user.returnFirstName);
    expect(vm.returnReturnLast).toEqual(user.returnLastName);
    expect(vm.returnReturnFull).toEqual(
      user.returnFirstName + ' ' + user.returnLastName
    );
  });
});
