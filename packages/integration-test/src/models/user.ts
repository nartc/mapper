import { AutoMap, AutoMapStandalone } from '@automapper/classes';
import { Bio } from './bio';
import { Job } from './job';

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
