import { MapInterceptor, MapPipe } from '@automapper/nestjs';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from '../classes/dtos/user.dto';
import { User } from '../classes/models/user';
import { getUser } from '../classes/utils/get-user';

import { AppService } from './app.service';

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
        return this.appService.getUserDto();
    }

    @Get('raw')
    @UseInterceptors(MapInterceptor(User, UserDto))
    getRawUser() {
        return this.appService.getRawUser();
    }

    @Get('raw-array')
    @UseInterceptors(MapInterceptor(User, UserDto, { isArray: true }))
    getRawUserArray() {
        return [this.appService.getRawUser()];
    }

    @Get('foo')
    getFooVm() {
        return this.appService.getFooVm();
    }

    @Post('from-body')
    getUserFromBody(@Body(MapPipe(User, UserDto)) dto: UserDto) {
        return dto;
    }

    @Post('from-body-data')
    getUserFromBodyData(@Body('data', MapPipe(User, UserDto)) dto: UserDto) {
        return { dto };
    }

    @Post('from-body-array')
    getUserFromBodyArray(
        @Body('data', MapPipe(User, UserDto, { isArray: true })) dto: UserDto[]
    ) {
        return { dto };
    }
}
