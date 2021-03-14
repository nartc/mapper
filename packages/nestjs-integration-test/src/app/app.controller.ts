import { MapInterceptor, MapPipe } from '@automapper/nestjs';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { getUser } from './models/get-user';
import { User, UserVm } from './models/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('user-no-map')
  getUserNoMap() {
    return getUser();
  }

  @Get('user')
  getUser() {
    return this.appService.getUserVm();
  }

  @Get('raw')
  @UseInterceptors(MapInterceptor(UserVm, User))
  getRawUser() {
    return this.appService.getRawUser();
  }

  @Get('foo')
  getFooVm() {
    return this.appService.getFooVm();
  }

  @Post('from-body')
  getUserFromBody(@Body(MapPipe(UserVm, User)) vm: UserVm) {
    return vm;
  }

  @Post('from-body-data')
  getUserFromBodyData(@Body('data', MapPipe(UserVm, User)) vm: UserVm) {
    return { vm };
  }

  @Post('from-body-array')
  getUserFromBodyArray(
    @Body('data', MapPipe(UserVm, User, { isArray: true })) vm: UserVm[]
  ) {
    return { vm };
  }
}
