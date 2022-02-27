import { CamelCaseNamingConvention, mapFrom } from '@automapper/core';
import { setupClasses } from '../setup.spec';
import { Bio, BioDto } from './fixtures/models/docs/docs-bio';
import { Job } from './fixtures/models/docs/docs-job';
import { User, UserDto } from './fixtures/models/docs/docs-user';

describe('Docs examples', () => {
  describe('Basic', () => {
    const [mapper, spiedErrorHandler] = setupClasses('basic-docs');

    it('should map correctly', () => {
      spiedErrorHandler.mockImplementationOnce(console.error);

      mapper
        .createMap(Bio, BioDto, {
          namingConventions: new CamelCaseNamingConvention(),
        })
        .forMember(
          (d) => d.birthday,
          mapFrom((s) => s.birthday.toDateString())
        );
      mapper.createMap(User, UserDto).forMember(
        (d) => d.fullName,
        mapFrom((s) => s.firstName + ' ' + s.lastName)
      );

      const job = new Job();
      job.title = 'Developer';
      job.salary = 123456;

      const bio = new Bio();
      bio.job = job;
      bio.birthday = new Date();
      bio.avatarUrl = 'url.com';

      const user = new User();
      user.bio = bio;
      user.firstName = 'Chau';
      user.lastName = 'Tran';
      user.username = 'ctran';
      user.password = '123456';

      const vm = mapper.map(user, UserDto, User);
      expect(vm).toBeTruthy();
    });
  });
});
