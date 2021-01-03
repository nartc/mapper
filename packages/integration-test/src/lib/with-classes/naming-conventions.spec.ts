import {
  CamelCaseNamingConvention,
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '@automapper/core';
import { setupClasses } from '../setup.spec';
import {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/models/simple-foo-bar';
import {
  PascalSimpleBar,
  PascalSimpleBarVm,
  PascalSimpleFoo,
  PascalSimpleFooVm,
} from './fixtures/models/simple-foo-bar-pascal';
import {
  SnakeSimpleBar,
  SnakeSimpleBarVm,
  SnakeSimpleFoo,
  SnakeSimpleFooVm,
} from './fixtures/models/simple-foo-bar-snake';
import { User, UserVm } from './fixtures/models/user';
import { PascalUser, PascalUserVm } from './fixtures/models/user-pascal';
import { SnakeUser, SnakeUserVm } from './fixtures/models/user-snake';
import {
  addressProfile,
  pascalAddressProfile,
  snakeAddressProfile,
} from './fixtures/profiles/address.profile';
import {
  avatarProfile,
  pascalAvatarProfile,
  snakeAvatarProfile,
} from './fixtures/profiles/avatar.profile';
import {
  pascalUserProfileProfile,
  snakeUserProfileProfile,
  userProfileProfile,
} from './fixtures/profiles/user-profile.profile';
import {
  pascalUserProfile,
  snakeUserProfile,
  userProfile,
} from './fixtures/profiles/user.profile';
import { getPascalUser, getSnakeUser, getUser } from './utils/get-user';

describe('Naming Conventions', () => {
  describe('with pascal <-> camel', () => {
    const [mapper] = setupClasses('pascalCamel', {
      source: new PascalCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(PascalSimpleBar, SimpleBarVm);
      mapper.createMap(PascalSimpleFoo, SimpleFooVm);

      const foo = new PascalSimpleFoo();
      foo.Foo = 'Foo';
      foo.FooBar = 123;
      foo.Bar = new PascalSimpleBar();
      foo.Bar.Bar = 'Bar';

      const vm = mapper.map(foo, SimpleFooVm, PascalSimpleFoo);
      expect(vm.foo).toEqual(foo.Foo);
      expect(vm.bar.bar).toEqual(foo.Bar.Bar);
      expect(vm.fooBar).toEqual(foo.FooBar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(pascalAddressProfile)
        .addProfile(pascalAvatarProfile)
        .addProfile(pascalUserProfileProfile)
        .addProfile(pascalUserProfile);

      const user = getPascalUser();

      const vm = mapper.map(user, UserVm, PascalUser);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.jobTitle).toEqual(user.Job.Title);
      expect(vm.jobAnnualSalary).toEqual(user.Job.AnnualSalary);
    });
  });

  describe('with camel <-> pascal', () => {
    const [mapper] = setupClasses('camelPascal', {
      source: new CamelCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(SimpleBar, PascalSimpleBarVm);
      mapper.createMap(SimpleFoo, PascalSimpleFooVm);

      const foo = new SimpleFoo();
      foo.foo = 'Foo';
      foo.fooBar = 123;
      foo.bar = new SimpleBar();
      foo.bar.bar = 'Bar';

      const vm = mapper.map(foo, PascalSimpleFooVm, SimpleFoo);
      expect(vm.Foo).toEqual(foo.foo);
      expect(vm.Bar.Bar).toEqual(foo.bar.bar);
      expect(vm.FooBar).toEqual(foo.fooBar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(addressProfile)
        .addProfile(avatarProfile)
        .addProfile(userProfileProfile)
        .addProfile(userProfile);

      const user = getUser();

      const vm = mapper.map(user, PascalUserVm, User);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.JobTitle).toEqual(user.job.title);
      expect(vm.JobAnnualSalary).toEqual(user.job.annualSalary);
    });
  });

  describe('with snake <-> camel', () => {
    const [mapper] = setupClasses('snakeCamel', {
      source: new SnakeCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(SnakeSimpleBar, SimpleBarVm);
      mapper.createMap(SnakeSimpleFoo, SimpleFooVm);

      const foo = new SnakeSimpleFoo();
      foo.foo = 'Foo';
      foo.foo_bar = 123;
      foo.bar = new SimpleBar();
      foo.bar.bar = 'Bar';

      const vm = mapper.map(foo, SimpleFooVm, SnakeSimpleFoo);
      expect(vm.foo).toEqual(foo.foo);
      expect(vm.bar.bar).toEqual(foo.bar.bar);
      expect(vm.fooBar).toEqual(foo.foo_bar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(snakeAddressProfile)
        .addProfile(snakeAvatarProfile)
        .addProfile(snakeUserProfileProfile)
        .addProfile(snakeUserProfile);

      const user = getSnakeUser();

      const vm = mapper.map(user, UserVm, SnakeUser);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.jobTitle).toEqual(user.job.title);
      expect(vm.jobAnnualSalary).toEqual(user.job.annual_salary);
    });
  });

  describe('with camel <-> snake', () => {
    const [mapper] = setupClasses('camelSnake', {
      source: new CamelCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(SimpleBar, SnakeSimpleBarVm);
      mapper.createMap(SimpleFoo, SnakeSimpleFooVm);

      const foo = new SimpleFoo();
      foo.foo = 'Foo';
      foo.fooBar = 123;
      foo.bar = new SimpleBar();
      foo.bar.bar = 'Bar';

      const vm = mapper.map(foo, SnakeSimpleFooVm, SimpleFoo);
      expect(vm.foo).toEqual(foo.foo);
      expect(vm.bar.bar).toEqual(foo.bar.bar);
      expect(vm.foo_bar).toEqual(foo.fooBar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(addressProfile)
        .addProfile(avatarProfile)
        .addProfile(userProfileProfile)
        .addProfile(userProfile);

      const user = getUser();

      const vm = mapper.map(user, SnakeUserVm, User);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.job_title).toEqual(user.job.title);
      expect(vm.job_annual_salary).toEqual(user.job.annualSalary);
    });
  });

  describe('with pascal <-> snake', () => {
    const [mapper] = setupClasses('pascalSnake', {
      source: new PascalCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(PascalSimpleBar, SnakeSimpleBarVm);
      mapper.createMap(PascalSimpleFoo, SnakeSimpleFooVm);

      const foo = new PascalSimpleFoo();
      foo.Foo = 'Foo';
      foo.FooBar = 123;
      foo.Bar = new PascalSimpleBar();
      foo.Bar.Bar = 'Bar';

      const vm = mapper.map(foo, SnakeSimpleFooVm, PascalSimpleFoo);
      expect(vm.foo).toEqual(foo.Foo);
      expect(vm.bar.bar).toEqual(foo.Bar.Bar);
      expect(vm.foo_bar).toEqual(foo.FooBar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(pascalAddressProfile)
        .addProfile(pascalAvatarProfile)
        .addProfile(pascalUserProfileProfile)
        .addProfile(pascalUserProfile);

      const user = getPascalUser();

      const vm = mapper.map(user, SnakeUserVm, PascalUser);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.job_title).toEqual(user.Job.Title);
      expect(vm.job_annual_salary).toEqual(user.Job.AnnualSalary);
    });
  });

  describe('with snake <-> pascal', () => {
    const [mapper] = setupClasses('snakePascal', {
      source: new SnakeCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(SnakeSimpleBar, PascalSimpleBarVm);
      mapper.createMap(SnakeSimpleFoo, PascalSimpleFooVm);

      const foo = new SnakeSimpleFoo();
      foo.foo = 'Foo';
      foo.foo_bar = 123;
      foo.bar = new SnakeSimpleBar();
      foo.bar.bar = 'Bar';

      const vm = mapper.map(foo, PascalSimpleFooVm, SnakeSimpleFoo);
      expect(vm.Foo).toEqual(foo.foo);
      expect(vm.Bar.Bar).toEqual(foo.bar.bar);
      expect(vm.FooBar).toEqual(foo.foo_bar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(snakeAddressProfile)
        .addProfile(snakeAvatarProfile)
        .addProfile(snakeUserProfileProfile)
        .addProfile(snakeUserProfile);

      const user = getSnakeUser();

      const vm = mapper.map(user, PascalUserVm, SnakeUser);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.JobTitle).toEqual(user.job.title);
      expect(vm.JobAnnualSalary).toEqual(user.job.annual_salary);
    });
  });

  describe('with same casing', () => {
    const [mapper] = setupClasses(
      'sameCasing',
      new CamelCaseNamingConvention()
    );

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      mapper.createMap(SimpleBar, SimpleBarVm);
      mapper.createMap(SimpleFoo, SimpleFooVm);

      const foo = new SimpleFoo();
      foo.foo = 'Foo';
      foo.fooBar = 123;
      foo.bar = new SimpleBar();
      foo.bar.bar = 'Bar';

      const vm = mapper.map(foo, SimpleFooVm, SimpleFoo);
      expect(vm.foo).toEqual(foo.foo);
      expect(vm.bar.bar).toEqual(foo.bar.bar);
      expect(vm.fooBar).toEqual(foo.fooBar);
    });

    it('should map with complex models', () => {
      mapper
        .addProfile(addressProfile)
        .addProfile(avatarProfile)
        .addProfile(userProfileProfile)
        .addProfile(userProfile);

      const user = getUser();

      const vm = mapper.map(user, UserVm, User);
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.jobTitle).toEqual(user.job.title);
      expect(vm.jobAnnualSalary).toEqual(user.job.annualSalary);
    });
  });
});
