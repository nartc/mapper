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

describe('Map Mutate', () => {
  const [mapper] = setupPojos('mapMutate');

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

    const vm = {} as UserVm;
    mapper.map<User, UserVm>(user, 'UserVm', 'User', vm);
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

    const vm = {} as UserVm;
    mapper.map<User, UserVm>(user, 'UserVm', 'User', vm);
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

    const vm = {} as UserVm;
    mapper.mapAsync<User, UserVm>(user, 'UserVm', 'User', vm).then(() => {
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

    const vm = {} as PascalUserVm;
    mapper.map<PascalUser, PascalUserVm>(
      pascalUser,
      'PascalUserVm',
      'PascalUser',
      vm
    );
    expect(vm).toBeTruthy();
  });
});
