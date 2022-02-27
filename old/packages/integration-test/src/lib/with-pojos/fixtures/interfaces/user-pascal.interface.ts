import { createMetadataMap } from '@automapper/pojos';
import { PascalJob } from './job-pascal.interface';
import {
  PascalUserProfile,
  PascalUserProfileVm,
} from './user-profile-pascal.interface';

export interface PascalUser {
  FirstName: string;
  LastName: string;
  Profile: PascalUserProfile;
  Job: PascalJob;
}

export interface PascalUserVm {
  First: string;
  Last: string;
  Full: string;
  Profile: PascalUserProfileVm;
  JobTitle: string;
  JobAnnualSalary: number;
}

export function createUserPascalMetadata() {
  createMetadataMap('PascalUser', {
    FirstName: String,
    LastName: String,
    Profile: 'PascalUserProfile',
    Job: 'Job',
  });
  createMetadataMap('PascalUserVm', {
    First: String,
    Last: String,
    Full: String,
    Profile: 'PascalUserProfileVm',
    JobTitle: String,
    JobAnnualSalary: Number,
  });
}
