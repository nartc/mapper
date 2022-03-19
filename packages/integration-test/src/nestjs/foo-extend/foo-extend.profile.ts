import type { Mapper, MappingProfile } from '@automapper/core';
import { createMap, extend } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Foo, FooDto } from '../foo/foo';
import { FooExtend, FooExtendDto } from './foo-extend';

@Injectable()
export class FooExtendProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, FooExtend, FooExtendDto, extend(Foo, FooDto));
        };
    }
}
