import { MapInterceptor } from '@automapper/nestjs';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';
import { User, UserVm } from './models/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
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
}
