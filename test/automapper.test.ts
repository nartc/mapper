import {
  AutoMap,
  fromValue,
  ignore,
  MapAction,
  mapFrom,
  Mapper,
  mapWith,
  preCondition,
} from '../src';
import {
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '../src/conventions';
import { Address, AddressVm } from './fixtures/models/address';
import { Avatar, AvatarVm, OtherAvatar } from './fixtures/models/avatar';
import { Bar, BarWithFoo, BarWithFooZeroDepth } from './fixtures/models/bar';
import { Base, BaseVm } from './fixtures/models/base';
import {
  Foo,
  FooWithBar,
  FooWithBarZeroDepth,
  FooWithBase,
  FooWithBaseVm,
  FooWithReturn,
  FooWithReturnVm,
} from './fixtures/models/foo';
import { CamelCaseJob, SnakeCaseJob } from './fixtures/models/job';
import {
  EmptyProfile,
  EmptyProfileVm,
  Profile,
  ProfileVm,
  ProfileWithAvatar,
  ProfileWithAvatarVm,
  ProfileWithMissingMetadata,
  ProfileWithMissingMetadataVm,
} from './fixtures/models/profile';
import {
  CamelCaseUser,
  ComplexUser,
  ComplexUserVm,
  PascalCaseUserVm,
  SnakeCaseUser,
  SnakeCaseUserVm,
  User,
  UserInformation,
  UserVm,
  UserVmWithBase,
  UserWithAbstractBase,
  UserWithAbstractBaseVm,
  UserWithBase,
  UserWithEmptyProfile,
  UserWithEmptyProfileVm,
  UserWithGetter,
} from './fixtures/models/user';
import { AddressProfile } from './fixtures/profiles/address.profile';
import { AvatarProfile } from './fixtures/profiles/avatar.profile';
import { BaseProfile } from './fixtures/profiles/base.profile';
import { FooProfile } from './fixtures/profiles/foo.profile';
import {
  EmptyProfileProfile,
  ProfileProfile,
} from './fixtures/profiles/profile.profile';
import {
  ComplexUserProfile,
  UserProfile,
  UserWithEmptyProfileProfile,
} from './fixtures/profiles/user.profile';

describe('AutoMapper Integration - Create Map', () => {
  afterEach(Mapper.dispose.bind(Mapper));

  it('should create mapping', () => {
    expect(Mapper.getMapping(User, UserVm)).toBeUndefined();
    Mapper.createMap(User, UserVm);
    expect(Mapper.getMapping(User, UserVm)).toBeTruthy();
  });

  it('should throw error when adding a pair of models twice', () => {
    Mapper.createMap(User, UserVm);
    expect(() => {
      Mapper.createMap(User, UserVm);
    }).toThrowError(
      new Error(
        `Mapping for source ${User.toString()} and destination ${UserVm.toString()} already exists`
      )
    );
  });
});

describe('AutoMapper Integration - WithGlobalSettings', () => {
  let user: SnakeCaseUser;

  beforeAll(() => {
    user = new SnakeCaseUser();
    user.first_name = 'Chau';
    user.last_name = 'Tran';
    user.some_long_property = 10;
    user.job = new SnakeCaseJob();
    user.job.title = 'Developer';
    user.job.annual_salary = 10000;
  });

  afterEach(Mapper.dispose.bind(Mapper));

  it('should have snake case applied', () => {
    Mapper.withGlobalSettings({
      sourceNamingConvention: SnakeCaseNamingConvention,
    });
    Mapper.createMap(SnakeCaseUser, SnakeCaseUserVm);

    const vm = Mapper.map(user, SnakeCaseUserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(SnakeCaseUserVm);
    expect(vm.firstName).toBe(user.first_name);
    expect(vm.lastName).toBe(user.last_name);
    expect(vm.someLongProperty).toBe(user.some_long_property);
    expect(vm.jobTitle).toBe(user.job.title);
    expect(vm.jobAnnualSalary).toBe(user.job.annual_salary);
  });

  it('should have pascal case applied', () => {
    Mapper.withGlobalSettings({
      sourceNamingConvention: SnakeCaseNamingConvention,
      destinationNamingConvention: PascalCaseNamingConvention,
    });
    Mapper.createMap(SnakeCaseUser, PascalCaseUserVm);
    const vm = Mapper.map(user, PascalCaseUserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(PascalCaseUserVm);
    expect(vm.FirstName).toBe(user.first_name);
    expect(vm.LastName).toBe(user.last_name);
    expect(vm.SomeLongProperty).toBe(user.some_long_property);
    expect(vm.JobTitle).toBe(user.job.title);
    expect(vm.JobAnnualSalary).toBe(user.job.annual_salary);
  });

  it('should use default camel case', () => {
    Mapper.withGlobalSettings({
      destinationNamingConvention: PascalCaseNamingConvention,
    });
    Mapper.createMap(CamelCaseUser, PascalCaseUserVm);
    const camelCaseUser = new CamelCaseUser();
    camelCaseUser.firstName = 'Chau';
    camelCaseUser.lastName = 'Tran';
    camelCaseUser.someLongProperty = 10;
    camelCaseUser.job = new CamelCaseJob();
    camelCaseUser.job.title = 'Developer';
    camelCaseUser.job.annualSalary = 10000;
    const vm = Mapper.map(camelCaseUser, PascalCaseUserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(PascalCaseUserVm);
    expect(vm.FirstName).toBe(camelCaseUser.firstName);
    expect(vm.LastName).toBe(camelCaseUser.lastName);
    expect(vm.SomeLongProperty).toBe(camelCaseUser.someLongProperty);
    expect(vm.JobTitle).toBe(camelCaseUser.job.title);
    expect(vm.JobAnnualSalary).toBe(camelCaseUser.job.annualSalary);
  });
});

describe('AutoMapper Integration - Map', () => {
  let complexUser: ComplexUser;
  let user: User;

  beforeAll(() => {
    user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    complexUser = new ComplexUser();
    complexUser.firstName = 'Chau';
    complexUser.lastName = 'Tran';
    complexUser.profile = new Profile();
    complexUser.profile.bio = 'Developer';
    complexUser.profile.birthday = new Date('10/14/1991');
    complexUser.profile.avatar = new Avatar();
    complexUser.profile.avatar.source = 'Internet';
    complexUser.profile.avatar.url = 'url.com';
    complexUser.profile.avatar.forCondition = false;
    complexUser.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addr = new Address();
        addr.street = 'Street ' + index + 1;
        addr.city = 'City ' + index + 1;
        addr.state = 'State ' + index + 1;
        return addr;
      });
  });

  beforeEach(() => {
    Mapper.addProfile(UserProfile)
      .addProfile(ComplexUserProfile)
      .addProfile(AddressProfile)
      .addProfile(AvatarProfile)
      .addProfile(ProfileProfile);
  });
  afterEach(Mapper.dispose.bind(Mapper));

  it('should map fullName to firstName and lastName', () => {
    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(vm.firstName).toEqual(user.firstName);
    expect(vm.lastName).toEqual(user.lastName);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });

  it('should map to another destination with same source', () => {
    const vm = Mapper.map(user, UserInformation);
    const testVm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(testVm).toBeTruthy();
  });

  it('should defer map when lastName is Ngo', () => {
    const anotherUser = new User();
    anotherUser.firstName = 'Phuong';
    anotherUser.lastName = 'Ngo';
    const vm = Mapper.map(anotherUser, UserVm);
    expect(vm).toBeTruthy();
    expect(vm.lastName).toBe(anotherUser.lastName);
    expect(vm.firstName).not.toBe(anotherUser.firstName);
    expect(vm.firstName).toBe('Chau');
    expect(vm.fullName).toBe('Chau Ngo');
  });

  it('should map complex User to complex UserVm', () => {
    complexUser.profile.avatar.shouldIgnore = 6;

    const vm = Mapper.map(complexUser, ComplexUserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(ComplexUserVm);
    expect(vm.first).toEqual(complexUser.firstName);
    expect(vm.last).toEqual(complexUser.lastName);
    expect(vm.full).toEqual(complexUser.firstName + ' ' + complexUser.lastName);

    expect(vm.profile).toBeTruthy();
    expect(vm.profile).toBeInstanceOf(ProfileVm);
    expect(vm.profile.bio).toEqual(complexUser.profile.bio);

    expect(vm.profile.avatar).toBeTruthy();
    expect(vm.profile.avatar).toBeInstanceOf(AvatarVm);
    expect(vm.profile.avatar.ignored).toBeNull();
    expect(vm.profile.avatar.url).toEqual(complexUser.profile.avatar.source);
    expect(vm.profile.avatar.forCondition).toEqual(false);
    expect(vm.profile.avatar.shouldBeSubstituted).toEqual('sub');

    expect(vm.profile.addresses).toBeTruthy();
    expect(vm.profile.addresses).toHaveLength(
      complexUser.profile.addresses.length
    );
    vm.profile.addresses.forEach((address, index) => {
      expect(address).toBeTruthy();
      expect(address).toBeInstanceOf(AddressVm);
      const { street, city, state } = complexUser.profile.addresses[index];
      expect(address.formattedAddress).toEqual(`${street} ${city} ${state}`);
    });
  });

  it('should mapAsync', async () => {
    complexUser.profile.avatar.shouldIgnore = 6;

    const vm = await Mapper.mapAsync(complexUser, ComplexUserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(ComplexUserVm);
    expect(vm.first).toEqual(complexUser.firstName);
    expect(vm.last).toEqual(complexUser.lastName);
    expect(vm.full).toEqual(complexUser.firstName + ' ' + complexUser.lastName);

    expect(vm.profile).toBeTruthy();
    expect(vm.profile).toBeInstanceOf(ProfileVm);
    expect(vm.profile.bio).toEqual(complexUser.profile.bio);

    expect(vm.profile.avatar).toBeTruthy();
    expect(vm.profile.avatar).toBeInstanceOf(AvatarVm);
    expect(vm.profile.avatar.ignored).toBeNull();
    expect(vm.profile.avatar.url).toEqual(complexUser.profile.avatar.source);
    expect(vm.profile.avatar.forCondition).toEqual(false);
    expect(vm.profile.avatar.shouldBeSubstituted).toEqual('sub');

    expect(vm.profile.addresses).toBeTruthy();
    expect(vm.profile.addresses).toHaveLength(
      complexUser.profile.addresses.length
    );
    vm.profile.addresses.forEach((address, index) => {
      expect(address).toBeTruthy();
      expect(address).toBeInstanceOf(AddressVm);
      const { street, city, state } = complexUser.profile.addresses[index];
      expect(address.formattedAddress).toEqual(`${street} ${city} ${state}`);
    });
  });

  it('should map complex User to complex UserVm - pre(condition) with default value when shouldIgnore <= 5', () => {
    complexUser.profile.avatar.shouldIgnore = 5;

    const vm = Mapper.map(complexUser, ComplexUserVm);
    expect(vm.profile.avatar.url).toEqual('default url');
    expect(vm.profile.avatar.forCondition).toEqual(true);
  });

  it('should map complex User to complex UserVm - shouldBeSubstituted should pertain value when provided', () => {
    complexUser.profile.avatar.shouldBeSubstituted = 'will not sub';
    const vm = Mapper.map(complexUser, ComplexUserVm);
    expect(vm.profile.avatar.shouldBeSubstituted).toEqual('will not sub');
  });

  it('should mapArray', () => {
    const vms = Mapper.mapArray([user, user], UserVm);
    expect(vms).toBeTruthy();
    expect(vms).toHaveLength(2);
    vms.forEach(vm => {
      expect(vm).toBeTruthy();
      expect(vm).toBeInstanceOf(UserVm);
    });
  });

  it('should mapArrayAsync', async () => {
    const vms = await Mapper.mapArrayAsync([user, user], UserVm);
    expect(vms).toBeTruthy();
    expect(vms).toHaveLength(2);
    vms.forEach(vm => {
      expect(vm).toBeTruthy();
      expect(vm).toBeInstanceOf(UserVm);
    });
  });

  it('should return empty array when mapArray with empty Array', () => {
    const vms = Mapper.mapArray([], UserVm, User);
    expect(vms).toBeTruthy();
    expect(vms).toHaveLength(0);
  });

  it('should return empty array when mapArrayAsync with empty Array', async () => {
    const vms = await Mapper.mapArrayAsync([], UserVm, User);
    expect(vms).toBeTruthy();
    expect(vms).toHaveLength(0);
  });

  it('should map correctly with all parameters provided', () => {
    const before = jest.fn();
    const after = jest.fn();
    const vm = Mapper.map(user, UserVm, User, {
      beforeMap: before,
      afterMap: after,
    });
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(before).toHaveBeenCalled();
    expect(after).toHaveBeenCalled();
  });

  it('should throw error when map without mapping', () => {
    const foo = new Foo();
    foo.foo = 'foo';
    expect(() => {
      Mapper.map(foo, Bar);
    }).toThrowError(
      new Error(
        `Mapping not found for source ${Foo.toString()} and destination ${Bar.toString()}`
      )
    );
  });

  it('should throw manual map error when missing metadata on complex Array', () => {
    Mapper.createMap(ProfileWithMissingMetadata, ProfileWithMissingMetadataVm);
    const profile = new ProfileWithMissingMetadata();
    profile.bio = 'Developer';
    profile.birthday = new Date();
    profile.addresses = Array.from({ length: 2 }).map(() => {
      const addr = new Address();
      addr.street = 'street';
      return addr;
    });
    expect(() => {
      Mapper.map(profile, ProfileWithMissingMetadataVm);
    }).toThrowError(
      `Metadata for addresses is a primitive or Array. Consider manual map this property`
    );
  });

  it('should map empty array when element is null or empty', () => {
    Mapper.createMap(ProfileWithMissingMetadata, ProfileWithMissingMetadataVm);
    const profile = new ProfileWithMissingMetadata();
    profile.bio = null as any;
    profile.skills = ['1', '2'];
    profile.addresses = Array.from({ length: 2 }).map(() => new Address());
    const vm = Mapper.map(profile, ProfileWithMissingMetadataVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(ProfileWithMissingMetadataVm);
    expect(vm.bio).toBeNull();
    expect(vm.skills).toEqual(profile.skills);
    expect(vm.addresses).toEqual([]);
  });

  it('should throw missing mapping error when nested key mapping has not been created', () => {
    Mapper.createMap(ProfileWithAvatar, ProfileWithAvatarVm);
    const profile = new ProfileWithAvatar();
    profile.bio = 'Developer';
    profile.avatars = Array.from({ length: 2 }).map(() => {
      const avatar = new OtherAvatar();
      avatar.url = 'google.com';
      avatar.source = 'internet';
      return avatar;
    });
    expect(() => {
      Mapper.map(profile, ProfileWithAvatarVm);
    }).toThrowError(
      'Mapping for avatars cannot be found. Consider manual map this property with MapWith'
    );
  });
});

describe('AutoMapper Integration - Various Syntax', () => {
  beforeAll(() => {
    Mapper.createMap(FooWithReturn, FooWithReturnVm)
      .forMember(
        d => {
          return d.returnFooVm;
        },
        mapFrom(function (s) {
          return s.returnFoo;
        })
      )
      .reverseMap();
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map properly', () => {
    const foo = new FooWithReturn();
    foo.returnFoo = 'foo';
    const vm = Mapper.map(
      { returnFoo: 'foo', foos: ['string'] },
      FooWithReturnVm,
      FooWithReturn
    );
    expect(vm).toBeTruthy();
    expect(vm.returnFooVm).toBe(foo.returnFoo);
  });

  it('should reverseMap properly', () => {
    const vm = new FooWithReturnVm();
    vm.returnFooVm = 'bar';
    const foo = Mapper.map(vm, FooWithReturn);
    expect(foo).toBeTruthy();
    expect(foo.returnFoo).toBe(vm.returnFooVm);
  });
});

describe('AutoMapper Integration - Public Getter Setter', () => {
  beforeAll(() => {
    Mapper.createMap(UserWithGetter, UserVm).forMember(
      d => d.fullName,
      mapFrom(s => s.firstName + ' ' + s.lastName)
    );
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map properly', () => {
    const user = new UserWithGetter();
    user.firstName = 'Chau';
    user.lastName = 'Tran';
    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm.firstName).toBe(user.firstName);
    expect(vm.lastName).toBe(user.lastName);
    expect(vm.fullName).toBe(user.firstName + ' ' + user.lastName);
  });
});

describe('AutoMapper Integration - Callback', () => {
  const beforeCallback: MapAction = jest.fn();
  const afterCallback: MapAction = jest.fn();
  beforeAll(() => {
    Mapper.createMap(User, UserVm)
      .forMember(
        d => d.fullName,
        mapFrom(s => s.firstName + ' ' + s.lastName)
      )
      .beforeMap(beforeCallback)
      .afterMap(afterCallback)
      .reverseMap()
      .beforeMap(beforeCallback)
      .afterMap(afterCallback);

    Mapper.createMap(Address, AddressVm)
      .forMember(d => d.formattedAddress, fromValue('some street'))
      .afterMap(afterCallback)
      .reverseMap()
      .forPath(s => s.street, ignore())
      .forPath(s => s.city, ignore())
      .forPath(s => s.state, ignore())
      .afterMap(afterCallback);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('mapping level callbacks should be invoked', () => {
    const user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';
    const vm = Mapper.map(user, UserVm);
    expect(beforeCallback).toBeCalledTimes(1);
    expect(afterCallback).toBeCalledTimes(1);
    Mapper.map(vm, User);
    expect(beforeCallback).toBeCalledTimes(2);
    expect(afterCallback).toBeCalledTimes(2);
  });

  it('map level callbacks should override mapping level', () => {
    const user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    const before = jest.fn();
    const after = jest.fn();

    const vm = Mapper.map(user, UserVm, { beforeMap: before, afterMap: after });
    expect(before).toBeCalledTimes(1);
    expect(beforeCallback).not.toBeCalledTimes(3);
    expect(after).toBeCalledTimes(1);
    expect(afterCallback).not.toBeCalledTimes(3);
    Mapper.map(vm, User, { beforeMap: before, afterMap: after });
    expect(before).toBeCalledTimes(2);
    expect(beforeCallback).not.toBeCalledTimes(3);
    expect(after).toBeCalledTimes(2);
    expect(afterCallback).not.toBeCalledTimes(3);
  });

  it('map level callbacks should be invoked for mapArray', () => {
    const user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';
    const user2 = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';

    const before = jest.fn();
    const after = jest.fn();
    const vms = Mapper.mapArray([user, user2], UserVm, {
      beforeMap: before,
      afterMap: after,
    });
    expect(vms).toBeTruthy();
    expect(before).toHaveBeenCalled();
    expect(after).toHaveBeenCalled();
  });

  it('mapping level callbacks only invoke what provided', () => {
    const address = new Address();
    const vm = Mapper.map(address, AddressVm);
    expect(beforeCallback).toBeCalledTimes(2);
    expect(afterCallback).toBeCalledTimes(3);
    Mapper.map(vm, Address);
    expect(beforeCallback).toBeCalledTimes(2);
    expect(afterCallback).toBeCalledTimes(4);
  });
});

describe('AutoMapper Integration - ReverseMap', () => {
  beforeAll(() => {
    Mapper.addProfile(AvatarProfile)
      .addProfile(AddressProfile)
      .addProfile(ProfileProfile)
      .addProfile(ComplexUserProfile);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should reverse map', () => {
    const vm = new ComplexUserVm();
    vm.first = 'Chau';
    vm.last = 'Tran';
    vm.full = 'Chau Tran';
    vm.profile = new ProfileVm();
    vm.profile.bio = 'Developer';
    vm.profile.avatar = new AvatarVm();
    vm.profile.avatar.url = 'google.com';
    vm.profile.avatar.forCondition = false;
    vm.profile.avatar.shouldBeSubstituted = 'sub';
    vm.profile.avatar.ignored = 5;

    vm.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addressVm = new AddressVm();
        addressVm.formattedAddress = `Street ${index} City ${index} State ${index}`;
        return addressVm;
      });

    const user = Mapper.map(vm, ComplexUser);
    expect(user).toBeTruthy();
  });

  it('should return mapping if reverseMap is called after createMap', () => {
    Mapper.createMap(UserVm, User);
    const mapping = Mapper.getMapping(UserVm, User);
    expect(mapping).toBeTruthy();
    Mapper.createMap(User, UserVm).reverseMap();
    const sameMapping = Mapper.getMapping(UserVm, User);
    expect(sameMapping).toEqual(mapping);
  });
});

describe('AutoMapper Integration - Inheritance', () => {
  beforeAll(() => {
    Mapper.addProfile(BaseProfile);
    Mapper.createMap(UserWithBase, UserVmWithBase, {
      includeBase: [Base, BaseVm],
    })
      .forMember(
        d => d.first,
        mapFrom(s => s.firstName)
      )
      .forMember(
        d => d.last,
        mapFrom(s => s.lastName)
      )
      .forMember(
        d => d.full,
        mapFrom(s => `${s.firstName} ${s.lastName}`)
      )
      .forMember(
        d => d.aboutMe,
        mapFrom(s => s.about)
      )
      .reverseMap();

    // Test empty includeBase. TypeScript will not allow but needed to test regardless.
    Mapper.createMap(User, UserVm, { includeBase: [] as any });
    // Test includeBase without having previously created mapping for bases.
    Mapper.createMap(Avatar, AvatarVm, { includeBase: [Avatar, AvatarVm] });
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map with inheritance', () => {
    const user = new UserWithBase();
    user.firstName = 'Chau';
    user.lastName = 'Tran';
    user.about = 'Developer';
    user.createdDate = new Date();
    user.updatedDate = new Date();
    user.id = '123';

    const vm = Mapper.map(user, UserVmWithBase);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVmWithBase);
    expect(vm.first).toBe(user.firstName);
    expect(vm.last).toBe(user.lastName);
    expect(vm.full).toBe(`${user.firstName} ${user.lastName}`);
    expect(vm.aboutMe).toBe(user.about);
    expect(vm.created).toBe(user.createdDate);
    expect(vm.updated).toBe(user.updatedDate);
    expect(vm.recordId).toBe(user.id);
  });

  it('should reverseMap with inheritance', () => {
    const vm = new UserVmWithBase();
    vm.first = 'Chau';
    vm.last = 'Tran';
    vm.aboutMe = 'Developer';
    vm.recordId = '1234';
    vm.created = new Date();
    vm.updated = new Date();

    const user = Mapper.map(vm, UserWithBase);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(UserWithBase);
    expect(user.firstName).toBe(vm.first);
    expect(user.lastName).toBe(vm.last);
    expect(user.about).toBe(vm.aboutMe);
    expect(user.id).toBe(vm.recordId);
    expect(user.createdDate).toEqual(vm.created);
    expect(user.updatedDate).toEqual(vm.updated);
  });
});

describe('AutoMapper Integration - PlainObject', () => {
  const addProfiles = () => {
    Mapper.addProfile(AvatarProfile)
      .addProfile(AddressProfile)
      .addProfile(ProfileProfile)
      .addProfile(ComplexUserProfile);
  };

  afterEach(Mapper.dispose.bind(Mapper));

  it('should map complex plain object', () => {
    addProfiles();
    const complexUser = new ComplexUser();
    complexUser.firstName = 'Chau';
    complexUser.lastName = 'Tran';
    complexUser.profile = new Profile();
    complexUser.profile.bio = 'Developer';
    complexUser.profile.birthday = new Date('10/14/1991');
    complexUser.profile.avatar = new Avatar();
    complexUser.profile.avatar.source = 'Internet';
    complexUser.profile.avatar.url = 'url.com';
    complexUser.profile.avatar.forCondition = false;
    complexUser.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addr = new Address();
        addr.street = 'Street ' + index + 1;
        addr.city = 'City ' + index + 1;
        addr.state = 'State ' + index + 1;
        return addr;
      });
    const plain = JSON.parse(JSON.stringify(complexUser));
    const vm = Mapper.map(plain, ComplexUserVm, ComplexUser);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(ComplexUserVm);
  });

  it('should reverse map complex plain object', () => {
    addProfiles();
    const vm = new ComplexUserVm();
    vm.first = 'Chau';
    vm.last = 'Tran';
    vm.full = 'Chau Tran';
    vm.profile = new ProfileVm();
    vm.profile.bio = 'Developer';
    vm.profile.avatar = new AvatarVm();
    vm.profile.avatar.url = 'google.com';
    vm.profile.avatar.forCondition = false;
    vm.profile.avatar.shouldBeSubstituted = 'sub';
    vm.profile.avatar.ignored = 5;

    vm.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addressVm = new AddressVm();
        addressVm.formattedAddress = `Street ${index} City ${index} State ${index}`;
        return addressVm;
      });
    const plainVm = JSON.parse(JSON.stringify(vm));
    const user = Mapper.map(plainVm, ComplexUser, ComplexUserVm);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(ComplexUser);
  });
});

