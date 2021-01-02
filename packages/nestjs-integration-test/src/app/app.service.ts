import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { getUser } from './models/get-user';
import { User, UserVm } from './models/user';

@Injectable()
export class AppService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getData(): { message: string } {
    return { message: 'Welcome to nestjs-integration-test!' };
  }

  getUser() {
    const user = getUser();
    const vm = this.mapper.map(user, UserVm, User);

    console.log(vm);
    return vm;
  }
}
