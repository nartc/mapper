import { AutoMap } from '@automapper/classes';

export class Doctor {
  @AutoMap()
  name!: string;
  @AutoMap()
  titleTags!: string[];
}

export class DoctorDto {
  @AutoMap()
  name!: string;
  @AutoMap()
  titleTags!: string[];
}
