import { AutoMap } from '@automapper/classes';

export class Job {
    @AutoMap()
    title!: string;
    @AutoMap()
    annualSalary!: number;
}

export class PascalJob {
    @AutoMap()
    Title!: string;
    @AutoMap()
    AnnualSalary!: number;
}

export class SnakeJob {
    @AutoMap()
    title!: string;
    @AutoMap()
    annual_salary!: number;
}
