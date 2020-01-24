import 'reflect-metadata';
import {
  AutoMap,
  AutoMapper,
  BeforeAfterMapAction,
  Converter,
  Mapper,
  MappingProfileBase,
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '../src';

describe('AutoMapper', () => {
  it('AutoMapper exposes a singleton', () => {
    expect(Mapper).toBeInstanceOf(AutoMapper);
    const _instance = AutoMapper.getInstance();
    expect(_instance).toBeInstanceOf(AutoMapper);
    expect(_instance).toBe(Mapper);
  });

  it('AutoMapper is instantiable', () => {
    const _mapper = new AutoMapper();
    expect(_mapper).toBeInstanceOf(AutoMapper);
    expect(_mapper).not.toBe(Mapper);
  });
});

describe('AutoMapper - CreateMap', () => {
  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
  }

  let mapper: AutoMapper;

  beforeEach(() => {
    mapper = new AutoMapper();
  });

  afterEach(() => {
    Mapper.dispose();
  });

  it('createMap', () => {
    expect(Mapper).toEqual(mapper);
    Mapper.createMap(User, UserVm);
    expect(Mapper).not.toEqual(mapper);
  });

  it('createMap by initialize', () => {
    expect(Mapper).toEqual(mapper);
    Mapper.initialize(config => {
      config.createMap(User, UserVm);
    });
    expect(Mapper).not.toEqual(mapper);
  });
});

describe('AutoMapper - reverseMap', () => {
  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    full!: string;
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
  }

  let userVm: UserVm;

  const before = jest.fn();
  const after = jest.fn();

  beforeAll(() => {
    Mapper.createMap(User, UserVm)
      .forMember(
        d => d.fullName,
        opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
      )
      .reverseMap()
      .forPath(
        s => s.full,
        opts => opts.mapFrom(d => d.fullName)
      )
      .beforeMap(before)
      .afterMap(after);

    userVm = new UserVm();
    userVm.firstName = 'Phuong';
    userVm.lastName = 'Ngo';
    userVm.fullName = 'Phuong Ngo';
  });

  afterAll(() => {
    Mapper.dispose();
  });

  it('reverseMap', () => {
    const user = Mapper.map(userVm, User);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toEqual(userVm.firstName);
    expect(user.lastName).toEqual(userVm.lastName);
    expect(user.full).toEqual(userVm.fullName);
    expect(before).toBeCalled();
    expect(after).toBeCalled();
  });
});

describe('AutoMapper - addProfile', () => {
  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(User, UserVm);
    }
  }

  let mapper: AutoMapper;

  beforeEach(() => {
    mapper = new AutoMapper();
  });

  afterEach(() => {
    Mapper.dispose();
  });

  it('addProfile', () => {
    expect(Mapper).toEqual(mapper);
    Mapper.addProfile(UserProfile);
    expect(Mapper).not.toEqual(mapper);
  });

  it('addProfile by initialize', () => {
    expect(Mapper).toEqual(mapper);
    Mapper.initialize(config => {
      config.addProfile(UserProfile);
    });
    expect(Mapper).not.toEqual(mapper);
  });

  it('addProfile throw error when adding duplicate Profile', () => {
    let message: string = '';
    try {
      Mapper.addProfile(UserProfile).addProfile(UserProfile);
    } catch (e) {
      message = e.message;
    }

    expect(message).toBeTruthy();
    expect(message).toEqual(
      `${UserProfile.name} is already existed on the current Mapper instance`
    );
  });
});

