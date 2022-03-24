import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';
import { Bio, Job, User } from './user';
import { BioDto, UserDto } from './user.dto';

describe('Docs - Tutorial', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    beforeEach(() => {
        createMap(mapper, Bio, BioDto);
        createMap(mapper, User, UserDto);
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map correctly', () => {
        const user = new User();
        user.firstName = 'Chau';
        user.lastName = 'Tran';
        user.username = 'ctran';
        user.password = '123456';
        user.bio = new Bio();
        user.bio.avatarUrl = 'google.com';
        user.bio.birthday = new Date();
        user.bio.job = new Job();
        user.bio.job.title = 'Developer';
        user.bio.job.salary = 99999;

        const dto = mapper.map(user, User, UserDto);
        expect(dto).toBeTruthy();
        console.log(dto);
    });
});
