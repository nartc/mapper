import { AutoMapper, Mapper, ProfileBase } from '../src';

describe('ErrorHandler', () => {
  class Foo {
    foo!: string;
  }

  class FooVm {
    fooVm!: string;
  }

  class ProfileA extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(Foo, FooVm);
    }
  }

  it('should call handleError', () => {
    Mapper.withGlobalSettings({ throwError: false });
    const spiedConsole = jest.spyOn(console, 'warn').mockImplementation();
    Mapper.addProfile(ProfileA).addProfile(ProfileA);
    expect(spiedConsole).toHaveBeenCalled();
    Mapper.dispose();
    spiedConsole.mockClear();
  });

  it('should throw', () => {
    Mapper.withGlobalSettings({ throwError: true });
    expect(() => Mapper.addProfile(ProfileA).addProfile(ProfileA)).toThrow();
    Mapper.dispose();
  });
});