describe('AutoMapper - callbacks', () => {
  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
  }

  const beforeCallback: BeforeAfterMapAction = jest.fn();
  const afterCallback: BeforeAfterMapAction = jest.fn();

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(
          d => d.fullName,
          opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
        )
        .beforeMap(beforeCallback)
        .afterMap(afterCallback);
    }
  }

  beforeAll(() => {
    Mapper.addProfile(UserProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  it('callbacks are called', () => {
    const user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    Mapper.map(user, UserVm);
    expect(beforeCallback).toBeCalled();
    expect(afterCallback).toBeCalled();
  });

  it('map level callbacks are called', () => {
    const user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';

    const before = jest.fn();
    const after = jest.fn();

    Mapper.map(user, UserVm, { beforeMap: before, afterMap: after });
    expect(before).toBeCalled();
    expect(after).toBeCalled();
  });
});

describe('AutoMapper - namingConvention', () => {
  class SnakeCaseAddress {
    @AutoMap()
    street!: string;
  }

  class SnakeCaseUser {
    @AutoMap()
    first_name!: string;
    @AutoMap()
    last_name!: string;
    @AutoMap(() => SnakeCaseAddress)
    address!: SnakeCaseAddress;
  }

  class Address {
    @AutoMap()
    Street!: string;
  }

  class User {
    @AutoMap()
    FirstName!: string;
    @AutoMap()
    LastName!: string;
    @AutoMap(() => Address)
    Address!: Address;
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
    @AutoMap()
    addressStreet!: string;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm, {
          sourceMemberNamingConvention: new PascalCaseNamingConvention(),
        })
        .forMember(
          dest => dest.fullName,
          opts => opts.mapFrom(s => s.FirstName + ' ' + s.LastName)
        );

      mapper
        .createMap(SnakeCaseUser, UserVm, {
          sourceMemberNamingConvention: new SnakeCaseNamingConvention(),
        })
        .forMember(
          dest => dest.fullName,
          opts => opts.mapFrom(s => s.first_name + ' ' + s.last_name)
        );
    }
  }

  beforeAll(() => {
    Mapper.addProfile(UserProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  it('pascal naming convention', () => {
    const user = new User();
    user.FirstName = 'Chau';
    user.LastName = 'Tran';
    user.Address = new Address();
    user.Address.Street = 'Midland';

    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(vm.firstName).toEqual(user.FirstName);
    expect(vm.lastName).toEqual(user.LastName);
    expect(vm.fullName).toEqual(user.FirstName + ' ' + user.LastName);
    expect(vm.addressStreet).toEqual(user.Address.Street);
  });

  it('snake naming convention', () => {
    const user = new SnakeCaseUser();
    user.first_name = 'Chau';
    user.last_name = 'Tran';
    user.address = new SnakeCaseAddress();
    user.address.street = 'Midland';

    const vm = Mapper.map(user, UserVm, SnakeCaseUser);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
  });
});

describe('AutoMapper - map', () => {
  class Avatar {
    @AutoMap()
    url!: string;
    @AutoMap()
    source!: string;
    @AutoMap()
    shouldIgnore!: number;
    @AutoMap()
    shouldBeSubstituted!: string;
  }

  class AvatarVm {
    @AutoMap()
    url!: string;
    @AutoMap()
    ignored!: number;
    @AutoMap()
    shouldBeSubstituted!: string;
  }

  class AvatarProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(Avatar, AvatarVm)
        .forMember(
          d => d.url,
          opts =>
            opts.preCondition(s => s.shouldIgnore > 5).mapFrom(s => s.source)
        )
        .forMember(
          d => d.ignored,
          opts => opts.ignore()
        )
        .forMember(
          d => d.shouldBeSubstituted,
          opts => opts.nullSubstitution('Substituted')
        );
    }
  }

  class Address {
    @AutoMap()
    street!: string;
    @AutoMap()
    city!: string;
    @AutoMap()
    state!: string;
  }

  class AddressVm {
    @AutoMap()
    formattedAddress!: string;
  }

  class AddressProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(Address, AddressVm).forMember(
        d => d.formattedAddress,
        opts => opts.mapFrom(s => s.street + ' ' + s.city + ' ' + s.state)
      );
    }
  }

  class Profile {
    @AutoMap()
    bio!: string;
    @AutoMap()
    birthday!: Date;
    @AutoMap(() => Avatar)
    avatar!: Avatar;
    @AutoMap(() => Address)
    addresses!: Address[];
  }

  class ProfileVm {
    @AutoMap()
    bio!: string;
    @AutoMap(() => AvatarVm)
    avatar!: AvatarVm;
    @AutoMap(() => AddressVm)
    addresses!: AddressVm[];
  }

  class ProfileProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(Profile, ProfileVm).forMember(
        d => d.avatar,
        opts => opts.mapWith(AvatarVm, s => s.avatar)
      );
    }
  }

  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap(() => Profile)
    profile!: Profile;
  }

  class UserVm {
    @AutoMap()
    first!: string;
    @AutoMap()
    last!: string;
    @AutoMap()
    full!: string;
    @AutoMap(() => ProfileVm)
    profile!: ProfileVm;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(
          d => d.first,
          opts => opts.mapFrom(s => s.firstName)
        )
        .forMember(
          d => d.last,
          opts => opts.mapFrom(s => s.lastName)
        )
        .forMember(
          d => d.full,
          opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
        );
    }
  }

  let user: User;

  beforeAll(() => {
    Mapper.addProfile(AvatarProfile)
      .addProfile(AddressProfile)
      .addProfile(ProfileProfile)
      .addProfile(UserProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  beforeEach(() => {
    user = new User();
    user.firstName = 'Chau';
    user.lastName = 'Tran';
    user.profile = new Profile();
    user.profile.bio = 'Developer';
    user.profile.birthday = new Date('10/14/1991');
    user.profile.avatar = new Avatar();
    user.profile.avatar.source = 'Internet';
    user.profile.avatar.url = 'url.com';
    user.profile.avatar.shouldIgnore = 6;
    user.profile.avatar.shouldBeSubstituted = 'Will not be substituted';
    user.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addr = new Address();
        addr.street = 'Street ' + index + 1;
        addr.city = 'City ' + index + 1;
        addr.state = 'State ' + index + 1;
        return addr;
      });
  });

  it('map', () => {
    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);

    expect(vm.first).toEqual(user.firstName);
    expect(vm.last).toEqual(user.lastName);
    expect(vm.full).toEqual(user.firstName + ' ' + user.lastName);

    expect(vm.profile).toBeTruthy();
    expect(vm.profile).toBeInstanceOf(ProfileVm);
    expect(vm.profile.bio).toEqual(user.profile.bio);

    expect(vm.profile.avatar).toBeTruthy();
    expect(vm.profile.avatar).toBeInstanceOf(AvatarVm);
    expect(vm.profile.avatar.url).toEqual(user.profile.avatar.source);
    expect(vm.profile.avatar.shouldBeSubstituted).not.toEqual('Substituted');
    expect(vm.profile.avatar.shouldBeSubstituted).toEqual(
      'Will not be substituted'
    );

    expect(vm.profile.addresses).toBeTruthy();
    expect(vm.profile.addresses).toHaveLength(user.profile.addresses.length);
    vm.profile.addresses.forEach((address, index) => {
      expect(address).toBeTruthy();
      expect(address).toBeInstanceOf(AddressVm);
      expect(address.formattedAddress).toEqual(
        user.profile.addresses[index].street +
          ' ' +
          user.profile.addresses[index].city +
          ' ' +
          user.profile.addresses[index].state
      );
    });
  });

  it('mapAsync', async () => {
    const vm = await Mapper.mapAsync(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
  });

  it('mapArray', () => {
    const vms = Mapper.mapArray([user, user], UserVm);
    expect(vms).toBeTruthy();
    expect(vms.length).toEqual(2);
    vms.forEach(vm => {
      expect(vm).toBeInstanceOf(UserVm);
    });
  });

  it('mapArrayAsync', async () => {
    const vms = await Mapper.mapArrayAsync([user, user], UserVm);
    expect(vms).toBeTruthy();
    expect(vms.length).toEqual(2);
  });

  it('mapArray with empty array', () => {
    const vms = Mapper.mapArray([], UserVm, User);
    expect(vms).toBeTruthy();
    expect(vms.length).toEqual(0);
  });

  it('mapArrayAsync with empty array', async () => {
    const vms = await Mapper.mapArrayAsync([], UserVm, User);
    expect(vms).toBeTruthy();
    expect(vms.length).toEqual(0);
  });
});

