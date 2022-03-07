import { Address } from '../models/address';
import { Avatar } from '../models/avatar';
import { Bio } from '../models/bio';
import { Job } from '../models/job';
import { User } from '../models/user';

export function getUser(
    partials: {
        user?: Partial<User>;
        job?: Partial<Job>;
        bio?: Partial<Bio>;
        avatar?: Partial<Avatar>;
    } = {}
) {
    const userProfile = new Bio();
    userProfile.text = 'Introvert-ish';
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

    user.bio = Object.assign(userProfile, partials.bio ?? {});
    return Object.assign(user, partials.user ?? {});
}
