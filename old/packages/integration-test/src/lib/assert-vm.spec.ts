import type {
  User,
  UserVm,
} from './with-pojos/fixtures/interfaces/user.interface';

export function assertVm<
  TSource extends User = User,
  TDestination extends UserVm = UserVm
>(
  user: TSource,
  vm: TDestination,
  assertionPaths: {
    shouldIgnorePassCondition: boolean;
    shouldSub: boolean;
  } = { shouldIgnorePassCondition: true, shouldSub: true }
) {
  const { shouldIgnorePassCondition, shouldSub } = assertionPaths;

  expect(vm.first).toEqual(user.firstName);
  expect(vm.last).toEqual(user.lastName);
  expect(vm.full).toEqual(user.firstName + ' ' + user.lastName);

  if (user.logins.length) {
    const lastModelLogin = user.logins[user.logins.length - 1];

    expect(Array.isArray(vm.logins)).toBe(true);
    expect(vm.logins).toHaveLength(user.logins.length);

    for (let i = 0; i < user.logins.length; i++)
      expect(vm.logins[i].getDate()).toEqual(user.logins[i].getDate());

    expect(vm.lastLogin.toDateString()).toEqual(lastModelLogin.toDateString());
  } else {
    expect(Array.isArray(vm.logins)).toBe(true);
    expect(vm.logins).toHaveLength(0);
    expect(vm.lastLogin).toBeFalsy();
  }

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
