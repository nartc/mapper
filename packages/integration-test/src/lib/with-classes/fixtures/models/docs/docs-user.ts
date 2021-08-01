import { AutoMap } from '@automapper/classes';
import { Bio, BioDto } from './docs-bio';

export class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  username!: string;
  password!: string;
  @AutoMap({ typeFn: () => Bio })
  bio!: Bio;
}

export class UserDto {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  fullName!: string;
  @AutoMap()
  username!: string;
  @AutoMap({ typeFn: () => BioDto })
  bio!: BioDto;
}
