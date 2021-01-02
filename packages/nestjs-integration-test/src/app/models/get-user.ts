import { Address } from './address';
import { Avatar } from './avatar';
import { Job } from './job';
import { User } from './user';
import { UserProfile } from './user-profile';

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

  const userJob = new Job();
  userJob.title = 'Developer';
  userJob.annualSalary = 99999;
  user.job = Object.assign(userJob, partials.job ?? {});

  user.profile = Object.assign(userProfile, partials.profile ?? {});
  return Object.assign(user, partials.user ?? {});
}