describe('AutoMapper - reverseMap - complex', () => {
  class Avatar {
    @AutoMap()
    url!: string;
    @AutoMap()
    source!: string;
    @AutoMap()
    shouldIgnore!: number;
  }

  class AvatarVm {
    @AutoMap()
    url!: string;
    @AutoMap()
    ignored!: number;
  }

  class AvatarProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(Avatar, AvatarVm)
        .forMember(
          d => d.url,
          opts =>
            opts.preCondition(s => s.shouldIgnore > 5).mapFrom(s => s.source)
        )
        .forMember(
          d => d.ignored,
          opts => opts.ignore()
        )
        .reverseMap()
        .forPath(
          s => s.url,
          opts => opts.ignore()
        )
        .forPath(
          s => s.shouldIgnore,
          opts => opts.fromValue(5)
        );
    }
  }

  class Address {
    @AutoMap()
    street!: string;
    @AutoMap()
    city!: string;
    @AutoMap()
    state!: string;
  }

  class AddressVm {
    @AutoMap()
    formattedAddress!: string;
  }

  class AddressProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(Address, AddressVm)
        .forMember(
          d => d.formattedAddress,
          opts => opts.mapFrom(s => s.street + ' ' + s.city + ' ' + s.state)
        )
        .reverseMap()
        .forPath(
          s => s.street,
          opts => opts.ignore()
        )
        .forPath(
          s => s.city,
          opts => opts.ignore()
        )
        .forPath(
          s => s.state,
          opts => opts.ignore()
        );
    }
  }

  class Profile {
    @AutoMap()
    bio!: string;
    @AutoMap()
    birthday!: Date;
    @AutoMap(() => Avatar)
    avatar!: Avatar;
    @AutoMap(() => Address)
    addresses!: Address[];
  }

  class ProfileVm {
    @AutoMap()
    bio!: string;
    @AutoMap(() => AvatarVm)
    avatar!: AvatarVm;
    @AutoMap(() => AddressVm)
    addresses!: AddressVm[];
  }

  class DateConverter implements Converter<string, Date> {
    convert(source: string): Date {
      return new Date(source);
    }
  }

  class ProfileProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(Profile, ProfileVm)
        .forMember(
          d => d.avatar,
          opts => opts.mapWith(AvatarVm, s => s.avatar)
        )
        .reverseMap()
        .forPath(
          s => s.birthday,
          opts => opts.convertUsing(new DateConverter(), _ => '10/14/1991')
        );
    }
  }

  class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap(() => Profile)
    profile!: Profile;
  }

  class User2 {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap(() => Profile)
    profile!: Profile;
  }

  class UserVm {
    @AutoMap()
    first!: string;
    @AutoMap()
    last!: string;
    @AutoMap()
    full!: string;
    @AutoMap(() => ProfileVm)
    profile!: ProfileVm;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(
          d => d.first,
          opts => opts.mapFrom(s => s.firstName)
        )
        .forMember(
          d => d.last,
          opts => opts.mapFrom(s => s.lastName)
        )
        .forMember(
          d => d.full,
          opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
        )
        .reverseMap();

      mapper
        .createMap(User2, UserVm)
        .forMember(
          d => d.first,
          opts => opts.fromValue('user2 first name')
        )
        .forMember(
          d => d.last,
          opts => opts.fromValue('user2 last name')
        )
        .forMember(
          d => d.full,
          opts => opts.fromValue('full name')
        );
    }
  }

  let userVm: UserVm;

  beforeAll(() => {
    Mapper.addProfile(AvatarProfile)
      .addProfile(AddressProfile)
      .addProfile(ProfileProfile)
      .addProfile(UserProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  beforeEach(() => {
    userVm = new UserVm();
    userVm.first = 'Chau';
    userVm.last = 'Tran';
    userVm.full = 'Chau Tran';
    userVm.profile = new ProfileVm();
    userVm.profile.bio = 'Developer';
    userVm.profile.avatar = new AvatarVm();
    userVm.profile.avatar.url = 'url.com';
    userVm.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addressVm = new AddressVm();
        addressVm.formattedAddress = `Street ${index} City ${index} State ${index}`;
        return addressVm;
      });
  });

  it('reverseMap', () => {
    const user = Mapper.map(userVm, User);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
  });

  it('multiple mapping to vm', () => {
    const user = new User2();
    user.firstName = 'blah';
    user.lastName = 'foo';
    user.profile = new Profile();
    user.profile.bio = 'Developer';
    user.profile.birthday = new Date('10/14/1991');
    user.profile.avatar = new Avatar();
    user.profile.avatar.source = 'Internet';
    user.profile.avatar.url = 'url.com';
    user.profile.avatar.shouldIgnore = 6;
    user.profile.addresses = Array(2)
      .fill('')
      .map((_, index) => {
        const addr = new Address();
        addr.street = 'Street ' + index + 1;
        addr.city = 'City ' + index + 1;
        addr.state = 'State ' + index + 1;
        return addr;
      });

    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(vm.first).toEqual('user2 first name');
    expect(vm.last).toEqual('user2 last name');
    expect(vm.full).toEqual('full name');
    expect(vm.profile).toBeTruthy();
    expect(vm.profile).toBeInstanceOf(ProfileVm);
  });

  it('multiple mapping with overload', () => {
    const user: User2 = {
      firstName: 'blah',
      lastName: 'foo',
      profile: {
        bio: 'Developer',
        birthday: new Date('10/14/1991'),
        addresses: Array(2)
          .fill('')
          .map((_, index) => {
            const addr = new Address();
            addr.street = 'Street ' + index + 1;
            addr.city = 'City ' + index + 1;
            addr.state = 'State ' + index + 1;
            return addr;
          }),
        avatar: {
          source: 'Internet',
          url: 'url.com',
          shouldIgnore: 6,
        },
      },
    };
    const vm = Mapper.map(user, UserVm, User2);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(vm.first).toEqual('user2 first name');
    expect(vm.last).toEqual('user2 last name');
    expect(vm.full).toEqual('full name');
    expect(vm.profile).toBeTruthy();
    expect(vm.profile).toBeInstanceOf(ProfileVm);
  });
});

