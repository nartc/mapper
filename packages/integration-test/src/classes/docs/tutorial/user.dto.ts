import { AutoMap } from '@automapper/classes';

export class BioDto {
    @AutoMap()
    jobTitle!: string;

    @AutoMap()
    jobSalary!: number;

    @AutoMap()
    birthday!: string;

    @AutoMap()
    avatarUrl!: string;
}

export class UserDto {
    @AutoMap()
    firstName!: string;

    @AutoMap()
    lastName!: string;

    @AutoMap()
    fullName!: string;

    @AutoMap()
    username!: string;

    @AutoMap(() => BioDto)
    bio!: BioDto;
}
