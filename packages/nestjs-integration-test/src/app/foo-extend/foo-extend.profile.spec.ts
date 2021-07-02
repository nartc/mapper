import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Test } from '@nestjs/testing';
import { FooProfile } from '../foo/foo.profile';
import { Bar } from '../models/foo';
import { FooExtend, FooExtendVm } from './foo-extend.model';
import { FooExtendProfile } from './foo-extend.profile';

describe('fooExtendProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({ name: '', pluginInitializer: classes }),
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

    const vm = mapper.map(fooExtend, FooExtendVm, FooExtend);
    expect(vm.fooFoo).toEqual(fooExtend.fooFoo);
    expect(vm.fooVm).toEqual(fooExtend.foo);
    expect(vm.barVm.barVm).toEqual(fooExtend.bar.bar);
  });
});