describe('AutoMapper - public getter setter', () => {
  class User {
    private _firstName!: string;
    @AutoMap()
    public get firstName() {
      return this._firstName;
    }

    public set firstName(value: string) {
      this._firstName = value;
    }

    private _lastName!: string;
    @AutoMap()
    public get lastName() {
      return this._lastName;
    }

    public set lastName(value: string) {
      this._lastName = value;
    }
  }

  class UserVm {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    fullName!: string;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(
          d => d.fullName,
          opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
        )
        .reverseMap();
    }
  }

  class Foo {
    private _foo!: string;
    @AutoMap()
    public get foo(): string {
      return this._foo;
    }

    public set foo(value: string) {
      this._foo = value;
    }
  }

  class FooDto {
    @AutoMap()
    public foo!: string;
  }

  class FooProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FooDto, Foo);
    }
  }

  beforeAll(() => {
    Mapper.addProfile(UserProfile).addProfile(FooProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  it('map', () => {
    const user = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';

    const vm = Mapper.map(user, UserVm);
    expect(vm).toBeTruthy();
    expect(vm).toBeInstanceOf(UserVm);
    expect(vm.firstName).toEqual(user.firstName);
    expect(vm.lastName).toEqual(user.lastName);
    expect(vm.fullName).toEqual(user.firstName + ' ' + user.lastName);
  });

  it('reverse map', () => {
    const vm = new UserVm();
    vm.firstName = 'Chau';
    vm.lastName = 'Tran';
    vm.fullName = 'Chau Tran';

    const user = Mapper.map(vm, User);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
  });

  it('map foo', () => {
    const foo = Mapper.map({ foo: 'bar' }, Foo, FooDto);
    expect(foo).toBeTruthy();
    expect(foo).toBeInstanceOf(Foo);
  });
});
