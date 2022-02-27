import type { PascalAddress } from '../fixtures/interfaces/address-pascal.interface';
import type { SnakeAddress } from '../fixtures/interfaces/address-snake.interface';
import type { Address } from '../fixtures/interfaces/address.interface';
import type { PascalAvatar } from '../fixtures/interfaces/avatar-pascal.interface';
import type { SnakeAvatar } from '../fixtures/interfaces/avatar-snake.interface';
import type { Avatar } from '../fixtures/interfaces/avatar.interface';
import type { PascalJob } from '../fixtures/interfaces/job-pascal.interface';
import type { SnakeJob } from '../fixtures/interfaces/job-snake.interface';
import type { Job } from '../fixtures/interfaces/job.interface';
import type { PascalUser } from '../fixtures/interfaces/user-pascal.interface';
import type { PascalUserProfile } from '../fixtures/interfaces/user-profile-pascal.interface';
import type { SnakeUserProfile } from '../fixtures/interfaces/user-profile-snake.interface';
import type { UserProfile } from '../fixtures/interfaces/user-profile.interface';
import type { SnakeUser } from '../fixtures/interfaces/user-snake.interface';
import type { User } from '../fixtures/interfaces/user.interface';

export function getUser(
  partials: {
    user?: Partial<User>;
    job?: Partial<Job>;
    profile?: Partial<UserProfile>;
    avatar?: Partial<Avatar>;
  } = {}
) {
  const address1: Address = {
    street: '123 Acme Dr',
    city: 'Sim',
    state: 'Show Me',
  };

  const address2: Address = {
    street: '456 Rubik Dr',
    city: 'Some',
    state: 'October',
  };

  const avatar = {
    source: 'Internet',
    url: 'url.com',
    ...(partials.avatar ?? {}),
  } as Avatar;

  const userProfile: UserProfile = {
    bio: 'Introvert-ish',
    birthday: new Date('10/14/1991'),
    addresses: [address1, address2],
    avatar,
    ...(partials.profile ?? {}),
  };

  const userJob = {
    title: 'Developer',
    annualSalary: 99999,
    ...(partials.job ?? {}),
  } as Job;

  return {
    firstName: 'Chau',
    lastName: 'Tran',
    job: userJob,
    profile: userProfile,
    logins: [
      new Date('01/10/2021'),
      new Date('05/11/2021'),
      new Date('12/12/2021'),
    ],
    ...(partials.user ?? {}),
  } as User;
}

export function getPascalUser(
  partials: {
    user?: Partial<PascalUser>;
    job?: Partial<PascalJob>;
    profile?: Partial<PascalUserProfile>;
    avatar?: Partial<PascalAvatar>;
  } = {}
) {
  const address1: PascalAddress = {
    Street: '123 Acme Dr',
    City: 'Sim',
    State: 'Show Me',
  };

  const address2: PascalAddress = {
    Street: '456 Rubik Dr',
    City: 'Some',
    State: 'October',
  };

  const avatar = {
    Source: 'Internet',
    Url: 'url.com',
    ...(partials.avatar ?? {}),
  } as PascalAvatar;

  const userProfile: PascalUserProfile = {
    Bio: 'Introvert-ish',
    Birthday: new Date('10/14/1991'),
    Addresses: [address1, address2],
    Avatar: avatar,
    ...(partials.profile ?? {}),
  };

  const userJob = {
    Title: 'Developer',
    AnnualSalary: 99999,
    ...(partials.job ?? {}),
  } as PascalJob;

  return {
    FirstName: 'Chau',
    LastName: 'Tran',
    Job: userJob,
    Profile: userProfile,
    ...(partials.user ?? {}),
  } as PascalUser;
}

export function getSnakeUser(
  partials: {
    user?: Partial<SnakeUser>;
    job?: Partial<SnakeJob>;
    profile?: Partial<SnakeUserProfile>;
    avatar?: Partial<SnakeAvatar>;
  } = {}
) {
  const address1: SnakeAddress = {
    street: '123 Acme Dr',
    city: 'Sim',
    state: 'Show Me',
  };

  const address2: SnakeAddress = {
    street: '456 Rubik Dr',
    city: 'Some',
    state: 'October',
  };

  const avatar = {
    source: 'Internet',
    url: 'url.com',
    ...(partials.avatar ?? {}),
  } as SnakeAvatar;

  const userProfile: SnakeUserProfile = {
    bio: 'Introvert-ish',
    birthday: new Date('10/14/1991'),
    addresses: [address1, address2],
    avatar,
    ...(partials.profile ?? {}),
  };

  const userJob = {
    title: 'Developer',
    annual_salary: 99999,
    ...(partials.job ?? {}),
  } as SnakeJob;

  return {
    first_name: 'Chau',
    last_name: 'Tran',
    job: userJob,
    profile: userProfile,
    ...(partials.user ?? {}),
  } as SnakeUser;
}
