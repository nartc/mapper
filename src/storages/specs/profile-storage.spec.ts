import { AutoMapper } from '../../automapper';
import { ProfileBase } from '../../profile-base';
import { profileStorage } from '../profile.storage';

describe('ProfileStorage', () => {
  class FooBarProfile extends ProfileBase {
    constructor() {
      super();
    }
  }

  it('initialize is invoked once when AutoMapper is instantiate', () => {
    const spy = jest.spyOn(profileStorage, 'initialize');
    const mapper = new AutoMapper();
    expect(spy).toHaveBeenCalledWith(mapper);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add is invoked once when AutoMapper.addProfile is invoked', () => {
    const spy = jest.spyOn(profileStorage, 'add');
    const mapper = new AutoMapper();
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
