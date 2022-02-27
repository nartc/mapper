import { setupClasses } from '../setup.spec';
import { SimpleUser } from './fixtures/models/simple-user';
import { selfUserProfile } from './fixtures/profiles/simple-user.profile';

describe('Map - Self Map', () => {
  const [mapper] = setupClasses('selfMap');

  it('should map', () => {
    mapper.addProfile(selfUserProfile);

    const vm = mapper.map(
      {
        firstName: 'Chau',
        lastName: 'Tran',
      },
      SimpleUser,
      SimpleUser
    );
    expect(vm).toBeTruthy();
    expect(vm.firstName).toEqual('Chau');
    expect(vm.lastName).toEqual('Tran');
  });
});
