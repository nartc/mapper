import { setupPojos } from '../setup.spec';
import {
  PascalUser,
  PascalUserVm,
} from './fixtures/interfaces/user-pascal.interface';
import { User, UserVm } from './fixtures/interfaces/user.interface';
import {
  addressProfile,
  pascalAddressProfile,
} from './fixtures/profiles/address.profile';
import {
  avatarProfile,
  FOR_SHOULD_IGNORE_FAIL_CONDITION,
  FOR_SHOULD_IGNORE_PASS_CONDITION,
  pascalAvatarProfile,
} from './fixtures/profiles/avatar.profile';
import {
  pascalUserProfileProfile,
  userProfileProfile,
} from './fixtures/profiles/user-profile.profile';
import {
  pascalUserProfile,
  userProfile,
} from './fixtures/profiles/user.profile';
import { getPascalUser, getUser } from './utils/get-user';

describe('Map - Non Flattening', () => {
  const [mapper] = setupPojos('map');

  it('should map properly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const user = getUser({
      avatar: {
        shouldIgnore: FOR_SHOULD_IGNORE_PASS_CONDITION,
        shouldBeSubstituted: null,
        forCondition: true,
      },
    });

    const vm = mapper.map<User, UserVm>(user, 'UserVm', 'User');
    assertVm(user, vm);
  });

  it('should map correctly with condition, preCondition, and nullSubstitution', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const user = getUser({
      avatar: {
        shouldIgnore: FOR_SHOULD_IGNORE_FAIL_CONDITION,
        shouldBeSubstituted: 'will not sub',
        forCondition: false,
      },
    });

    const vm = mapper.map<User, UserVm>(user, 'UserVm', 'User');
    assertVm(user, vm, { shouldIgnorePassCondition: false, shouldSub: false });
  });

  it('should mapArray correctly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const user = getUser({
      avatar: {
        shouldIgnore: FOR_SHOULD_IGNORE_PASS_CONDITION,
        shouldBeSubstituted: null,
        forCondition: true,
      },
    });
    const vms = mapper.mapArray<User, UserVm>([user, user], 'UserVm', 'User');
    expect(vms.length).toEqual(2);
    vms.forEach((vm) => {
      assertVm(user, vm);
    });
  });

  it('should mapAsync correctly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const user = getUser({
      avatar: {
        shouldIgnore: FOR_SHOULD_IGNORE_PASS_CONDITION,
        shouldBeSubstituted: null,
        forCondition: true,
      },
    });

    mapper.mapAsync<User, UserVm>(user, 'UserVm', 'User').then((vm) => {
      assertVm(user, vm);
    });
  });

  it('should mapArrayAsync correctly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const user = getUser({
      avatar: {
        shouldIgnore: FOR_SHOULD_IGNORE_PASS_CONDITION,
        shouldBeSubstituted: null,
        forCondition: true,
      },
    });
    mapper
      .mapArrayAsync<User, UserVm>([user, user], 'UserVm', 'User')
      .then((vms) => {
        expect(vms.length).toEqual(2);
        vms.forEach((vm) => {
          assertVm(user, vm);
        });
      });
  });

  it('should throw error when map without mapping', () => {
    const user = getUser();
    expect(() => mapper.map<User, UserVm>(user, 'UserVm', 'User')).toThrow();
  });

  it('should return empty array when mapArray with empty array', () => {
    const vms = mapper.mapArray<User, UserVm>([], 'UserVm', 'User');
    expect(vms).toEqual([]);
  });

  it('should map with a different casing', () => {
    mapper
      .addProfile(pascalAddressProfile)
      .addProfile(pascalAvatarProfile)
      .addProfile(pascalUserProfileProfile)
      .addProfile(pascalUserProfile);

    const pascalUser = getPascalUser({
      avatar: {
        ShouldIgnore: FOR_SHOULD_IGNORE_PASS_CONDITION,
        ShouldBeSubstituted: null,
        ForCondition: true,
      },
    });

    const vm = mapper.map<PascalUser, PascalUserVm>(
      pascalUser,
      'PascalUserVm',
      'PascalUser'
    );
    expect(vm).toBeTruthy();
  });

  function assertVm(
    user: User,
    vm: UserVm,
    assertionPaths: {
      shouldIgnorePassCondition: boolean;
      shouldSub: boolean;
    } = { shouldIgnorePassCondition: true, shouldSub: true }
  ) {
    const { shouldIgnorePassCondition, shouldSub } = assertionPaths;

    expect(vm.first).toEqual(user.firstName);
    expect(vm.last).toEqual(user.lastName);
    expect(vm.full).toEqual(user.firstName + ' ' + user.lastName);

    expect(vm.profile.birthday).toEqual(user.profile.birthday.toDateString());
    expect(vm.profile.bio).toEqual(user.profile.bio);

    if (shouldIgnorePassCondition) {
      expect(vm.profile.avatar.url).toEqual(user.profile.avatar.source);
      expect(vm.profile.avatar.forCondition).toEqual(
        user.profile.avatar.forCondition
      );
    } else {
      expect(vm.profile.avatar.url).toEqual('default url');
      expect(vm.profile.avatar.forCondition).toEqual(true);
    }

    if (shouldSub) {
      expect(vm.profile.avatar.shouldBeSubstituted).toEqual('sub');
    } else {
      expect(vm.profile.avatar.shouldBeSubstituted).toEqual(
        vm.profile.avatar.shouldBeSubstituted
      );
    }

    expect(vm.profile.avatar.willBeIgnored).not.toBeTruthy();

    user.profile.addresses.forEach((address, index) => {
      expect(vm.profile.addresses[index].formattedAddress).toEqual(
        `${address.street} ${address.city} ${address.state}`
      );
    });

    // no flattening
    expect(vm.jobTitle).toBeUndefined();
    expect(vm.jobAnnualSalary).toBeUndefined();
  }
});
