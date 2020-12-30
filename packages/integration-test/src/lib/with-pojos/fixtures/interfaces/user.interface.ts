import { createMetadataMap } from '@automapper/pojos';
import { Job } from './job.interface';
import { UserProfile, UserProfileVm } from './user-profile.interface';

export interface User {
  firstName: string;
  lastName: string;
  profile: UserProfile;
  job: Job;
}

export interface UserVm {
  first: string;
  last: string;
  full: string;
  profile: UserProfileVm;
  jobTitle: string;
  jobAnnualSalary: number;
}

export function createUserMetadata() {
  createMetadataMap('User', {
    firstName: String,
    lastName: String,
    profile: 'UserProfile',
    job: 'Job',
  });
  createMetadataMap('UserVm', {
    first: String,
    last: String,
    full: String,
    profile: 'UserProfileVm',
    jobTitle: String,
    jobAnnualSalary: Number,
  });
}
