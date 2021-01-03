import { AutoMap } from '@automapper/classes';
import { Bio, BioDto } from './docs-bio';

export class User {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  username: string;
  password: string;
  @AutoMap(() => Bio)
  bio: Bio;
}

export class UserDto {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  fullName: string;
  @AutoMap()
  username: string;
  @AutoMap(() => BioDto)
  bio: BioDto;
}
