import type { Address, PascalAddress, SnakeAddress } from '../models/address';
import type { Avatar, PascalAvatar, SnakeAvatar } from '../models/avatar';
import type { Bio, PascalBio, SnakeBio } from '../models/bio';
import type { Job, PascalJob, SnakeJob } from '../models/job';
import type { PascalUser, SnakeUser, User } from '../models/user';

export function getUser(
    partials: {
        user?: Partial<User>;
        job?: Partial<Job>;
        bio?: Partial<Bio>;
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

    const bio: Bio = {
        text: 'Introvert-ish',
        birthday: new Date('10/14/1991'),
        addresses: [address1, address2],
        avatar,
        ...(partials.bio ?? {}),
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
        bio,
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
        bio?: Partial<PascalBio>;
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

    const userBio: PascalBio = {
        Text: 'Introvert-ish',
        Birthday: new Date('10/14/1991'),
        Addresses: [address1, address2],
        Avatar: avatar,
        ...(partials.bio ?? {}),
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
        Bio: userBio,
        Logins: [
            new Date('01/10/2021'),
            new Date('05/11/2021'),
            new Date('12/12/2021'),
        ],
        ...(partials.user ?? {}),
    } as PascalUser;
}

export function getSnakeUser(
    partials: {
        user?: Partial<SnakeUser>;
        job?: Partial<SnakeJob>;
        bio?: Partial<SnakeBio>;
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

    const userBio: SnakeBio = {
        text: 'Introvert-ish',
        birthday: new Date('10/14/1991'),
        addresses: [address1, address2],
        avatar,
        ...(partials.bio ?? {}),
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
        bio: userBio,
        logins: [
            new Date('01/10/2021'),
            new Date('05/11/2021'),
            new Date('12/12/2021'),
        ],
        ...(partials.user ?? {}),
    } as SnakeUser;
}
