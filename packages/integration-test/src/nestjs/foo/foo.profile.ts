import type { Mapper, MappingProfile } from '@jersmart/automapper-core';
import {
    createMap,
    forMember,
    mapFrom,
    mapWith,
} from '@jersmart/automapper-core';
import { AutomapperProfile, InjectMapper } from '@jersmart/automapper-nestjs';
import { Injectable } from '@nestjs/common';
import { Bar, BarDto, Foo, FooDto } from './foo';

@Injectable()
export class FooProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(
                mapper,
                Bar,
                BarDto,
                forMember(
                    (d) => d.barDto,
                    mapFrom((s) => s.bar)
                )
            );

            createMap(
                mapper,
                Foo,
                FooDto,
                forMember(
                    (d) => d.fooDto,
                    mapFrom((s) => s.foo)
                ),
                forMember(
                    (d) => d.barDto,
                    mapWith(BarDto, Bar, (s) => s.bar)
                )
            );
        };
    }
}
