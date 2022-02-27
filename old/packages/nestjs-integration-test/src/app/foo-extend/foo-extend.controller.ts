import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Controller, Get } from '@nestjs/common';
import { Bar } from '../models/foo';
import { FooExtend, FooExtendVm } from './foo-extend.model';

@Controller('foo-extend')
export class FooExtendController {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  @Get()
  getFooExtend() {
    const fooExtend = new FooExtend();
    fooExtend.fooFoo = 'fooFoo';
    fooExtend.foo = 'foo';
    fooExtend.bar = new Bar();
    fooExtend.bar.bar = 'bar';

    return this.mapper.map(fooExtend, FooExtendVm, FooExtend);
  }
}
