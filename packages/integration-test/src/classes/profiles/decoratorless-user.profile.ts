import {
    autoMap,
    createMap,
    forMember,
    mapFrom,
    MappingProfile,
} from '@automapper/core';
import { DecoratorlessUserDto } from '../dtos/decoratorless-user.dto';
import { DecoratorlessUser } from '../models/decoratorless-user';

export function decoratorlessUserProfileFactory(): MappingProfile {
    return (mapper) => {
        createMap(
            mapper,
            DecoratorlessUser,
            DecoratorlessUserDto,
            autoMap('firstName'),
            autoMap('lastName'),
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            )
        );

        createMap(
            mapper,
            DecoratorlessUserDto,
            DecoratorlessUser,
            autoMap('firstName'),
            autoMap('lastName')
        );
    };
}
