import { assertVm } from '../assert-vm.spec';
import { setupClasses } from '../setup.spec';
import { Doctor, DoctorDto } from './fixtures/models/doctor';
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
import { doctorProfile } from './fixtures/profiles/doctor.profile';
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
  const [mapper] = setupClasses('map');

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

    const vm = mapper.map(user, UserVm, User);
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
    const vm = mapper.map(plain, UserVm, User);
    assertVm(plain, vm);
  });

  it('should mapArray plain object properly', () => {
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

    const plains = [Object.assign({}, user), Object.assign({}, user)];
    const vms = mapper.mapArray(plains, UserVm, User);
    expect(vms.length).toEqual(2);
    vms.forEach((vm) => {
      assertVm(user, vm);
    });
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

    const vm = mapper.map(user, UserVm, User);
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
    const vms = mapper.mapArray([user, user], UserVm, User);
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

    mapper.mapAsync(user, UserVm, User).then((vm) => {
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
    mapper.mapArrayAsync([user, user], UserVm, User).then((vms) => {
      expect(vms.length).toEqual(2);
      vms.forEach((vm) => {
        assertVm(user, vm);
      });
    });
  });

  it('should throw error when map without mapping', () => {
    const user = getUser();
    expect(() => mapper.map(user, UserVm, User)).toThrow();
  });

  it('should return empty array when mapArray with empty array', () => {
    const vms = mapper.mapArray([], UserVm, User);
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

    const vm = mapper.map(pascalUser, PascalUserVm, PascalUser);
    expect(vm).toBeTruthy();
  });

  it('should map doctor', () => {
    mapper.addProfile(doctorProfile);
    const doctor = new Doctor();
    doctor.name = 'Chau';
    doctor.titleTags = ['title', 'tags', 'blah'];

    const dto = mapper.map(doctor, DoctorDto, Doctor);
    expect(dto.name).toEqual(doctor.name);
    expect(dto.titleTags).toEqual(doctor.titleTags);
  });
});
