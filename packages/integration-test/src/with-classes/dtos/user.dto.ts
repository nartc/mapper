import { AutoMap } from '@automapper/classes';
import { BioDto, PascalBioDto, SnakeBioDto } from './bio.dto';

export class UserDto {
    @AutoMap()
    first!: string;
    @AutoMap()
    last!: string;
    @AutoMap()
    full!: string;
    @AutoMap(() => BioDto)
    bio!: BioDto;
    @AutoMap()
    jobTitle!: string;
    @AutoMap()
    jobAnnualSalary!: number;
    @AutoMap(() => [Date])
    logins: Date[] = [];
    @AutoMap(() => Date)
    lastLogin?: Date;
}

export class PascalUserDto {
    @AutoMap()
    First!: string;
    @AutoMap()
    Last!: string;
    @AutoMap()
    Full!: string;
    @AutoMap(() => PascalBioDto)
    Bio!: PascalBioDto;
    @AutoMap()
    JobTitle!: string;
    @AutoMap()
    JobAnnualSalary!: number;
    @AutoMap(() => [Date])
    Logins: Date[] = [];
    @AutoMap(() => Date)
    LastLogin?: Date;
}

export class SnakeUserDto {
    @AutoMap()
    first!: string;
    @AutoMap()
    last!: string;
    @AutoMap()
    full!: string;
    @AutoMap(() => SnakeBioDto)
    bio!: SnakeBioDto;
    @AutoMap()
    job_title!: string;
    @AutoMap()
    job_annual_salary!: number;
    @AutoMap(() => [Date])
    logins: Date[] = [];
    @AutoMap(() => Date)
    last_login?: Date;
}
