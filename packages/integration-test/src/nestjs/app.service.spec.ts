import { classes } from '@jersmart/automapper-classes';
import {
    CamelCaseNamingConvention,
    createMapper,
} from '@jersmart/automapper-core';
import { getMapperToken } from '@jersmart/automapper-nestjs';
import { Test } from '@nestjs/testing';
import { UserDto } from '../classes/dtos/user.dto';
import { User } from '../classes/models/user';

import { AppService } from './app.service';
import { AddressProfile } from './profiles/address.profile';
import { AvatarProfile } from './profiles/avatar.profile';
import { BioProfile } from './profiles/bio.profile';
import { UserProfile } from './profiles/user.profile';

describe(AppService.name, () => {
    let service: AppService;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: getMapperToken(),
                    useValue: createMapper({
                        strategyInitializer: classes(),
                        namingConventions: new CamelCaseNamingConvention(),
                    }),
                },
                AvatarProfile,
                AddressProfile,
                BioProfile,
                UserProfile,
            ],
        }).compile();

        service = app.get<AppService>(AppService);
    });

    it('should return "Welcome to nestjs-integration-test!"', () => {
        expect(service.getData()).toEqual({
            message: 'Welcome to nestjs-integration-test!',
        });
    });

    it('should return UserVm', () => {
        expect(service.getUserDto()).toBeInstanceOf(UserDto);
    });

    it('should return user', () => {
        expect(service.getRawUser()).toBeInstanceOf(User);
    });
});
