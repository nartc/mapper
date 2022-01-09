import { Address } from '../fixtures/models/address';
import { PascalAddress } from '../fixtures/models/address-pascal';
import { SnakeAddress } from '../fixtures/models/address-snake';
import { Avatar } from '../fixtures/models/avatar';
import { PascalAvatar } from '../fixtures/models/avatar-pascal';
import { SnakeAvatar } from '../fixtures/models/avatar-snake';
import { Job } from '../fixtures/models/job';
import { PascalJob } from '../fixtures/models/job-pascal';
import { SnakeJob } from '../fixtures/models/job-snake';
import { User } from '../fixtures/models/user';
import { PascalUser } from '../fixtures/models/user-pascal';
import { UserProfile } from '../fixtures/models/user-profile';
import { PascalUserProfile } from '../fixtures/models/user-profile-pascal';
import { SnakeUserProfile } from '../fixtures/models/user-profile-snake';
import { SnakeUser } from '../fixtures/models/user-snake';

export function getUser(
  partials: {
    user?: Partial<User>;
    job?: Partial<Job>;
    profile?: Partial<UserProfile>;
    avatar?: Partial<Avatar>;
  } = {}
) {
  const userProfile = new UserProfile();
  userProfile.bio = 'Introvert-ish';
  userProfile.birthday = new Date('10/14/1991');

  const address1 = new Address();
  address1.street = '123 Acme Dr';
  address1.city = 'Sim';
  address1.state = 'Show Me';

  const address2 = new Address();
  address2.street = '456 Rubik Dr';
  address2.city = 'Some';
  address2.state = 'October';
  userProfile.addresses = [address1, address2];

  const avatar = new Avatar();
  avatar.source = 'Internet';
  avatar.url = 'url.com';
  userProfile.avatar = Object.assign(avatar, partials.avatar ?? {});

  const user = new User();
  user.firstName = 'Chau';
  user.lastName = 'Tran';
  user.logins = [
    new Date('01/10/2021'),
    new Date('05/11/2021'),
    new Date('12/12/2021'),
  ];

  const userJob = new Job();
  userJob.title = 'Developer';
  userJob.annualSalary = 99999;
  user.job = Object.assign(userJob, partials.job ?? {});

  user.profile = Object.assign(userProfile, partials.profile ?? {});
  return Object.assign(user, partials.user ?? {});
}

export function getPascalUser(
  partials: {
    user?: Partial<PascalUser>;
    job?: Partial<PascalJob>;
    profile?: Partial<PascalUserProfile>;
    avatar?: Partial<PascalAvatar>;
  } = {}
) {
  const userProfile = new PascalUserProfile();
  userProfile.Bio = 'Introvert-ish';
  userProfile.Birthday = new Date('10/14/1991');

  const address1 = new PascalAddress();
  address1.Street = '123 Acme Dr';
  address1.City = 'Sim';
  address1.State = 'Show Me';

  const address2 = new PascalAddress();
  address2.Street = '456 Rubik Dr';
  address2.City = 'Some';
  address2.State = 'October';
  userProfile.Addresses = [address1, address2];

  const avatar = new PascalAvatar();
  avatar.Source = 'Internet';
  avatar.Url = 'url.com';
  userProfile.Avatar = Object.assign(avatar, partials.avatar ?? {});

  const user = new PascalUser();
  user.FirstName = 'Chau';
  user.LastName = 'Tran';

  const userJob = new PascalJob();
  userJob.Title = 'Developer';
  userJob.AnnualSalary = 99999;
  user.Job = Object.assign(userJob, partials.job ?? {});

  user.Profile = Object.assign(userProfile, partials.profile ?? {});
  return Object.assign(user, partials.user ?? {});
}

export function getSnakeUser(
  partials: {
    user?: Partial<SnakeUser>;
    job?: Partial<SnakeJob>;
    profile?: Partial<SnakeUserProfile>;
    avatar?: Partial<SnakeAvatar>;
  } = {}
) {
  const userProfile = new SnakeUserProfile();
  userProfile.bio = 'Introvert-ish';
  userProfile.birthday = new Date('10/14/1991');

  const address1 = new SnakeAddress();
  address1.street = '123 Acme Dr';
  address1.city = 'Sim';
  address1.state = 'Show Me';

  const address2 = new SnakeAddress();
  address2.street = '456 Rubik Dr';
  address2.city = 'Some';
  address2.state = 'October';
  userProfile.addresses = [address1, address2];

  const avatar = new SnakeAvatar();
  avatar.source = 'Internet';
  avatar.url = 'url.com';
  userProfile.avatar = Object.assign(avatar, partials.avatar ?? {});

  const user = new SnakeUser();
  user.first_name = 'Chau';
  user.last_name = 'Tran';

  const userJob = new SnakeJob();
  userJob.title = 'Developer';
  userJob.annual_salary = 99999;
  user.job = Object.assign(userJob, partials.job ?? {});

  user.profile = Object.assign(userProfile, partials.profile ?? {});
  return Object.assign(user, partials.user ?? {});
}
