import { Expose } from 'class-transformer';
import 'reflect-metadata';
import {
  AutoMapper,
  BeforeAfterMapAction,
  Converter,
  ExposedType,
  Mapper,
  MappingProfileBase,
  PascalCaseNamingConvention,
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
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
  }

  class UserVm {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
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
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
    full!: string;
  }

  class UserVm {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
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
      .forPath(s => s.full, opts => opts.mapFrom(d => d.fullName))
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
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
  }

  class UserVm {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
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
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
  }

  class UserVm {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
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
  class Address {
    @Expose()
    Street!: string;
  }

  class User {
    @Expose()
    FirstName!: string;
    @Expose()
    LastName!: string;
    @ExposedType(() => Address)
    Address!: Address;
  }

  class UserVm {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @Expose()
    fullName!: string;
    @Expose()
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
    }
  }

  beforeAll(() => {
    Mapper.addProfile(UserProfile);
  });

  afterAll(() => {
    Mapper.dispose();
  });

  it('naming convention', () => {
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
});

describe('AutoMapper - map', () => {
  class Avatar {
    @Expose()
    url!: string;
    @Expose()
    source!: string;
    @Expose()
    shouldIgnore!: number;
    @Expose()
    shouldBeSubstituted!: string;
  }

  class AvatarVm {
    @Expose()
    url!: string;
    @Expose()
    ignored!: number;
    @Expose()
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
        .forMember(d => d.ignored, opts => opts.ignore())
        .forMember(d => d.shouldBeSubstituted, opts => opts.nullSubstitution('Substituted'));
    }
  }

  class Address {
    @Expose()
    street!: string;
    @Expose()
    city!: string;
    @Expose()
    state!: string;
  }

  class AddressVm {
    @Expose()
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
        );
    }
  }

  class Profile {
    @Expose()
    bio!: string;
    @Expose()
    birthday!: Date;
    @ExposedType(() => Avatar)
    avatar!: Avatar;
    @ExposedType(() => Address)
    addresses!: Address[];
  }

  class ProfileVm {
    @Expose()
    bio!: string;
    @ExposedType(() => AvatarVm)
    avatar!: AvatarVm;
    @ExposedType(() => AddressVm)
    addresses!: AddressVm[];
  }

  class ProfileProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(Profile, ProfileVm)
        .forMember(
          d => d.avatar,
          opts => opts.mapWith(AvatarVm, s => s.avatar)
        );
    }
  }

  class User {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @ExposedType(() => Profile)
    profile!: Profile;
  }

  class UserVm {
    @Expose()
    first!: string;
    @Expose()
    last!: string;
    @Expose()
    full!: string;
    @ExposedType(() => ProfileVm)
    profile!: ProfileVm;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(d => d.first, opts => opts.mapFrom(s => s.firstName))
        .forMember(d => d.last, opts => opts.mapFrom(s => s.lastName))
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
    expect(vm.profile.avatar.shouldBeSubstituted).toEqual('Will not be substituted');

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
});

describe('AutoMapper - reverseMap - complex', () => {
  class Avatar {
    @Expose()
    url!: string;
    @Expose()
    source!: string;
    @Expose()
    shouldIgnore!: number;
  }

  class AvatarVm {
    @Expose()
    url!: string;
    @Expose()
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
        .forMember(d => d.ignored, opts => opts.ignore())
        .reverseMap()
        .forPath(s => s.url, opts => opts.ignore())
        .forPath(s => s.shouldIgnore, opts => opts.fromValue(5));
    }
  }

  class Address {
    @Expose()
    street!: string;
    @Expose()
    city!: string;
    @Expose()
    state!: string;
  }

  class AddressVm {
    @Expose()
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
        .forPath(s => s.street, opts => opts.ignore())
        .forPath(s => s.city, opts => opts.ignore())
        .forPath(s => s.state, opts => opts.ignore());
    }
  }

  class Profile {
    @Expose()
    bio!: string;
    @Expose()
    birthday!: Date;
    @ExposedType(() => Avatar)
    avatar!: Avatar;
    @ExposedType(() => Address)
    addresses!: Address[];
  }

  class ProfileVm {
    @Expose()
    bio!: string;
    @ExposedType(() => AvatarVm)
    avatar!: AvatarVm;
    @ExposedType(() => AddressVm)
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
        .forMember(d => d.avatar, opts => opts.mapWith(AvatarVm, s => s.avatar))
        .reverseMap()
        .forPath(
          s => s.birthday,
          opts => opts.convertUsing(new DateConverter(), _ => '10/14/1991')
        );
    }
  }

  class User {
    @Expose()
    firstName!: string;
    @Expose()
    lastName!: string;
    @ExposedType(() => Profile)
    profile!: Profile;
  }

  class UserVm {
    @Expose()
    first!: string;
    @Expose()
    last!: string;
    @Expose()
    full!: string;
    @ExposedType(() => ProfileVm)
    profile!: ProfileVm;
  }

  class UserProfile extends MappingProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper
        .createMap(User, UserVm)
        .forMember(d => d.first, opts => opts.mapFrom(s => s.firstName))
        .forMember(d => d.last, opts => opts.mapFrom(s => s.lastName))
        .forMember(
          d => d.full,
          opts => opts.mapFrom(s => s.firstName + ' ' + s.lastName)
        )
        .reverseMap();
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
});
