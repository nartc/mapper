import { setupClasses } from '../setup.spec';
import { SimpleUser, SimpleUserVm } from './fixtures/models/simple-user';
import { simpleUserProfileFactory } from './fixtures/profiles/simple-user.profile';

describe('MapActions', () => {
  const [mapper] = setupClasses('mapActions');

  it('should map with mapping actions', () => {
    const beforeAction = jest.fn();
    const afterAction = jest.fn();

    mapper.addProfile(
      simpleUserProfileFactory({
        beforeMap: beforeAction,
        afterMap: afterAction,
      })
    );

    const simpleUser = new SimpleUser();
    simpleUser.firstName = 'Chau';
    simpleUser.lastName = 'Tran';

    expect(beforeAction).not.toHaveBeenCalled();
    expect(afterAction).not.toHaveBeenCalled();

    const vm = mapper.map(simpleUser, SimpleUserVm, SimpleUser);
    assertVm(simpleUser, vm);

    expect(beforeAction).toHaveBeenCalled();
    expect(afterAction).toHaveBeenCalled();
  });

  it('should map with map actions', () => {
    const beforeAction = jest.fn();
    const afterAction = jest.fn();

    mapper.addProfile(simpleUserProfileFactory());

    const simpleUser = new SimpleUser();
    simpleUser.firstName = 'Chau';
    simpleUser.lastName = 'Tran';

    expect(beforeAction).not.toHaveBeenCalled();
    expect(afterAction).not.toHaveBeenCalled();

    const vm = mapper.map(simpleUser, SimpleUserVm, SimpleUser, {
      beforeMap: beforeAction,
      afterMap: afterAction,
    });
    assertVm(simpleUser, vm);

    expect(beforeAction).toHaveBeenCalled();
    expect(afterAction).toHaveBeenCalled();
  });

  it('should map actions override mapping actions', () => {
    const mappingBeforeAction = jest.fn();
    const mappingAfterAction = jest.fn();
    const beforeAction = jest.fn();
    const afterAction = jest.fn();

    mapper.addProfile(
      simpleUserProfileFactory({
        beforeMap: mappingBeforeAction,
        afterMap: mappingAfterAction,
      })
    );

    const simpleUser = new SimpleUser();
    simpleUser.firstName = 'Chau';
    simpleUser.lastName = 'Tran';

    expect(mappingBeforeAction).not.toHaveBeenCalled();
    expect(mappingAfterAction).not.toHaveBeenCalled();
    expect(beforeAction).not.toHaveBeenCalled();
    expect(afterAction).not.toHaveBeenCalled();

    const vm = mapper.map(simpleUser, SimpleUserVm, SimpleUser, {
      beforeMap: beforeAction,
      afterMap: afterAction,
    });
    assertVm(simpleUser, vm);

    // map actions should override mapping actions
    expect(mappingBeforeAction).not.toHaveBeenCalled();
    expect(mappingAfterAction).not.toHaveBeenCalled();
    expect(beforeAction).toHaveBeenCalled();
    expect(afterAction).toHaveBeenCalled();
  });

  it('should mapArray skip mapping actions', () => {
    const beforeAction = jest.fn();
    const afterAction = jest.fn();

    mapper.addProfile(
      simpleUserProfileFactory({
        beforeMap: beforeAction,
        afterMap: afterAction,
      })
    );

    const simpleUser = new SimpleUser();
    simpleUser.firstName = 'Chau';
    simpleUser.lastName = 'Tran';

    const vms = mapper.mapArray([simpleUser], SimpleUserVm, SimpleUser);
    vms.forEach((vm) => {
      assertVm(simpleUser, vm);
    });

    expect(beforeAction).not.toHaveBeenCalled();
    expect(afterAction).not.toHaveBeenCalled();
  });

  it('should mapArray allow for map actions', () => {
    const beforeAction = jest.fn();
    const afterAction = jest.fn();

    mapper.addProfile(simpleUserProfileFactory());

    const simpleUser = new SimpleUser();
    simpleUser.firstName = 'Chau';
    simpleUser.lastName = 'Tran';

    const vms = mapper.mapArray([simpleUser], SimpleUserVm, SimpleUser, {
      beforeMap: beforeAction,
      afterMap: afterAction,
    });
    vms.forEach((vm) => {
      assertVm(simpleUser, vm);
    });

    expect(beforeAction).toHaveBeenCalledWith([simpleUser], []);
    expect(afterAction).toHaveBeenCalledWith([simpleUser], vms);
  });

  function assertVm(user: SimpleUser, vm: SimpleUserVm) {
    expect(vm.firstName).toEqual(user.firstName);
    expect(vm.lastName).toEqual(user.lastName);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  }
});
