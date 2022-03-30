import { PojosMetadataMap } from '@automapper/pojos';
import { BioDto, PascalBioDto, SnakeBioDto } from './bio.dto';

export interface UserDto {
    first: string;
    last: string;
    full: string;
    bio: BioDto;
    jobTitle: string;
    jobAnnualSalary: number;
    logins: Date[];
    lastLogin?: Date;
}

export interface PascalUserDto {
    First: string;
    Last: string;
    Full: string;
    Bio: PascalBioDto;
    JobTitle: string;
    JobAnnualSalary: number;
    Logins: Date[];
    LastLogin?: Date;
}

export interface SnakeUserDto {
    first: string;
    last: string;
    full: string;
    bio: SnakeBioDto;
    job_title: string;
    job_annual_salary: number;
    logins: Date[];
    last_login?: Date;
}

export function createUserDtoMetadata() {
    PojosMetadataMap.create<UserDto>('UserDto', {
        first: String,
        last: String,
        full: String,
        bio: 'BioDto',
        jobTitle: String,
        jobAnnualSalary: Number,
        logins: [Date],
        lastLogin: Date,
    });

    PojosMetadataMap.create<PascalUserDto>('PascalUserDto', {
        First: String,
        Last: String,
        Full: String,
        Bio: 'PascalBioDto',
        JobTitle: String,
        JobAnnualSalary: Number,
        Logins: [Date],
        LastLogin: Date,
    });

    PojosMetadataMap.create<SnakeUserDto>('SnakeUserDto', {
        first: String,
        last: String,
        full: String,
        bio: 'SnakeBioDto',
        job_title: String,
        job_annual_salary: Number,
        logins: [Date],
        last_login: Date,
    });
}
