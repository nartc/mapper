import { AutoMap, AutoMapStandalone } from '@automapper/classes';
import { Bio, PascalBio, SnakeBio } from './bio';
import { Job, PascalJob, SnakeJob } from './job';

@AutoMapStandalone(Job)
export class User {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap(() => Bio)
    bio!: Bio;
    @AutoMap(() => Job)
    job!: Job;
    @AutoMap(() => [Date])
    logins: Date[] = [];
}

@AutoMapStandalone(PascalJob)
export class PascalUser {
    @AutoMap()
    FirstName!: string;
    @AutoMap()
    LastName!: string;
    @AutoMap(() => PascalBio)
    Bio!: PascalBio;
    @AutoMap(() => PascalJob)
    Job!: PascalJob;
    @AutoMap(() => [Date])
    Logins: Date[] = [];
}

@AutoMapStandalone(SnakeJob)
export class SnakeUser {
    @AutoMap()
    first_name!: string;
    @AutoMap()
    last_name!: string;
    @AutoMap(() => SnakeBio)
    bio!: SnakeBio;
    @AutoMap(() => SnakeJob)
    job!: SnakeJob;
    @AutoMap(() => [Date])
    logins: Date[] = [];
}
