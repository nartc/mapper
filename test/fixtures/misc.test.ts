import { AutoMapper, mapFrom, Mapper, ProfileBase } from '../../src';
import { AutoMap } from '../../src/decorators';

class Country {
  id!: string;

  @AutoMap()
  name!: string;

  cities!: City[];
}

class City {
  id!: string;

  @AutoMap()
  name!: string;

  country!: Country;

  addresses!: Address[];
}

class Address {
  @AutoMap()
  id!: string;

  @AutoMap()
  descriptiveAddress!: string;

  @AutoMap()
  coordinateAddress!: number[];

  @AutoMap()
  postalCode!: string;

  city!: City;
}

class AddressRoDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  descriptiveAddress!: string;

  @AutoMap()
  coordinateAddress!: number[];

  @AutoMap()
  postalCode!: string;

  @AutoMap()
  cityName!: string;

  @AutoMap()
  countryName!: string;
}

class AddressProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Address, AddressRoDto)
      .forMember(
        d => d.cityName,
        mapFrom(s => s.city.name)
      )
      .forMember(
        d => d.countryName,
        mapFrom(s => s.city.country.name)
      );
  }
}

class University {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap(() => Professor)
  professors!: Professor[];

  @AutoMap(() => Address)
  address!: Address;
}

class UniversityRoDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap(() => AddressRoDto)
  address!: AddressRoDto;

  @AutoMap(() => ProfessorRoDto)
  professors!: ProfessorRoDto[];
}

class UniversityProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(University, UniversityRoDto);
  }
}

class User {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  emailConfirm!: boolean;

  @AutoMap()
  phone!: string;

  @AutoMap()
  password!: string;
}

class UserRoDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  phone!: string;
}

class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserRoDto);
  }
}

class Professor {
  @AutoMap()
  id!: string;

  @AutoMap()
  inUniversityAddress!: string;

  @AutoMap()
  grade!: string;

  @AutoMap(() => User)
  user!: User;

  @AutoMap(() => University)
  university!: University;
}

class ProfessorRoDto {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserRoDto)
  user!: UserRoDto;

  @AutoMap()
  grade!: string;

  @AutoMap(() => UniversityRoDto)
  university!: UniversityRoDto;

  @AutoMap()
  inUniversityAddress!: string;
}

class ProfessorProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Professor, ProfessorRoDto);
  }
}

describe('Misc Test', () => {
  beforeAll(() => {
    Mapper.addProfile(AddressProfile)
      .addProfile(UniversityProfile)
      .addProfile(ProfessorProfile)
      .addProfile(UserProfile);
  });

  afterAll(Mapper.dispose.bind(Mapper));

  it('should map', () => {
    const professor = new Professor();
    professor.id = '1';
    professor.grade = 'profGrade';
    professor.inUniversityAddress = 'string';
    professor.user = new User();
    professor.user.id = '1';
    professor.user.email = 'abc@mail.com';
    professor.user.password = '123456';
    professor.user.emailConfirm = true;
    professor.user.name = 'Chau';
    professor.user.phone = '123456789';
    professor.university = new University();
    professor.university.id = '1';
    professor.university.name = 'University';
    professor.university.address = new Address();
    professor.university.address.id = '1';
    professor.university.address.postalCode = '12345';
    professor.university.address.coordinateAddress = [1, 2];
    professor.university.address.descriptiveAddress = 'descriptive address';
    professor.university.address.city = new City();
    professor.university.address.city.id = '1';
    professor.university.address.city.name = 'City';
    professor.university.address.city.addresses = [new Address()];
    professor.university.address.city.country = new Country();
    professor.university.address.city.country.id = '1';
    professor.university.address.city.country.name = 'Country';
    const vm = Mapper.map(professor, ProfessorRoDto);
    expect(vm).toBeTruthy();
  });
});
