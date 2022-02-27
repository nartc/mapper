import { assertVm } from '../assert-vm.spec';
import { setupClasses } from '../setup.spec';
import { User, UserVm } from './fixtures/models/user';
import { PascalUser, PascalUserVm } from './fixtures/models/user-pascal';
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
import { UserProfileVm } from './fixtures/models/user-profile';
import { AvatarVm } from './fixtures/models/avatar';

describe('Map Mutate', () => {
  const [mapper] = setupClasses('mapMutate');

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

    const vm = new UserVm();
    mapper.map(user, UserVm, User, vm);
    assertVm(user, vm);
  });

  it('should map plain object properly', () => {
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

    const plain = Object.assign({}, user);
    const vm = new UserVm();
    mapper.map(plain, UserVm, User, vm);
    assertVm(plain, vm);
  });

  it('should not map undefined properly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const originalUser = getUser();
    const user = { ...originalUser };

    const vm = new UserVm();
    vm.first = 'foo';

    mapper.map(vm, User, UserVm, user);
    expect(user.firstName).toEqual(vm.first);
    expect(user.lastName).toEqual(originalUser.lastName);
    expect(user.profile).toEqual(originalUser.profile);
    expect(user.job).toEqual(originalUser.job);
  });

  it('should map null and falsy properly', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const originalUser = getUser();
    const user = { ...originalUser };

    const vm = new UserVm();
    vm.first = null;
    vm.last = '';

    mapper.map(vm, User, UserVm, user);
    expect(user.firstName).toEqual(vm.first);
    expect(user.lastName).toEqual(vm.last);
    expect(user.profile).toEqual(originalUser.profile);
    expect(user.job).toEqual(originalUser.job);
  });

  it('should not map undefined properly of nested field', () => {
    mapper
      .addProfile(addressProfile)
      .addProfile(avatarProfile)
      .addProfile(userProfileProfile)
      .addProfile(userProfile);

    const originalUser = getUser();
    const user = { ...getUser() };

    const vm = new UserVm();
    vm.profile = {
      bio: 'Outgoing-ish',
      avatar: { url: 'uniform-resource-locator.com' } as AvatarVm,
    } as UserProfileVm;

    mapper.map(vm, User, UserVm, user);
    expect(user.profile.bio).toEqual(vm.profile.bio);
    expect(user.profile.avatar.url).toEqual(vm.profile.avatar.url);

    expect(user.profile.birthday).toEqual(originalUser.profile.birthday);
    expect(user.profile.avatar.source).toEqual(originalUser.profile.avatar.source);
    expect(user.profile.avatar.shouldIgnore).toEqual(originalUser.profile.avatar.shouldIgnore);
    expect(user.profile.avatar.shouldBeSubstituted).toEqual(originalUser.profile.avatar.shouldBeSubstituted);
    expect(user.profile.avatar.forCondition).toEqual(originalUser.profile.avatar.forCondition);
    expect(user.profile.addresses).toEqual(originalUser.profile.addresses);
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

    const vm = new UserVm();
    mapper.map(user, UserVm, User, vm);
    assertVm(user, vm, { shouldIgnorePassCondition: false, shouldSub: false });
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

    const vm = new UserVm();
    mapper.mapAsync(user, UserVm, User, vm).then(() => {
      assertVm(user, vm);
    });
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

    const vm = new PascalUserVm();
    mapper.map(pascalUser, PascalUserVm, PascalUser, vm);
    expect(vm).toBeTruthy();
  });
});
