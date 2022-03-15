import {
    afterMap,
    beforeMap,
    createMap,
    forMember,
    MapCallback,
    mapFrom,
    MappingProfile,
} from '@automapper/core';
import { SimpleUserDto } from '../dtos/simple-user.dto';
import { SimpleUser } from '../models/simple-user';

export function simpleUserProfileFactory(callbacks?: {
    beforeMap?: MapCallback<SimpleUser, SimpleUserDto>;
    afterMap?: MapCallback<SimpleUser, SimpleUserDto>;
}): MappingProfile {
    return (mapper) => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            ),
            callbacks && callbacks.beforeMap
                ? beforeMap(callbacks.beforeMap)
                : undefined,
            callbacks && callbacks.afterMap
                ? afterMap(callbacks.afterMap)
                : undefined
        );
    };
}
