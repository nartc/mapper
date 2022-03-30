import { AddressDto } from '../dtos/address.dto';
import { AvatarDto } from '../dtos/avatar.dto';
import { BioDto } from '../dtos/bio.dto';
import { UserDto } from '../dtos/user.dto';
import { Address, PascalAddress, SnakeAddress } from '../models/address';
import { Avatar, PascalAvatar, SnakeAvatar } from '../models/avatar';
import { Bio, PascalBio, SnakeBio } from '../models/bio';
import { Job, PascalJob, SnakeJob } from '../models/job';
import { PascalUser, SnakeUser, User } from '../models/user';

export function getUserDto(): UserDto {
    const addressDto = new AddressDto();
    addressDto.formattedAddress = '123 Acme Dr Sim Show Me';

    const otherAddressDto = new AddressDto();
    otherAddressDto.formattedAddress = '456 Rubik Dr Some October';

    const avatarDto = new AvatarDto();
    avatarDto.url = 'default url';
    avatarDto.forCondition = true;

    const bioDto = new BioDto();
    bioDto.text = 'Introvert-ish';
    bioDto.birthday = 'Mon Oct 14 1991';
    bioDto.avatar = avatarDto;
    bioDto.addresses = [addressDto, otherAddressDto];

    const userDto = new UserDto();
    userDto.first = 'Chau';
    userDto.last = 'Tran';
    userDto.full = 'Chau Tran';
    userDto.jobTitle = 'Developer';
    userDto.jobAnnualSalary = 99999;
    userDto.bio = bioDto;
    userDto.logins = [
        new Date('01/10/2021'),
        new Date('05/11/2021'),
        new Date('12/12/2021'),
    ];
    userDto.lastLogin = new Date('12/12/2021');

    return userDto;
}

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

export function getPascalUser(
    partials: {
        user?: Partial<PascalUser>;
        job?: Partial<PascalJob>;
        bio?: Partial<PascalBio>;
        avatar?: Partial<PascalAvatar>;
    } = {}
) {
    const bio = new PascalBio();
    bio.Text = 'Introvert-ish';
    bio.Birthday = new Date('10/14/1991');

    const address1 = new PascalAddress();
    address1.Street = '123 Acme Dr';
    address1.City = 'Sim';
    address1.State = 'Show Me';

    const address2 = new PascalAddress();
    address2.Street = '456 Rubik Dr';
    address2.City = 'Some';
    address2.State = 'October';
    bio.Addresses = [address1, address2];

    const avatar = new PascalAvatar();
    avatar.Source = 'Internet';
    avatar.Url = 'url.com';
    bio.Avatar = Object.assign(avatar, partials.avatar ?? {});

    const user = new PascalUser();
    user.FirstName = 'Chau';
    user.LastName = 'Tran';
    user.Logins = [
        new Date('01/10/2021'),
        new Date('05/11/2021'),
        new Date('12/12/2021'),
    ];

    const userJob = new PascalJob();
    userJob.Title = 'Developer';
    userJob.AnnualSalary = 99999;
    user.Job = Object.assign(userJob, partials.job ?? {});

    user.Bio = Object.assign(bio, partials.bio ?? {});
    return Object.assign(user, partials.user ?? {});
}

export function getSnakeUser(
    partials: {
        user?: Partial<SnakeUser>;
        job?: Partial<SnakeJob>;
        bio?: Partial<SnakeBio>;
        avatar?: Partial<SnakeAvatar>;
    } = {}
) {
    const bio = new SnakeBio();
    bio.text = 'Introvert-ish';
    bio.birthday = new Date('10/14/1991');

    const address1 = new SnakeAddress();
    address1.street = '123 Acme Dr';
    address1.city = 'Sim';
    address1.state = 'Show Me';

    const address2 = new SnakeAddress();
    address2.street = '456 Rubik Dr';
    address2.city = 'Some';
    address2.state = 'October';
    bio.addresses = [address1, address2];

    const avatar = new SnakeAvatar();
    avatar.source = 'Internet';
    avatar.url = 'url.com';
    bio.avatar = Object.assign(avatar, partials.avatar ?? {});

    const user = new SnakeUser();
    user.first_name = 'Chau';
    user.last_name = 'Tran';
    user.logins = [
        new Date('01/10/2021'),
        new Date('05/11/2021'),
        new Date('12/12/2021'),
    ];

    const userJob = new SnakeJob();
    userJob.title = 'Developer';
    userJob.annual_salary = 99999;
    user.job = Object.assign(userJob, partials.job ?? {});

    user.bio = Object.assign(bio, partials.bio ?? {});
    return Object.assign(user, partials.user ?? {});
}
