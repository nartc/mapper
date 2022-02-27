import {
  CamelCaseNamingConvention,
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '@automapper/core';
import { setupPojos } from '../setup.spec';
import {
  createSimpleFooBarPascalMetadata,
  PascalSimpleBar,
  PascalSimpleBarVm,
  PascalSimpleFoo,
  PascalSimpleFooVm,
} from './fixtures/interfaces/simple-foo-bar-pascal.interface';
import {
  createSimpleFooBarSnakeMetadata,
  SnakeSimpleBar,
  SnakeSimpleBarVm,
  SnakeSimpleFoo,
  SnakeSimpleFooVm,
} from './fixtures/interfaces/simple-foo-bar-snake.interface';
import {
  createSimpleFooBarMetadata,
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/interfaces/simple-foo-bar.interface';
import {
  PascalUser,
  PascalUserVm,
} from './fixtures/interfaces/user-pascal.interface';
import {
  SnakeUser,
  SnakeUserVm,
} from './fixtures/interfaces/user-snake.interface';
import { User, UserVm } from './fixtures/interfaces/user.interface';
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
    const [mapper] = setupPojos('pascalCamel', {
      source: new PascalCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<PascalSimpleBar, SimpleBarVm>(
        'PascalSimpleBar',
        'SimpleBarVm'
      );
      mapper.createMap<PascalSimpleFoo, SimpleFooVm>(
        'PascalSimpleFoo',
        'SimpleFooVm'
      );

      const foo = {
        Foo: 'Foo',
        FooBar: 123,
        Bar: {
          Bar: 'Bar',
        },
      } as PascalSimpleFoo;

      const vm = mapper.map<PascalSimpleFoo, SimpleFooVm>(
        foo,
        'SimpleFooVm',
        'PascalSimpleFoo'
      );
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

      const vm = mapper.map<PascalUser, UserVm>(user, 'UserVm', 'PascalUser');
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.jobTitle).toEqual(user.Job.Title);
      expect(vm.jobAnnualSalary).toEqual(user.Job.AnnualSalary);
    });
  });

  describe('with camel <-> pascal', () => {
    const [mapper] = setupPojos('camelPascal', {
      source: new CamelCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<SimpleBar, PascalSimpleBarVm>(
        'SimpleBar',
        'PascalSimpleBarVm'
      );
      mapper.createMap<SimpleFoo, PascalSimpleFooVm>(
        'SimpleFoo',
        'PascalSimpleFooVm'
      );

      const foo = {
        foo: 'Foo',
        fooBar: 123,
        bar: {
          bar: 'Bar',
        },
      } as SimpleFoo;

      const vm = mapper.map<SimpleFoo, PascalSimpleFooVm>(
        foo,
        'PascalSimpleFooVm',
        'SimpleFoo'
      );
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

      const vm = mapper.map<User, PascalUserVm>(user, 'PascalUserVm', 'User');
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.JobTitle).toEqual(user.job.title);
      expect(vm.JobAnnualSalary).toEqual(user.job.annualSalary);
    });
  });

  describe('with snake <-> camel', () => {
    const [mapper] = setupPojos('snakeCamel', {
      source: new SnakeCaseNamingConvention(),
      destination: new CamelCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<SnakeSimpleBar, SimpleBarVm>(
        'SnakeSimpleBar',
        'SimpleBarVm'
      );
      mapper.createMap<SnakeSimpleFoo, SimpleFooVm>(
        'SnakeSimpleFoo',
        'SimpleFooVm'
      );

      const foo = {
        foo: 'Foo',
        foo_bar: 123,
        bar: {
          bar: 'Bar',
        },
      } as SnakeSimpleFoo;

      const vm = mapper.map<SnakeSimpleFoo, SimpleFooVm>(
        foo,
        'SimpleFooVm',
        'SnakeSimpleFoo'
      );
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

      const vm = mapper.map<SnakeUser, UserVm>(user, 'UserVm', 'SnakeUser');
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.jobTitle).toEqual(user.job.title);
      expect(vm.jobAnnualSalary).toEqual(user.job.annual_salary);
    });
  });

  describe('with camel <-> snake', () => {
    const [mapper] = setupPojos('camelSnake', {
      source: new CamelCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<SimpleBar, SnakeSimpleBarVm>(
        'SimpleBar',
        'SnakeSimpleBarVm'
      );
      mapper.createMap<SimpleFoo, SnakeSimpleFooVm>(
        'SimpleFoo',
        'SnakeSimpleFooVm'
      );

      const foo = {
        foo: 'Foo',
        fooBar: 123,
        bar: {
          bar: 'Bar',
        },
      } as SimpleFoo;

      const vm = mapper.map<SimpleFoo, SnakeSimpleFooVm>(
        foo,
        'SnakeSimpleFooVm',
        'SimpleFoo'
      );
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

      const vm = mapper.map<User, SnakeUserVm>(user, 'SnakeUserVm', 'User');
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.job_title).toEqual(user.job.title);
      expect(vm.job_annual_salary).toEqual(user.job.annualSalary);
    });
  });

  describe('with pascal <-> snake', () => {
    const [mapper] = setupPojos('pascalSnake', {
      source: new PascalCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<PascalSimpleBar, SnakeSimpleBarVm>(
        'PascalSimpleBar',
        'SnakeSimpleBarVm'
      );
      mapper.createMap<PascalSimpleFoo, SnakeSimpleFooVm>(
        'PascalSimpleFoo',
        'SnakeSimpleFooVm'
      );

      const foo = {
        Foo: 'Foo',
        FooBar: 123,
        Bar: {
          Bar: 'Bar',
        },
      } as PascalSimpleFoo;

      const vm = mapper.map<PascalSimpleFoo, SnakeSimpleFooVm>(
        foo,
        'SnakeSimpleFooVm',
        'PascalSimpleFoo'
      );
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

      const vm = mapper.map<PascalUser, SnakeUserVm>(
        user,
        'SnakeUserVm',
        'PascalUser'
      );
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.job_title).toEqual(user.Job.Title);
      expect(vm.job_annual_salary).toEqual(user.Job.AnnualSalary);
    });
  });

  describe('with snake <-> pascal', () => {
    const [mapper] = setupPojos('snakePascal', {
      source: new SnakeCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should create mapper', () => {
      expect(mapper).toBeTruthy();
    });

    it('should map', () => {
      createSimpleFooBarMetadata();
      createSimpleFooBarPascalMetadata();
      createSimpleFooBarSnakeMetadata();

      mapper.createMap<SnakeSimpleBar, PascalSimpleBarVm>(
        'SnakeSimpleBar',
        'PascalSimpleBarVm'
      );
      mapper.createMap<SnakeSimpleFoo, PascalSimpleFooVm>(
        'SnakeSimpleFoo',
        'PascalSimpleFooVm'
      );

      const foo = {
        foo: 'Foo',
        foo_bar: 123,
        bar: {
          bar: 'Bar',
        },
      } as SnakeSimpleFoo;

      const vm = mapper.map<SnakeSimpleFoo, PascalSimpleFooVm>(
        foo,
        'PascalSimpleFooVm',
        'SnakeSimpleFoo'
      );
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

      const vm = mapper.map<SnakeUser, PascalUserVm>(
        user,
        'PascalUserVm',
        'SnakeUser'
      );
      expect(vm).toBeTruthy();
      // Asserting the whole VM is too repetitive
      expect(vm.JobTitle).toEqual(user.job.title);
      expect(vm.JobAnnualSalary).toEqual(user.job.annual_salary);
    });
  });
});
