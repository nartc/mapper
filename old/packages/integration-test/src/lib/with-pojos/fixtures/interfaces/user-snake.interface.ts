import { createMetadataMap } from '@automapper/pojos';
import { SnakeJob } from './job-snake.interface';
import {
  SnakeUserProfile,
  SnakeUserProfileVm,
} from './user-profile-snake.interface';

export interface SnakeUser {
  first_name: string;
  last_name: string;
  profile: SnakeUserProfile;
  job: SnakeJob;
}

export interface SnakeUserVm {
  first: string;
  last: string;
  full: string;
  profile: SnakeUserProfileVm;
  job_title: string;
  job_annual_salary: number;
}

export function createUserSnakeMetadata() {
  createMetadataMap('SnakeUser', {
    first_name: String,
    last_name: String,
    profile: 'SnakeUserProfile',
    job: 'SnakeJob',
  });
  createMetadataMap('SnakeUserVm', {
    first: String,
    last: String,
    full: String,
    profile: 'SnakeUserProfileVm',
    job_title: String,
    job_annual_salary: Number,
  });
}
