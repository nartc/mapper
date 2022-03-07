import { AutoMap } from '@automapper/classes';
import { BioDto } from './bio.dto';

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
