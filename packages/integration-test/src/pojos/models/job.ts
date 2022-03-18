import { PojosMetadataMap } from '@automapper/pojos';

export interface Job {
    title: string;
    annualSalary: number;
}

export interface PascalJob {
    Title: string;
    AnnualSalary: number;
}

export interface SnakeJob {
    title: string;
    annual_salary: number;
}

export function createJobMetadata() {
    PojosMetadataMap.create<Job>('Job', {
        annualSalary: Number,
        title: String,
    });

    PojosMetadataMap.create<PascalJob>('PascalJob', {
        AnnualSalary: Number,
        Title: String,
    });

    PojosMetadataMap.create<SnakeJob>('SnakeJob', {
        annual_salary: Number,
        title: String,
    });
}
