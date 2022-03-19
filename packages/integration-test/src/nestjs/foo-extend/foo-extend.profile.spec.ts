import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { Bar } from '../foo/foo';
import { FooProfile } from '../foo/foo.profile';
import { FooExtend, FooExtendDto } from './foo-extend';
import { FooExtendProfile } from './foo-extend.profile';

describe('fooExtendProfile', () => {
    let mapper: Mapper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMapperToken(),
                    useValue: createMapper({
                        strategyInitializer: classes(),
                    }),
                },
                FooProfile,
                FooExtendProfile,
            ],
        }).compile();
        mapper = moduleRef.get<Mapper>(getMapperToken());
    });

    it('should map', () => {
        const fooExtend = new FooExtend();
        fooExtend.fooFoo = 'fooFoo';
        fooExtend.foo = 'foo';
        fooExtend.bar = new Bar();
        fooExtend.bar.bar = 'bar';

        const dto = mapper.map(fooExtend, FooExtend, FooExtendDto);
        expect(dto.fooFoo).toEqual(fooExtend.fooFoo);
        expect(dto.fooDto).toEqual(fooExtend.foo);
        expect(dto.barDto.barDto).toEqual(fooExtend.bar.bar);
    });
});
