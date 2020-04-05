import { AutoMapper } from '../../automapper';
import { ProfileBase } from '../../profile-base';

describe('ProfileStorage', () => {
  class FooBarProfile extends ProfileBase {
    constructor() {
      super();
    }
  }

  it('initialize is invoked once when AutoMapper is instantiate', () => {
    const mapper = new AutoMapper();
    const spy = jest.spyOn(mapper.profileStorage, 'initialize');
    mapper.dispose();
    expect(spy).toHaveBeenCalledWith(mapper);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add is invoked once when AutoMapper.addProfile is invoked', () => {
    const mapper = new AutoMapper();
    const spy = jest.spyOn(mapper.profileStorage, 'add');
    mapper.addProfile(FooBarProfile);
    expect(spy).toHaveBeenCalledWith(mapper, {
      profileName: FooBarProfile.name,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add throws exception when AutoMapper.addProfile is invoked twice with same profile', () => {
    const mapper = new AutoMapper();
    expect(() => {
      mapper.addProfile(FooBarProfile).addProfile(FooBarProfile);
    }).toThrowError(
      `${FooBarProfile.name} already exists on this mapper instance`
    );
  });
});