describe('AutoMapper Integration - Empty Model', () => {
  beforeEach(() => {
    Mapper.addProfile(BaseProfile)
      .addProfile(EmptyProfileProfile)
      .addProfile(UserWithEmptyProfileProfile);
  });

  afterEach(Mapper.dispose.bind(Mapper));

  it('should map properly', () => {
    const emptyProfile = new EmptyProfile();
    emptyProfile.id = '123';
    emptyProfile.createdDate = new Date();
    emptyProfile.updatedDate = new Date();
    const vm = Mapper.map(emptyProfile, EmptyProfileVm);
    expect(vm).toBeTruthy();
  });

  it('should map plain object properly', () => {
    const emptyProfile: EmptyProfile = {
      id: '123',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    const vm = Mapper.map(emptyProfile, EmptyProfileVm, EmptyProfile);
    expect(vm).toBeTruthy();
  });

  it('should map when nested', () => {
    const user = new UserWithEmptyProfile();
    user.name = 'Chau';
    user.profile = new EmptyProfile();
    user.profile.id = '123';
    user.profile.createdDate = new Date();
    user.profile.updatedDate = new Date();
    const vm = Mapper.map(user, UserWithEmptyProfileVm);
    expect(vm).toBeTruthy();
  });

  it('should map plain object when nested properly', () => {
    const user: UserWithEmptyProfile = {
      name: 'Chau',
      profile: {
        id: '123',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    };
    const vm = Mapper.map(user, UserWithEmptyProfileVm, UserWithEmptyProfile);
    expect(vm).toBeTruthy();
  });
});

describe('AutoMapper Integration - useUndefined', () => {
  afterEach(Mapper.dispose.bind(Mapper));

  it('should use undefined with global settings', () => {
    Mapper.withGlobalSettings({ useUndefined: true });
    Mapper.addProfile(UserProfile);
    const user = {};
    const vm = Mapper.map(user, UserVm, User);
    expect(vm).toBeTruthy();
    expect(vm.firstName).toBeUndefined();
    expect(vm.lastName).toBeUndefined();
  });

  it('should use undefined with create map', () => {
    Mapper.createMap(User, UserVm, { useUndefined: true }).forMember(
      d => d.fullName,
      ignore()
    );
    const user = {};
    const vm = Mapper.map(user, UserVm, User);
    expect(vm).toBeTruthy();
    expect(vm.firstName).toBeUndefined();
    expect(vm.lastName).toBeUndefined();
    expect(vm.fullName).toBeUndefined();
  });
});

describe('AutoMapper Integration - mapping boolean', () => {
  class Foo {
    @AutoMap()
    bar!: boolean;
  }

  beforeAll(() => {
    Mapper.createMap(Foo, Foo);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map', () => {
    const vm = Mapper.map({ bar: false }, Foo, Foo);
    expect(vm).toBeTruthy();
    expect(vm.bar).toEqual(false);
  });
});

describe('AutoMapper Integration - mapping falsy string', () => {
  class ProductGood {
    @AutoMap() id!: number;
    @AutoMap() guid!: string;
    @AutoMap() brand!: string;
    @AutoMap() description!: string;
    @AutoMap() name!: string;
    @AutoMap() quantity!: number;
  }

  class Category {
    @AutoMap() id!: number;
    @AutoMap() guid!: string;
    @AutoMap() name!: string;
    @AutoMap() description!: string;
  }

  class Product {
    @AutoMap() id!: number;
    @AutoMap() guid!: string;
    @AutoMap() imageUrl!: string;
    @AutoMap() isBundle!: boolean;
    @AutoMap() name!: string;
    @AutoMap() price!: string;
    @AutoMap(() => Category) category!: Category | null;
    @AutoMap() description!: string;
    @AutoMap(() => ProductGood) goods!: ProductGood[];
  }

  class Cart {
    @AutoMap() id!: number;
    @AutoMap() guid!: string;
    @AutoMap(() => Product) products!: Product[];
    @AutoMap() subTotal!: string;
    @AutoMap() status!: number; // TODO: ?
  }

  beforeAll(() => {
    Mapper.createMap(ProductGood, ProductGood);
    Mapper.createMap(Category, Category);
    Mapper.createMap(Product, Product);
    Mapper.createMap(Cart, Cart);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map', () => {
    const vm = Mapper.map(
      {
        id: 0,
        products: [],
        guid: '',
        subTotal: '0.00',
        status: 0,
      },
      Cart,
      Cart
    );
    expect(vm).toBeTruthy();
    expect(vm.id).toEqual(0);
    expect(vm.products).toEqual([]);
    expect(vm.guid).toEqual('');
    expect(vm.subTotal).toEqual('0.00');
    expect(vm.status).toEqual(0);
  });
});

describe('AutoMapper Integration - Circular Dependency', () => {
  class Foo {
    bar!: Bar;
  }

  class Bar {
    foo!: Foo | null;
  }

  beforeAll(() => {
    Mapper.createMap(Bar, Bar).forMember(
      d => d.foo,
      mapWith(
        Foo,
        s => s.foo,
        () => Foo
      )
    );
    Mapper.createMap(Foo, Foo).forMember(
      d => d.bar,
      mapWith(
        Bar,
        s => s.bar,
        () => Bar
      )
    );
    Mapper.createMap(BarWithFoo, BarWithFoo);
    Mapper.createMap(FooWithBar, FooWithBar);
    Mapper.createMap(BarWithFooZeroDepth, BarWithFooZeroDepth);
    Mapper.createMap(FooWithBarZeroDepth, FooWithBarZeroDepth);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map with depth of 1', () => {
    const vm = Mapper.map(
      { id: '1', bar: { foo: { id: '2', bar: null }, id: '1' } },
      FooWithBar,
      FooWithBar
    );
    expect(vm).toBeTruthy();
    expect(vm.id).toEqual('1');
    expect(vm.bar).toBeInstanceOf(BarWithFoo);
    expect(vm.bar?.foo).toBeInstanceOf(FooWithBar);
  });

  it('should map with depth of 0', () => {
    const vm = Mapper.map(
      { id: '1', bar: { foo: { id: '2', bar: null }, id: '1' } },
      FooWithBarZeroDepth,
      FooWithBarZeroDepth
    );
    expect(vm).toBeTruthy();
    expect(vm.id).toEqual('1');
    expect(vm.bar).toBeInstanceOf(BarWithFooZeroDepth);
    expect(vm.bar?.foo).toBeInstanceOf(FooWithBarZeroDepth);
  });

  it('should map with mapWith', () => {
    const vm = Mapper.map({ bar: { foo: null } }, Foo, Foo);
    expect(vm).toBeTruthy();
    expect(vm.bar).toBeInstanceOf(Bar);
  });
});

describe('AutoMapper Integration - Abstract Class', () => {
  beforeAll(() => {
    Mapper.createMap(UserWithAbstractBase, UserWithAbstractBaseVm).reverseMap();
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map', () => {
    const vm = Mapper.map(
      {
        createdDate: new Date(),
        updatedDate: new Date(),
        id: '1',
        name: 'Chau',
      },
      UserWithAbstractBaseVm,
      UserWithAbstractBase
    );
    expect(vm).toBeTruthy();
  });
});

describe('AutoMapper Integration - PreCondition null/undefined', () => {
  class Foo {
    @AutoMap()
    foo!: number;
  }

  class FooVm {
    @AutoMap()
    foo?: number;
  }

  beforeAll(() => {
    Mapper.createMap(Foo, FooVm).forMember(
      d => d.foo,
      preCondition(() => false, null),
      fromValue(5)
    );
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map to null', () => {
    const vm = Mapper.map({ foo: 5 }, FooVm, Foo);
    expect(vm).toBeTruthy();
    expect(vm.foo).toBeNull();
  });
});

describe('AutoMapper Integration - IncludeBase', () => {
  beforeAll(() => {
    Mapper.addProfile(FooProfile);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should', () => {
    const vm = Mapper.map({ foo: 'foo', t: 't' }, FooWithBaseVm, FooWithBase);
    expect(vm).toBeTruthy();
  });
});
