import { PojosMetadataMap } from '@automapper/pojos';
import { Bio, PascalBio, SnakeBio } from './bio';
import { Job, PascalJob, SnakeJob } from './job';

export interface User {
    firstName: string;
    lastName: string;
    bio: Bio;
    job: Job;
    logins: Date[];
}

export interface PascalUser {
    FirstName: string;
    LastName: string;
    Bio: PascalBio;
    Job: PascalJob;
    Logins: Date[];
}

export interface SnakeUser {
    first_name: string;
    last_name: string;
    bio: SnakeBio;
    job: SnakeJob;
    logins: Date[];
}

export function createUserMetadata() {
    PojosMetadataMap.create<User>('User', {
        firstName: String,
        lastName: String,
        bio: 'Bio',
        job: 'Job',
        logins: [Date],
    });

    PojosMetadataMap.create<PascalUser>('PascalUser', {
        FirstName: String,
        LastName: String,
        Bio: 'PascalBio',
        Job: 'PascalJob',
        Logins: [Date],
    });

    PojosMetadataMap.create<SnakeUser>('SnakeUser', {
        first_name: String,
        last_name: String,
        bio: 'SnakeBio',
        job: 'SnakeJob',
        logins: [Date],
    });
}
