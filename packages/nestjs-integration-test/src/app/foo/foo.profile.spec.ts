import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { Bar, Foo, FooVm } from '../models/foo';
import { FooProfile } from './foo.profile';

describe('fooProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({ name: '', pluginInitializer: classes }),
        },
        FooProfile,
      ],
    }).compile();
    mapper = moduleRef.get<Mapper>(getMapperToken());
  });

  it('should map', () => {
    const foo = new Foo();
    foo.foo = 'foo';
    foo.bar = new Bar();
    foo.bar.bar = 'bar';

    const vm = mapper.map(foo, FooVm, Foo);
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.barVm.barVm).toEqual(foo.bar.bar);
  });
});
