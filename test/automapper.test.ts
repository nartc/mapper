import { Mapper } from '../src';
import { mappingStorage } from '../src/storages';
import { Address, AddressVm } from './fixtures/models/address';
import { Avatar, AvatarVm } from './fixtures/models/avatar';
import { Profile, ProfileVm } from './fixtures/models/profile';
import {
  ComplexUser,
  ComplexUserVm,
  User,
  UserVm,
} from './fixtures/models/user';
import { AddressProfile } from './fixtures/profiles/address.profile';
import { AvatarProfile } from './fixtures/profiles/avatar.profile';
import { ProfileProfile } from './fixtures/profiles/profile.profile';
import {
  ComplexUserProfile,
  UserProfile,
} from './fixtures/profiles/user.profile';

describe('AutoMapper Integration - Create Map', () => {
  afterEach(Mapper.dispose.bind(Mapper));

  it('should create mapping', () => {
    expect(mappingStorage.has(User, UserVm)).toEqual(false);
    Mapper.createMap(User, UserVm);
    expect(mappingStorage.has(User, UserVm)).toEqual(true);
  });

  it('should retrieve mapping after creation', () => {
    Mapper.createMap(User, UserVm);
    expect(mappingStorage.get(User, UserVm)).toBeTruthy();
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

  it('should return empty array when mapArray with empty Array', () => {
    const vms = Mapper.mapArray([], UserVm, User);
    expect(vms).toBeTruthy();
    expect(vms).toHaveLength(0);
  });
});
