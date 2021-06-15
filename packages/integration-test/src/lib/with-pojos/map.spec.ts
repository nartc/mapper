import { assertVm } from '../assert-vm.spec';
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
import { getCustomKeyFoo } from './utils/get-custom-key';
import { CustomKeyFoo, CustomKeyFooVm } from './fixtures/interfaces/custom-keys.interface';
import { customKeyProfile } from './fixtures/profiles/custom-keys.profile';

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

  it('should return null/undefined if source is null/undefined', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    let vm = mapper.map<User, UserVm>(undefined, 'UserVm', 'User');
    expect(vm).toEqual(undefined);

    vm = mapper.map<User, UserVm>(null, 'UserVm', 'User');
    expect(vm).toEqual(null);
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

  it('should map custom keys', () => {
    mapper
      .addProfile(customKeyProfile);

    const foo = getCustomKeyFoo();

    const vm = mapper.map<CustomKeyFoo, CustomKeyFooVm>(
      foo,
      'CustomKeyFooVm',
      'CustomKeyFoo'
    );
    expect(vm).toBeTruthy();
  });
});
