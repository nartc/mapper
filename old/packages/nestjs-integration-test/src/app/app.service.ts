import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Bar, Foo, FooVm } from './models/foo';
import { getUser } from './models/get-user';
import { User, UserVm } from './models/user';

@Injectable()
export class AppService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getData(): { message: string } {
    return { message: 'Welcome to nestjs-integration-test!' };
  }

  getUserVm() {
    const user = getUser();
    return this.mapper.map(user, UserVm, User);
  }

  getRawUser() {
    return getUser();
  }

  getFooVm() {
    const foo = new Foo();
    foo.foo = 'testing';
    foo.bar = new Bar();
    foo.bar.bar = 'testing bar';

    return this.mapper.mapArray([foo], FooVm, Foo);
  }
}
