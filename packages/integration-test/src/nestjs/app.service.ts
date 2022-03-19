import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../classes/dtos/user.dto';
import { User } from '../classes/models/user';
import { getUser } from '../classes/utils/get-user';
import { Bar, Foo, FooDto } from './foo/foo';

@Injectable()
export class AppService {
    constructor(@InjectMapper() private readonly mapper: Mapper) {}

    getData(): { message: string } {
        return { message: 'Welcome to nestjs-integration-test!' };
    }

    getUserDto() {
        const user = getUser();
        return this.mapper.map(user, User, UserDto);
    }

    getRawUser() {
        return getUser();
    }

    getFooVm() {
        const foo = new Foo();
        foo.foo = 'testing';
        foo.bar = new Bar();
        foo.bar.bar = 'testing bar';

        return this.mapper.mapArray([foo], Foo, FooDto);
    }
}
